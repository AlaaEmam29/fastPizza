import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  menu: [],
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    addMenuData: (state, action) => {
      state.menu = action.payload;
    },
  },
});
export const { addMenuData, updateMenuData } = menuSlice.actions;

export default menuSlice.reducer;
