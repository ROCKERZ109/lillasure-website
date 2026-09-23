import { initializeApp, getApps, getApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator} from "firebase/firestore";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
// Firebase configuration - replace with your own values
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
 const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
// const db = getFirestore(app);
const functions = getFunctions(app);
const db = getFirestore(app)
const auth = getAuth(app);
// connectFirestoreEmulator(db, "127.0.0.1", 8080);
// connectAuthEmulator(auth,   "http://127.0.0.1:9099")


export { app, db,auth };
// export { app, db };
