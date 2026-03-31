import { getApp, getApps, initializeApp } from "firebase/app";
import { browserLocalPersistence, getAuth, setPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export async function createFirebaseServices(runtimeConfig) {
  const app = getApps().length ? getApp() : initializeApp(runtimeConfig.firebase);
  const auth = getAuth(app);
  const db = getFirestore(app);

  try {
    await setPersistence(auth, browserLocalPersistence);
  } catch (error) {
    console.warn("Could not set auth persistence.", error);
  }

  let aiModel = null;

  if (runtimeConfig.ai?.enabled) {
    try {
      const { GoogleAIBackend, getAI, getGenerativeModel } = await import("firebase/ai");

      const ai = getAI(app, { backend: new GoogleAIBackend() });
      aiModel = getGenerativeModel(ai, {
        model: runtimeConfig.ai.model || "gemini-2.5-flash",
      });
    } catch (error) {
      console.warn("Firebase AI Logic could not initialize.", error);
    }
  }

  return { auth, db, aiModel };
}
