import * as firebase from "firebase/app";
import "firebase/auth";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBXQuqFReL_x6akwdbJUQbXh1396jeSX28",
    authDomain: "react-contraction-timer.firebaseapp.com",
    databaseURL: "https://react-contraction-timer.firebaseio.com",
    projectId: "react-contraction-timer",
    storageBucket: "react-contraction-timer.appspot.com",
    messagingSenderId: "301223767318",
    appId: "1:301223767318:web:3187b6089ce11a6144b437",
    measurementId: "G-NWVB7L7JF0"
//   apiKey: process.env.REACT_APP_FIREBASE_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID
});

export default firebaseApp;
