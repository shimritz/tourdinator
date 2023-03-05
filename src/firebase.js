// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgVv9RsgcoftgLHsvazxIkUpOAah73X-0",
  authDomain: "tourdinator.firebaseapp.com",
  projectId: "tourdinator",
  storageBucket: "tourdinator.appspot.com",
  messagingSenderId: "790513505040",
  appId: "1:790513505040:web:3ec176075bea19cf8b0b95",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
