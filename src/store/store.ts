import { configureStore } from '@reduxjs/toolkit';
import myFavoriteReducer from './my-favorite/my-favorite.store';
import userReducer from './auth/auth';

const store = configureStore({
	reducer: {
		favorites: myFavoriteReducer,
		auth: userReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
