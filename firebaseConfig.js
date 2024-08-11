// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWWH4nLawtCKl9PrkSBswMoNSUDBS9L7Y",
  authDomain: "file-sharing-8bcf3.firebaseapp.com",
  projectId: "file-sharing-8bcf3",
  storageBucket: "file-sharing-8bcf3.appspot.com",
  messagingSenderId: "340990386328",
  appId: "1:340990386328:web:7307fe73776d55b544b0ed",
  measurementId: "G-18S7G8DVD8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
