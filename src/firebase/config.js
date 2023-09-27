import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: "fullstack-template-io.firebaseapp.com",
  projectId: "fullstack-template-io",
  storageBucket: "fullstack-template-io.appspot.com",
  messagingSenderId: "102307912955",
  appId: "1:102307912955:web:56c5e5981f3173c2b8645e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
