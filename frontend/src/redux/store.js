import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./api/apiSlice";
import authReducer from './features/auth/authSlice.js'
import favoritesReducer from "../redux/features/favorites/favoriteSlice.js";
import { getFavoritesFromLocalStorage } from "../Utils/localStorage.js"

const initialFavorites = getFavoritesFromLocalStorage(),[]


const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth:authReducer,
        favorites:favoritesReducer,
    },
    preloadedState:{
        favorites:initialFavorites,
    },

    middleware:(getdefaultMiddleware) => getdefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,

})
setupListeners(store.dispatch);
export default store;
