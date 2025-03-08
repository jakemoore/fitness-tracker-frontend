import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Register a new user
export async function register(email: string, password: string): Promise<string | null> {
  try {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
    return await userCredential.user.getIdToken(); // Returns Firebase JWT token
  } catch (error) {
    console.error("Error registering user:", error);
    return null;
  }
}

// Login a user
export async function login(email: string, password: string): Promise<string | null> {
  try {
    const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
    return await userCredential.user.getIdToken(); // Returns Firebase JWT token
  } catch (error) {
    console.error("Error logging in:", error);
    return null;
  }
}
