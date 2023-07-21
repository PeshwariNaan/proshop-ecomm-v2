import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

const cartFromLocalStorage = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' };

const cartSlice = createSlice({
  name: 'cart',
  initialState: cartFromLocalStorage,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existingItem = state.cartItems.find(
        (itemInCart) => itemInCart._id === item._id
      );
      if (existingItem) {
        state.cartItems = state.cartItems.map((itemInCart) =>
          itemInCart._id === existingItem._id ? item : itemInCart
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      //return updateCart(state, item);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
      //return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      //return updateCart(state);
    },
  },
});

export const { addToCart, removeFromCart, saveShippingAddress } =
  cartSlice.actions;

export default cartSlice.reducer;
