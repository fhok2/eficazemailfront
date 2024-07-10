import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD6JGbHFBg-2BNAc0rLVLHRrN54ad-fQxc",
  authDomain: "eficazmail-c3c4f.firebaseapp.com",
  projectId: "eficazmail-c3c4f",
  storageBucket: "eficazmail-c3c4f.appspot.com",
  messagingSenderId: "773589759203",
  appId: "1:773589759203:web:56b752d71a123f361f41d6",
  measurementId: "G-D7GZRJ7K0G"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const idToken = await user.getIdToken();
    return { user, idToken };
  } catch (error) {
    return { error: error.message };
  }
};

export const signUpWithEmailAndPassword = async (email, password) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return { user: result.user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};

export const signInWithEmail = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return { user: result.user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};

export { auth, GoogleAuthProvider };