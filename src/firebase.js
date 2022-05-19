import { initializeApp } from "firebase/app"
import {
	getFirestore,
	collection,
	getDocs,
	addDoc,
	getDoc,
	doc,
	query,
	orderBy,
	limit,
	where,
	startAfter,
} from "firebase/firestore/lite"
import { getStorage, ref, uploadBytes } from "firebase/storage"
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	GoogleAuthProvider,
	signInWithPopup,
	onAuthStateChanged,
} from "firebase/auth"

const firebaseConfig = {
	apiKey: "AIzaSyCk7uR1BWa_IfM272HxNwi4Qb0_dTFuk_4",
	authDomain: "devjobs-3ea13.firebaseapp.com",
	projectId: "devjobs-3ea13",
	storageBucket: "devjobs-3ea13.appspot.com",
	messagingSenderId: "204550330520",
	appId: "1:204550330520:web:ccd2867d4da0f94b19d8ed",
}

initializeApp(firebaseConfig)

export {
	getFirestore,
	collection,
	getDocs,
	getDoc,
	addDoc,
	doc,
	query,
	orderBy,
	limit,
	where,
	startAfter,
}
export { getStorage, ref, uploadBytes }
export {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	GoogleAuthProvider,
	signInWithPopup,
	onAuthStateChanged,
}
