import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	signInWithPopup,
	GoogleAuthProvider,
} from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyDekGLBcTW3H5kMdfv2kWS_OJF7r5Vbt28',
	authDomain: 'shop-gg.firebaseapp.com',
	projectId: 'shop-gg',
	storageBucket: 'shop-gg.appspot.com',
	messagingSenderId: '1021609844189',
	appId: '1:1021609844189:web:527e0ec0b6d14ad1b8aa34',
	measurementId: 'G-97M7KL8FQ1',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();

export const googleProvider = new GoogleAuthProvider();

export const createUserDocumentFromAuth = async (
	userAuth,
	additionalInformation = {}
) => {
	if (!userAuth) return;

	const userDocRef = doc(db, 'users', userAuth.uid);

	const userSnapshot = await getDoc(userDocRef);

	if (!userSnapshot.exists()) {
		const { displayName, email, uid, photoURL } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				userName: displayName,
				image: photoURL,
				email,
				createdAt,
				uid,
				...additionalInformation,
			});
		} catch (error) {
			console.log('error creating the user', error);
		}
	}

	return userDocRef;
};

export const signInWithGooglePopup = () =>
	signInWithPopup(auth, googleProvider);

export const signOutUser = async () => await signOut(auth);

export {
	createUserWithEmailAndPassword,
	updateProfile,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
};
