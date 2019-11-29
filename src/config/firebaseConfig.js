import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE

var firebaseConfig = {
    apiKey: "AIzaSyDnYTCVKeoAvZFJdb5WV8U10IJMQ8i-jJU",
    authDomain: "todohw3-f9d85.firebaseapp.com",
    databaseURL: "https://todohw3-f9d85.firebaseio.com",
    projectId: "todohw3-f9d85",
    storageBucket: "todohw3-f9d85.appspot.com",
    messagingSenderId: "726892005265",
    appId: "1:726892005265:web:ce0299cf7abb20e1b4fc30",
    measurementId: "G-L0J6PCJEZ1"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)

// var firebaseConfig = {
//     apiKey: "AIzaSyCJxkqx-6PMJrZ7ACkrgbO55b5wmJdop1Y",
//     authDomain: "todo-rrf-316.firebaseapp.com",
//     databaseURL: "https://todo-rrf-316.firebaseio.com",
//     projectId: "todo-rrf-316",
//     storageBucket: "todo-rrf-316.appspot.com",
//     messagingSenderId: "892398996038",
//     appId: "1:892398996038:web:1fb9157fc6c5d266e01847",
//     measurementId: "G-TEGQB3MZ23"
// };
// firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;