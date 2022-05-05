import { initializeApp } from "firebase/app"

import { getFirestore, collection, getDoc, doc } from "firebase/firestore/lite"

const firebaseConfig = {
	apiKey: "AIzaSyCk7uR1BWa_IfM272HxNwi4Qb0_dTFuk_4",
	authDomain: "devjobs-3ea13.firebaseapp.com",
	projectId: "devjobs-3ea13",
	storageBucket: "devjobs-3ea13.appspot.com",
	messagingSenderId: "204550330520",
	appId: "1:204550330520:web:ccd2867d4da0f94b19d8ed",
}

initializeApp(firebaseConfig)

export { getFirestore, collection, getDoc, doc }
