// utils/firebase.ts

// Import necessary functions from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported as isAnalyticsSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase, type Database } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getFunctions, type Functions } from "firebase/functions";

// Firebase configuration using environment variables for security
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID, // Optional for analytics
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize services (lazy-loaded as needed)
const auth = getAuth(app);
const db = getDatabase(app);
const storage = getStorage(app);
const functions: Functions = getFunctions(app);

// Conditionally initialize analytics (only on supported browsers)
let analytics;
isAnalyticsSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
}).catch((error) => {
  console.error("Analytics initialization failed", error);
});

// Export the initialized services for use across the app
export { app, auth, db, storage, functions, analytics };
