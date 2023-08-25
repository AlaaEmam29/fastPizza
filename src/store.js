import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/user/userSlice';
import menuSlice from './features/menu/menuSlice';
import cartSlice from './features/cart/cartSlice';
import orderSlice from './features/order/orderSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    menu: menuSlice,
    cart: cartSlice,
    order: orderSlice,
  },
});
