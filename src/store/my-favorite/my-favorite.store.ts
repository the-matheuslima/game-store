import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
		addInFavorites: (state, action: PayloadAction<favorite>) => {
			const existingCartItem = state.favorite.find(
				(favoriteItem) => favoriteItem.id === action.payload.id
			);

			if (existingCartItem) {
				return;
			}

			state.favorite.push(action.payload);
		},

		removeInFavorites: (state, action: PayloadAction<favorite>) => {
			state.favorite = state.favorite.filter(
				(favoriteItem) => favoriteItem.id !== action.payload.id
			);
		},
	},
});

export const { addInFavorites, removeInFavorites } = store.actions;

export default store.reducer;
