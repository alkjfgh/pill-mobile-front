import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth,initializeAuth,getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbvimiuvv4JazC3pjhWrk1TbH5CqwvPuE",
  authDomain: "pill-mobile.firebaseapp.com",
  projectId: "pill-mobile",
  storageBucket: "pill-mobile.firebasestorage.app",
  messagingSenderId: "583595223332",
  appId: "1:583595223332:web:2dc42ee0d51fd60e48ebb1",
  measurementId: "G-M1DP7DMJNT"
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