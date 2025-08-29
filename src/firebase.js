import { initializeApp } from "firebase/app";
import { getFirestore, doc, deleteDoc, updateDoc } from "firebase/firestore";


// ✅ Firebase config for your project
const firebaseConfig = {
  apiKey: "AIzaSyC6P3yB66tb1HFM_rtqwrcrVro8_vpahY8",
  authDomain: "mobile-app-d9164.firebaseapp.com",
  projectId: "mobile-app-d9164",
  storageBucket: "mobile-app-d9164.firebasestorage.app",
  messagingSenderId: "660352746047",
  appId: "1:660352746047:web:b27fd9c5baae3627f26e8a"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Firestore
const db = getFirestore(app);

console.log("firebase Connected:",app);


// ✅ Export Firestore instance
export { db, doc, deleteDoc, updateDoc };
