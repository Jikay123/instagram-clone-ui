import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyByvtY0wxP0qvbC11jNJ4wVrnVmUTJXJyA",
    authDomain: "instagram-clone-ce8dc.firebaseapp.com",
    projectId: "instagram-clone-ce8dc",
    storageBucket: "instagram-clone-ce8dc.appspot.com",
    messagingSenderId: "121828291140",
    appId: "1:121828291140:web:9b1b7e279f619e7ebb0211",
    measurementId: "G-0QJQX56296"
})
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
export { auth, storage, db };
export default db;