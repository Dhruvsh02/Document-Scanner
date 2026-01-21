import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
 apiKey: "AIzaSyAQSAx984BnZoO3ScsahqoO2wqWZFQOH-Q",
 authDomain: "document-scanner-9390b.firebaseapp.com",
 projectId: "document-scanner-9390b",
 storageBucket: "document-scanner-9390b.firebasestorage.app",
 messagingSenderId: "96838288318",
 appId: "1:96838288318:web:e4022ef23107c91dadafef",
 measurementId: "G-XQC0LRPBX7"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);