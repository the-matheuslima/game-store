import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	collection,
	query,
	getDocs,
	where,
} from 'firebase/firestore';
import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	signInWithPopup,
	GoogleAuthProvider,
	Auth,
} from 'firebase/auth';

const firebaseConfig = {
	apiKey: `${import.meta.env.VITE_FIREBASE_API_KEY}`,
	authDomain: 'shop-gg-ffcda.firebaseapp.com',
	projectId: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}`,
	storageBucket: 'shop-gg-ffcda.appspot.com',
	messagingSenderId: `${import.meta.env.VITE_FIREBASE_MESSAGIN_SENDER_ID}`,
	appId: `${import.meta.env.VITE_FIREBASE_APP_ID}`,
	measurementId: `${import.meta.env.VITE_FIREBASE_MEASUREMENT_ID}`,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();

export const googleProvider = new GoogleAuthProvider();

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
	onAuthStateChanged(auth, callback);

export {
	createUserWithEmailAndPassword,
	updateProfile,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	signInWithPopup,
	collection,
	getDocs,
	query,
	where,
	doc,
	getDoc,
	setDoc,
};
