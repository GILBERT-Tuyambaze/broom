import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--service-account" || arg === "-s") {
      args.serviceAccount = argv[++i];
    } else if (arg === "--data" || arg === "-d") {
      args.data = argv[++i];
    } else if (arg === "--dry-run") {
      args.dryRun = true;
    }
  }
  return args;
}

function chooseId(item, collectionName, index) {
  if (item.id) return item.id;
  if (item.title) return item.title.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
  if (item.name) return item.name.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
  return `${collectionName}-${index + 1}`;
}

function normalizeTimestamp(value) {
  if (!value) return undefined;
  if (typeof value === "number") {
    return Timestamp.fromMillis(value);
  }
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return undefined;
  }
  return Timestamp.fromDate(parsed);
}

function prepareData(item) {
  const payload = { ...item };

  if (payload.createdAt) {
    const ts = normalizeTimestamp(payload.createdAt);
    if (ts) {
      payload.createdAt = ts;
      payload.createdAtMs = payload.createdAtMs || ts.toMillis();
    } else {
      delete payload.createdAt;
    }
  }

  if (payload.createdAtMs && typeof payload.createdAtMs === "string") {
    const ms = Number(payload.createdAtMs);
    if (!Number.isNaN(ms)) {
      payload.createdAtMs = ms;
    }
  }

  if (payload.updatedAtMs && typeof payload.updatedAtMs === "string") {
    const ms = Number(payload.updatedAtMs);
    if (!Number.isNaN(ms)) {
      payload.updatedAtMs = ms;
    }
  }

  delete payload.id;
  delete payload.uid;
  return payload;
}

async function seedCollection(db, collectionName, items) {
  if (!items || !items.length) return;
  console.log(`Seeding ${items.length} documents into ${collectionName}...`);
  let index = 0;
  for (const item of items) {
    index += 1;
    const docId = chooseId(item, collectionName, index);
    const payload = prepareData(item);
    await db.collection(collectionName).doc(docId).set(payload, { merge: true });
  }
}

async function seedUserSubcollection(db, users, subcollectionName, items) {
  if (!items || !items.length) return;
  console.log(`Seeding ${items.length} ${subcollectionName} items...`);
  for (const item of items) {
    const uid = item.uid;
    if (!uid) {
      console.warn(`Skipping ${subcollectionName} item without uid:`, item);
      continue;
    }
    const payload = prepareData(item);
    const parentRef = db.collection("users").doc(uid).collection(subcollectionName);
    await parentRef.add(payload);
  }
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const configPath = options.serviceAccount || process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (!configPath) {
    throw new Error("Missing service account key. Use --service-account ./path/to/key.json or set GOOGLE_APPLICATION_CREDENTIALS.");
  }

  const dataPath = path.resolve(__dirname, options.data || "../src/state/seed-data.json");
  const serviceAccountText = await fs.readFile(path.resolve(process.cwd(), configPath), "utf-8");
  const serviceAccount = JSON.parse(serviceAccountText);
  const jsonText = await fs.readFile(dataPath, "utf-8");
  const seedData = JSON.parse(jsonText);

  if (options.dryRun) {
    console.log("Dry run enabled. Seed data was loaded successfully, but no writes will be made.");
  }

  initializeApp({ credential: cert(serviceAccount) });
  const db = getFirestore();

  if (!options.dryRun) {
    for (const user of seedData.users || []) {
      const payload = {
        ...user.profile,
        email: user.email || "",
        displayName: user.displayName || "",
        updatedAt: Timestamp.now(),
        updatedAtMs: Date.now(),
      };
      console.log(`Writing user ${user.uid}...`);
      await db.collection("users").doc(user.uid).set(payload, { merge: true });
    }

    await seedUserSubcollection(db, seedData.users, "logs", seedData.logs || []);
    await seedUserSubcollection(db, seedData.users, "assistantMessages", seedData.messages || []);
    await seedCollection(db, "communityPosts", seedData.communityPosts || []);
    await seedCollection(db, "communityGuidelines", seedData.communityGuidelines || []);
    await seedCollection(db, "moderationQueue", seedData.moderationQueue || []);
    await seedCollection(db, "mentors", seedData.mentors || []);
    await seedCollection(db, "mentorshipAccess", seedData.mentorshipAccess || []);
    await seedCollection(db, "aiGuardrails", seedData.aiGuardrails || []);
    await seedCollection(db, "crisisProtocol", seedData.crisisProtocol || []);

    console.log("Firestore seed complete.");
  }
}

main().catch((error) => {
  console.error("Failed to seed Firestore:", error);
  process.exit(1);
});
