import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { DEFAULT_PROFILE } from "../state/appState.js";

export async function loadProfile(db, uid, fallbackUser = null) {
  const snapshot = await getDoc(doc(db, "users", uid));
  if (snapshot.exists()) {
    return { ...DEFAULT_PROFILE, ...snapshot.data() };
  }

  return {
    ...DEFAULT_PROFILE,
    displayName: fallbackUser?.displayName || "",
    email: fallbackUser?.email || "",
  };
}

export async function saveProfile(db, uid, email, profile) {
  const payload = {
    ...profile,
    email: email || "",
    updatedAt: serverTimestamp(),
    updatedAtMs: Date.now(),
  };

  await setDoc(doc(db, "users", uid), payload, { merge: true });
}

export async function loadLogs(db, uid) {
  const snapshot = await getDocs(
    query(collection(db, "users", uid, "logs"), orderBy("createdAtMs", "desc"), limit(8)),
  );

  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  }));
}

export async function saveLog(db, uid, log) {
  await addDoc(collection(db, "users", uid, "logs"), {
    ...log,
    createdAt: serverTimestamp(),
  });
}

export async function loadMessages(db, uid) {
  const snapshot = await getDocs(
    query(collection(db, "users", uid, "assistantMessages"), orderBy("createdAtMs", "asc"), limit(30)),
  );

  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  }));
}

export async function saveMessage(db, uid, message) {
  await addDoc(collection(db, "users", uid, "assistantMessages"), {
    role: message.role,
    text: message.text,
    createdAt: serverTimestamp(),
    createdAtMs: message.createdAtMs,
  });
}
