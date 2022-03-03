import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBKOTaYFavnsmOoQ2SnhwZezPlK6i4OVC8",
  authDomain: "jar-of-happiness-24abd.firebaseapp.com",
  projectId: "jar-of-happiness-24abd",
  storageBucket: "jar-of-happiness-24abd.appspot.com",
  messagingSenderId: "144008940645",
  appId: "1:144008940645:web:8db24083e2e8544dc48a8c",
  measurementId: "G-9BYWE4E31X",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

const signIn = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    console.log("firebase signIn", user);
    return user;
  } catch (error) {
    console.log("firebase signIn", error.code, error.message);
  }
};

const signUp = async (email, password, username) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    updateProfile(user, {
      displayName: username,
    });
    return user;
  } catch (error) {
    console.log("signUp", error.code, error.message);
  }
};

export { signIn, signUp, checkCurrentUser, signOutAccount };
