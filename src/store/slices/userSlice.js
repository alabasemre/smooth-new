import { createSlice } from '@reduxjs/toolkit';

const defaultState = {
    isLoggedIn: localStorage.getItem('userInfo') ? true : false,
    userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null,
};

const userSlice = createSlice({
    name: 'user',
    initialState: defaultState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        logout(state, action) {
            state.userInfo = null;
            state.isLoggedIn = false;
            localStorage.removeItem('userInfo');
        },
    },
});

export const { login, logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
