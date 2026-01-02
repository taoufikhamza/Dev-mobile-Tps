import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence, getAuth } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
// Optional: import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);

// Persistence configuration
let authInstance;
if (process.env.NODE_ENV === 'test') { // fallback or specific environment check if needed
    authInstance = getAuth(app);
} else {
    try {
        authInstance = initializeAuth(app, {
            persistence: getReactNativePersistence(ReactNativeAsyncStorage)
        });
    } catch (e) {
        // In case initializeAuth is called twice or fails
        authInstance = getAuth(app);
    }
}

export const auth = authInstance;
export const db = getFirestore(app);
