import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [] }; //Local storage can only store strings, so we need to parse it into a JSON object

const cartSlice = createSlice({
  name: 'cart',
  initialState,
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
      return updateCart(state);
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
