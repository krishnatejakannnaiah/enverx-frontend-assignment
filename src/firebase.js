// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNtdBaSt6tzz-ela8683gQFO4RjO8k-38",
  authDomain: "test-yoeveh.firebaseapp.com",
  databaseURL: "https://test-yoeveh.firebaseio.com",
  projectId: "test-yoeveh",
  storageBucket: "test-yoeveh.appspot.com",
  messagingSenderId: "936728440705",
  appId: "1:936728440705:web:35796ed955fa4d0b5e0280",
  measurementId: "G-16ZHFN3JT5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firestore = getFirestore(app);
