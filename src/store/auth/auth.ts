import {
	createAsyncThunk,
	createSlice,
	current,
	SerializedError,
} from '@reduxjs/toolkit';

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
	photoURL: string | any;
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
};

interface login {
	email: string;
	password: string;
}

interface loginAndUserName {
	email: string;
	password: string;
	displayName: string;
}

export const signWithPassword = createAsyncThunk(
	'login',
	async ({ email, password }: login) => {
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
	'signUp',
	async ({ email, password, displayName }: loginAndUserName) => {
		const userAuth = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);

		const authenticatedUser = {
			uid: userAuth.user.uid,
			email: userAuth.user.email,
			displayName: displayName,
			photoURL:
				'https://firebasestorage.googleapis.com/v0/b/shop-gg-ffcda.appspot.com/o/user-no-img.png?alt=media&token=174ed3fb-5d33-414c-b0ee-bf896b02fca4',
			favorites: [],
			isLogged: true,
		};

		return authenticatedUser;
	}
);

export const signInWithGooglePopup = createAsyncThunk(
	'loginWithGoogle',
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
				};
				state.user = users;
			});
		});

		builder.addCase(reloginUser.rejected, (state, action) => {
			state.user.error = action.error;
			alert(action.error);
		});

		builder.addCase(signWithPassword.fulfilled, (state, action) => {
			const { displayName, email, uid } = action.payload.user;

			const authenticatedUser = {
				uid: uid,
				email: email,
				displayName: displayName,
				photoURL:
					'https://firebasestorage.googleapis.com/v0/b/shop-gg-ffcda.appspot.com/o/user-no-img.png?alt=media&token=174ed3fb-5d33-414c-b0ee-bf896b02fca4',
				favorites: [],
				isLogged: true,
			};

			state.user = authenticatedUser;
		});

		builder.addCase(signWithPassword.rejected, (state, action) => {
			state.user.error = action.error;
			alert(action.error.message);
			console.error(action.error.message);
		});

		builder.addCase(
			createUserWithPasswordAndEmail.fulfilled,
			(state, action) => {
				state.user = action.payload;
			}
		);

		builder.addCase(
			createUserWithPasswordAndEmail.rejected,
			(state, action) => {
				alert(action.error.message);
			}
		);

		builder.addCase(signInWithGooglePopup.fulfilled, (state, action) => {
			state.user = action.payload;
		});

		builder.addCase(signInWithGooglePopup.rejected, (state, action) => {
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
