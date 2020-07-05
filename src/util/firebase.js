import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// Make sure it hasn't already been initialized
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyBj6nGrCAR5CIsaksTEDtmHjfoPOHMKUus",
  });
}

export default firebase;
