import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Import Firebase Authentication
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCLzWwwNud0gxtG1L0Bbio1_pEjIRfhfxA",
  authDomain: "tuyendungwe.firebaseapp.com",
  projectId: "tuyendungwe",
  storageBucket: "tuyendungwe.firebasestorage.app",
  messagingSenderId: "26289414902",
  appId: "1:26289414902:web:797747918c0ef2601302d7",
  measurementId: "G-PK61VG8VTR",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
// Initialize Firebase services
const auth = getAuth(app); // Use Firebase Authentication
const analytics = getAnalytics(app); // Firebase Analytics
const db = getFirestore(app); // Firestore Database
const storage = getStorage(app); // Initialize Firebase Storage
export { auth, db, app, analytics, storage };
