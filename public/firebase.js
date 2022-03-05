import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js";
import { getFirestore, collection, addDoc, setDoc, doc } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js";

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

// 로그인 기능
const signIn = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    console.log("firebase signIn", error.code, error.message);
  }
};

// 회원가입 기능
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

// 로그인 여부 확인
const checkCurrentUser = async () => {
  const user = auth.currentUser;
  if (user) {
    return user;
  } else {
    return null;
  }
};

// 로그아웃 기능
const LogOut = async () => {
  try {
    signOut(auth);
  } catch (error) {
    console.log("LogOut", error.message);
  }
};

const DB = getFirestore();
const createUserDoc = async (user) => {
  if (user) {
    try {
      // const newUserDocRef = await addDoc(collection(DB, "Happiness"), {});
      const newUserCollectionRef = collection(DB, "Happiness");

      const id = user.uid;
      const newUserDoc = {
        id,
        createdAt: Date.now(),
      };
      // await setDoc(newUserDocRef, newUserDoc);
      await setDoc(doc(newUserCollectionRef, id), newUserDoc);
      return id;
    } catch(error) {
      console.log(error.message)
    }
  } else {
    return;
  }
}

export { signIn, signUp, checkCurrentUser, LogOut, createUserDoc };
