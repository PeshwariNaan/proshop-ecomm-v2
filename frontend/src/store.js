import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
import cartSliceReducer from './slices/cartSlice';
import authSliceReducer from './slices/authSlice';

const cartMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  localStorage.setItem('cart', JSON.stringify(store.getState().cart));
  return result;
};

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer,
    auth: authSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware).concat(cartMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
