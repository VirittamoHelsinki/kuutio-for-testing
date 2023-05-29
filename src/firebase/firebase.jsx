import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB074b0hxyYW9RaxpobiN565vhvCK07eJs",
  authDomain: "kuutio-app-official.firebaseapp.com",
  projectId: "kuutio-app-official",
  storageBucket: "kuutio-app-official.appspot.com",
  messagingSenderId: "233676564782",
  appId: "1:233676564782:web:0a510854e763a13b6a72bf",
  measurementId: "G-2F9DPHVFS9",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
