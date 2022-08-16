import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const as = {
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
		user: as,
	},
	reducers: {
		login: (state, action) => {
			state.user = action.payload;
		},

		logout: (state) => {
			state.user = as;
		},
	},
});

export const { login, logout } = store.actions;

export const selectUser = (state) => state.user.user;

export default store.reducer;
