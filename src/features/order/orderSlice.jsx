import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  customOrder: {},
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    uploadCustomOrder: (state, action) => {
      state.customOrder = action.payload;
    },
  },
});
export const { uploadCustomOrder } = orderSlice.actions;

export default orderSlice.reducer;
