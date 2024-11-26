import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBzRvofcCImJJZ_P6BLsF6IGiZcXq7b2cc",
  authDomain: "todo-4cc4f.firebaseapp.com",
  projectId: "todo-4cc4f",
  storageBucket: "todo-4cc4f.firebasestorage.app",
  messagingSenderId: "813728957854",
  appId: "1:813728957854:web:3296f97bf1bb356f45828f",
  databaseURL: "https://todo-4cc4f-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export const store = getFirestore(app);
