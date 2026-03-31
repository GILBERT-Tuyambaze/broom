import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

export function listenToAuth(auth, callback) {
  return onAuthStateChanged(auth, callback);
}

export async function signInUser(auth, email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signUpUser(auth, email, password, displayName) {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(credential.user, { displayName });
  return credential;
}

export async function signOutUser(auth) {
  return signOut(auth);
}
