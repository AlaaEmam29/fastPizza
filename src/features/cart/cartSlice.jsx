import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  cart: [],
  totalPrice: 0,
  isOpen: false,
  totalOrder: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.cart.push(action.payload);
      state.totalPrice += action.payload.totalPrice;
      state.isOpen = true;
      state.totalOrder += action.payload.quantity;
    },
    deleteItem: (state, action) => {
      const deletedItem = state.cart.find(
        (cartItem) => cartItem.id === action.payload
      );
      if (deletedItem) {
        state.totalPrice -= deletedItem.totalPrice;
        state.cart = state.cart.filter(
          (cartItem) => cartItem.id !== action.payload
        );

        state.totalOrder -= deletedItem.quantity;
        state.isOpen = true;
      }
    },
    increaseItemQuantity: (state, action) => {
      const item = state.cart.find((cart) => cart.id === action.payload);
      if (item) {
        item.quantity++;
        state.totalOrder++;
        item.totalPrice = item.price * item.quantity;
        state.totalPrice += item.price;
        state.isOpen = true;
      }
      if (state.cart.length === 0) {
        return initialState;
      }
    },

    decreaseItemQuantity: (state, action) => {
      const item = state.cart.find((cart) => cart.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity--;
        state.totalOrder--;
        item.totalPrice = item.price * item.quantity;
        state.totalPrice -= item.price;
        state.isOpen = true;
      }
      if (state.cart.length === 0) {
        return initialState;
      }
    },
    clearCart: () => initialState,
  },
});
export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export const isInCart = (cart, id) => cart.find((item) => item.id === id);

export default cartSlice.reducer;
