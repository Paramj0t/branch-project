import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
	apiKey: `${process.env.REACT_APP_API_KEY}`,
	authDomain: "branch-authentication.firebaseapp.com",
	projectId: "branch-authentication",
	storageBucket: "branch-authentication.appspot.com",
	messagingSenderId: "938621749339",
	appId: "1:938621749339:web:87e406275fc168675f577e",
	measurementId: "G-YYB0Q1GHP4",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
