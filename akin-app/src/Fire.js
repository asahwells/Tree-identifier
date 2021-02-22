import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyBtPfIwHUraBlU7kPyB3Bo3BSSFRo8SGX8",
  authDomain: "akin-51006.firebaseapp.com",
  projectId: "akin-51006",
  storageBucket: "akin-51006.appspot.com",
  messagingSenderId: "637075462645",
  appId: "1:637075462645:web:c08c9f029a539aabd8e8bc",
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
export default fire;
