import { store } from "./firebase";
import { collection, getDoc, addDoc, updateDoc, query, serverTimestamp, where, getDocs } from "firebase/firestore";

const userCollection = collection(store, "users");

export const addUser = async (data) => {
  const docRef = await addDoc(userCollection, {
    id: "",
    dateCreated: serverTimestamp(),
    alias: data.alias,
    email: data.email,
    password: data.password,
  });

  await updateDoc(docRef, { id: docRef.id });

  return docRef.id;
};

export const loginUser = async (email, password) => {
  const qry = query(userCollection, where("email", "==", email), where("password", "==", password));
  const querySnap = await getDocs(qry);

  if (!querySnap.empty) {
    const docRef = querySnap.docs[0].ref;
    const userSnap = await getDoc(docRef);

    return userSnap.exists() ? userSnap.data() : null;
  } else {
    return null;
  }
};
