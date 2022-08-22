import { configureStore } from '@reduxjs/toolkit';
import myFavoriteReducer from './my-favorite/my-favorite.store';
import userReducer from './auth/auth';
import { useDispatch } from 'react-redux';

const store = configureStore({
	reducer: {
		favorites: myFavoriteReducer,
		auth: userReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch();

export default store;
