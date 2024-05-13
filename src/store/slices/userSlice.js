import { createSlice } from '@reduxjs/toolkit';

const defaultState = {
    isLoggedIn: true,
    email: '',
    role: '',
    id: '',
    token: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState: defaultState,
    reducers: {
        login(state, action) {
            (state.isLoggedIn = true), (state.email = action.payload.email);
            (state.role = action.payload.role),
                (state.id = action.payload.id),
                (state.token = action.payload.token);
        },
        logout(state, action) {
            return defaultState;
        },
    },
});

export const { login, logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
