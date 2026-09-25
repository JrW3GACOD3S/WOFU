// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8SZ_9JLixOsPclC-xlY0N4Vt0-MVioOQ",
  authDomain: "wofu-1.firebaseapp.com",
  projectId: "wofu-1",
  storageBucket: "wofu-1.firebasestorage.app",
  messagingSenderId: "1088321577213",
  appId: "1:1088321577213:web:08b5879856cc9189659e94"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export default app