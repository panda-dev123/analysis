import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// Make sure it hasn't already been initialized
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyBj6nGrCAR5CIsaksTEDtmHjfoPOHMKUus",
    authDomain: "driver-app-dev-53601.firebaseapp.com",
    projectId: "driver-app-dev-53601"
  });
}

export default firebase;
