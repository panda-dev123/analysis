import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// Make sure it hasn't already been initialized
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyBj6nGrCAR5CIsaksTEDtmHjfoPOHMKUus",
    authDomain: "driver-app-dev-53601.firebaseapp.com",
    databaseURL: "https://driver-app-dev-53601.firebaseio.com/",
    projectId: "driver-app-dev-53601",
    storageBucket: "driver-app-dev-53601.appspot.com",
    messagingSenderId: "625683953041",
    appId: "1:625683953041:web:eaf8873cb33948cc065630",
    measurementId: "G-ZG1PRS5Q03"
  });
}

export default firebase;
