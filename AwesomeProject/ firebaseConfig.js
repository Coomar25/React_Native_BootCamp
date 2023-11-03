// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth";

import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
  apiKey: "AIzaSyCW5HcGRXc5Q8CvmC6yHY0g01MU3AWtP-c",
  authDomain: "awesome-4bab8.firebaseapp.com",
  projectId: "awesome-4bab8",
  storageBucket: "awesome-4bab8.appspot.com",
  messagingSenderId: "686327247537",
  appId: "1:686327247537:web:93aeda908baf06bfb1a890",
  measurementId: "G-TZ1JQ2T5HJ"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// const analytics = getAnalytics(app);

const app = initializeApp(firebaseConfig);
export const googleProvider = new GoogleAuthProvider(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});



export { app, auth };