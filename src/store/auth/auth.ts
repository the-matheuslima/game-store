import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const user = {
	email: '',
	image: '',
	uid: '',
	userName: '',
	favorites: [],
	isLogged: false,
};

const store = createSlice({
	name: 'user',
	initialState: {
		user: user,
	},
	reducers: {
		login: (state, action) => {
			state.user = action.payload;
		},

		logout: (state) => {
			state.user = user;
		},
	},
});

export const { login, logout } = store.actions;

export const selectUser = (state) => state.user.user;

export default store.reducer;
