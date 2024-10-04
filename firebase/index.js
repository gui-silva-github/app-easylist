import { initializeApp } from "firebase/app"
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "YOUR_API-KEY",
  authDomain: "YOUR_AUTH-DOMAIN",
  databaseURL: "YOUR_DATABASE-URL",
  projectId: "YOUR_PROJECT-ID",
  storageBucket: "YOUR_STORAGE-BUCKET",
  messagingSenderId: "YOUR_MESSAGING",
  appId: "YOUR_APP-ID",
  measurementId: "YOUR_MEASUREMENT"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { app, db, getFirestore, collection, addDoc, getDocs, updateDoc, doc, deleteDoc }