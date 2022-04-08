import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const key = process.env.REACT_APP_FIREBASE_KEY;
const authdomain = process.env.REACT_APP_FIREBASE_AUTHDOMAIN;
const projectid = process.env.REACT_APP_FIREBASE_PROJECTID;
const storagebucket = process.env.REACT_APP_FIREBASE_STORAGEBUCKET;
const messagingsenderid = process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID;
const appid = process.env.REACT_APP_FIREBASE_APPID;

const firebaseConfig = {
  apiKey: `${key}`,
  authDomain: `${authdomain}`,
  projectId: "gallery-app-d0d37",
  storageBucket: "gallery-app-d0d37.appspot.com",
  messagingSenderId: `${messagingsenderid}`,
  appId: `${appid}`,
};

initializeApp(firebaseConfig);

const db = getFirestore();
const storage = getStorage();

export { db, storage };
