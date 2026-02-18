import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "examnotesai-118c5.firebaseapp.com",
  projectId: "examnotesai-118c5",
  storageBucket: "examnotesai-118c5.firebasestorage.app",
  messagingSenderId: "204085033595",
  appId: "1:204085033595:web:f95ea90adb391c1df880de",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { auth, provider };
