import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../service/firebase/firebase';
import { favorite } from '../../types/games';

const store = createSlice({
	name: 'Myfavorites',
	initialState: {
		favorite: [
			{
				id: 0,
				name: '',
				background_image: '',
				metacritic: 0,
				genres: [
					{
						id: 0,
						name: '',
						slug: '',
					},
				],
			},
		],
	},

	reducers: {
		addInFavorites: (state, { payload }: PayloadAction<favorite>) => {
			const existingCartItem = state.favorite.find(
				(favoriteItem) => favoriteItem.id === payload.id
			);

			if (existingCartItem) {
				return;
			}

			state.favorite.push(payload);

			// const UpdateRef = doc(db, 'users', auth.currentUser.uid);
			// updateDoc(UpdateRef, {
			// 	favorites: [...current(state.favorite)],
			// });
		},

		removeInFavorites: (state, { payload }: PayloadAction<favorite>) => {
			state.favorite = state.favorite.filter(
				(favoriteItem) => favoriteItem.id !== payload.id
			);

			// const UpdateRef = doc(db, 'users', auth.currentUser.uid);
			// updateDoc(UpdateRef, {
			// 	favorites: [...state.favorite],
			// });
		},
	},
});

export const { addInFavorites, removeInFavorites } = store.actions;

export default store.reducer;
