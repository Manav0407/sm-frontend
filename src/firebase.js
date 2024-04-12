
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxWS82pI5LJufCcO6vJ59nzCLfFIN1eaY",
  authDomain: "instagram-1718f.firebaseapp.com",
  projectId: "instagram-1718f",
  storageBucket: "instagram-1718f.appspot.com",
  messagingSenderId: "36089774485",
  appId: "1:36089774485:web:49427d8f52e7432228769c",
  measurementId: "G-LNLMTM6C28"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app;