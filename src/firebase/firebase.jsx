// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
//import { getAuth } from 'firebase/auth';
//import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB6LYpk_DFZwixdmW2AAJ-AErsJ7gnRyCk",
  authDomain: "kuutio-ajanvaraus.firebaseapp.com",
  projectId: "kuutio-ajanvaraus",
  storageBucket: "kuutio-ajanvaraus.appspot.com",
  messagingSenderId: "676652676649",
  appId: "1:676652676649:web:4c4a7483ff4850274c8e38"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
//export const auth = getAuth(app);
//export const storage = getStorage(app);