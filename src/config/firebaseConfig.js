import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
    apiKey: "AIzaSyDYxjAgAdOeE_7hztW5r4hNj0KuEYrT99o",
    authDomain: "wireframefinal.firebaseapp.com",
    databaseURL: "https://wireframefinal.firebaseio.com",
    projectId: "wireframefinal",
    storageBucket: "wireframefinal.appspot.com",
    messagingSenderId: "956354670200",
    appId: "1:956354670200:web:e6c4fe81593ca9fef2878d",
    measurementId: "G-RN2Z33SB9Y"
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;