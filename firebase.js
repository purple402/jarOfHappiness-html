const firebaseConfig = {
  apiKey: "AIzaSyBKOTaYFavnsmOoQ2SnhwZezPlK6i4OVC8",
  authDomain: "jar-of-happiness-24abd.firebaseapp.com",
  projectId: "jar-of-happiness-24abd",
  storageBucket: "jar-of-happiness-24abd.appspot.com",
  messagingSenderId: "144008940645",
  appId: "1:144008940645:web:8db24083e2e8544dc48a8c",
  measurementId: "G-9BYWE4E31X",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

