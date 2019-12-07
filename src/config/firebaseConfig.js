import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE

// var firebaseConfig = {
//     apiKey: "AIzaSyDnYTCVKeoAvZFJdb5WV8U10IJMQ8i-jJU",
//     authDomain: "todohw3-f9d85.firebaseapp.com",
//     databaseURL: "https://todohw3-f9d85.firebaseio.com",
//     projectId: "todohw3-f9d85",
//     storageBucket: "todohw3-f9d85.appspot.com",
//     messagingSenderId: "726892005265",
//     appId: "1:726892005265:web:ce0299cf7abb20e1b4fc30",
//     measurementId: "G-L0J6PCJEZ1"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig)

var firebaseConfig = {
  apiKey: "AIzaSyAEm3xo-_O72rXe4WSMVMMbiCSK8Df-CXQ",
  authDomain: "wireframer-c69bd.firebaseapp.com",
  databaseURL: "https://wireframer-c69bd.firebaseio.com",
  projectId: "wireframer-c69bd",
  storageBucket: "wireframer-c69bd.appspot.com",
  messagingSenderId: "237829406656",
  appId: "1:237829406656:web:f4253b85fafd445221d225",
  measurementId: "G-DKSR8Z22HY"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
  
export default firebase;