import { configureStore } from '@reduxjs/toolkit';
import myFavoriteReducer from './my-favorite/my-favorite.store';

const store = configureStore({
	reducer: {
		favorites: myFavoriteReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
