export function getRuntimeConfig() {
  return window.BLOOM_CONFIG || {};
}

export function isFirebaseConfigured(firebaseConfig) {
  if (!firebaseConfig) {
    return false;
  }

  return ["apiKey", "authDomain", "projectId", "appId"].every((key) => {
    const value = firebaseConfig[key];
    return value && !String(value).startsWith("PASTE_FIREBASE_");
  });
}
