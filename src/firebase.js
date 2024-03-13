import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBowmGRXcQx1HQ0qRcXNflHydyRv6JGeCQ",
  authDomain: "anipulse-e3979.firebaseapp.com",
  projectId: "anipulse-e3979",
  storageBucket: "anipulse-e3979.appspot.com",
  messagingSenderId: "384242062540",
  appId: "1:384242062540:web:cf1bb76f4aceefe3081e69",
  measurementId: "G-SZ0SH2CREH",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
