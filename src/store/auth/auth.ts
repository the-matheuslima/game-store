import {
	createAsyncThunk,
	createSlice,
	current,
	SerializedError,
} from '@reduxjs/toolkit';
import { Auth } from 'firebase/auth';

import {
	auth,
	db,
	googleProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	collection,
	getDocs,
	query,
	where,
	getDoc,
	doc,
	setDoc,
} from '../../service/firebase/firebase';

const collectionRef = collection(db, 'users');

interface Iuser {
	email: string | null;
	photoURL: string | null;
	uid: string;
	displayName: string | null;
	favorites: Object[] | null;
	isLogged?: boolean;
	error?: SerializedError;
}

const user: Iuser = {
	email: '',
	photoURL: '',
	uid: '',
	displayName: '',
	favorites: [],
	isLogged: false,
	error: undefined,
};

interface log {
	email: string;
	password: string;
}

export const signWithPasswordAndEmail = createAsyncThunk(
	'login',
	async ({ email, password }: log) => {
		const SignInUser = await signInWithEmailAndPassword(auth, email, password);
		return SignInUser;
	}
);

export const reloginUser = createAsyncThunk(
	'relogin',
	async (userId: string) => {
		const stateQuery = query(collectionRef, where('uid', '==', userId));

		const querySnapshot = await getDocs(stateQuery);

		return querySnapshot;
	}
);

export const createUserWithPasswordAndEmail = createAsyncThunk(
	'signup',
	async ({ email, password }: log) => {
		const userAuth = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		return userAuth;
	}
);

export const signInWithGooglePopup = createAsyncThunk(
	'loginwhitegoogle',
	async () => {
		const r = await signInWithPopup(auth, googleProvider);
		const { displayName, email, uid, photoURL } = r.user;

		const authenticatedUser = {
			uid: uid,
			email: email,
			displayName: displayName,
			photoURL: photoURL,
			favorites: [],
			isLogged: true,
		};
		return authenticatedUser;
	}
);

export const createUserDocumentFromAuth = createAsyncThunk(
	'createUserDocument',
	async (userAuth: Iuser) => {
		if (!userAuth.isLogged) return;

		const userDocRef = doc(db, 'users', userAuth.uid);

		return await getDoc(userDocRef);
	}
);

const store = createSlice({
	name: 'user',
	initialState: {
		user: user,
	},
	reducers: {
		logout: (state) => {
			state.user = user;
			auth.signOut();
		},
	},
	extraReducers(builder) {
		builder.addCase(reloginUser.fulfilled, (state, action) => {
			action.payload.forEach((doc) => {
				const userInfo = doc.data();
				const users = {
					uid: userInfo.uid,
					email: userInfo.email,
					displayName: userInfo.displayName,
					photoURL: userInfo.photoURL,
					favorites: userInfo.favorites,
					isLogged: true,
					error: undefined,
				};
				state.user = users;
			});
		});

		builder.addCase(reloginUser.rejected, (state, action) => {
			state.user.error = action.error;
			alert(action.error);
		});

		builder.addCase(signWithPasswordAndEmail.fulfilled, (state, action) => {
			const { displayName, email, uid } = action.payload.user;

			const authenticatedUser = {
				uid: uid,
				email: email,
				displayName: displayName,
				photoURL: '',
				favorites: [],
				isLogged: true,
			};

			state.user = authenticatedUser;
		});

		builder.addCase(signWithPasswordAndEmail.rejected, (state, action) => {
			state.user.error = action.error;
			alert(action.error.message);
			console.error(action.error.message);
		});

		builder.addCase(
			createUserWithPasswordAndEmail.fulfilled,
			(state, action) => {
				const { displayName, email, uid } = action.payload.user;

				const authenticatedUser = {
					uid: uid,
					email: email,
					displayName: displayName,
					photoURL: '',
					favorites: [],
					isLogged: true,
				};
				state.user = authenticatedUser;
			}
		);

		builder.addCase(
			createUserWithPasswordAndEmail.rejected,
			(state, action) => {
				state.user.error = action.error;
				alert(action.error.message);
			}
		);

		builder.addCase(signInWithGooglePopup.fulfilled, (state, action) => {
			state.user = action.payload;
		});

		builder.addCase(signInWithGooglePopup.rejected, (state, action) => {
			state.user.error = action.error;
			console.log(action.error.message);
			alert(action.error.message);
		});
		builder.addCase(createUserDocumentFromAuth.fulfilled, (state, action) => {
			if (!action.payload?.exists()) {
				const { displayName, email, uid, photoURL, favorites } = current(
					state.user
				);
				const userDocRef = doc(db, 'users', uid);

				const createdAt = new Date();

				try {
					setDoc(userDocRef, {
						displayName: displayName,
						photoURL: photoURL,
						email,
						createdAt,
						uid,
						favorites: favorites,
					});
				} catch (error) {
					console.log('error creating the user', error);
				}
			}
		});
	},
});

export const { logout } = store.actions;

export const selectUser = (state) => state.user.user;

export default store.reducer;
