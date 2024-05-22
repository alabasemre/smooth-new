import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './slices/userSlice';
import { apiSlice } from './apis/apiSlice';

export const store = configureStore({
    reducer: { user: userReducer, [apiSlice.reducerPath]: apiSlice.reducer },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});
