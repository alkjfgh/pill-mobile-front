import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth,initializeAuth,getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlXIimwPPpjorhlwjSaiK4AgLfCNVk9vE",
  authDomain: "pill-mobile-442106.firebaseapp.com",
  projectId: "pill-mobile-442106",
  storageBucket: "pill-mobile-442106.firebasestorage.app",
  messagingSenderId: "224490414807",
  appId: "1:224490414807:web:587e08b3332d2694828692",
  measurementId: "G-7Q59ZPELRX"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const app = initializeApp(firebaseConfig);
initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const auth = getAuth(app);
const db = getFirestore(app); 

export { auth, db };