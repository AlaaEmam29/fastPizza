import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { getAddress } from '../../services/apiGeocoding';
const getPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
export const fetchAddress = createAsyncThunk(
  'user/fetchAddress',
  async function () {
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    return { position, address };
  }
);

const initialState = {
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  status: 'idle',
  customer: {},
  address: '',
  position: '',
  error: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    onChangeInput: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    createUser: (state, action) => {
      localStorage.setItem('user', JSON.stringify(state));
    },
    customerInfo: (state, action) => {
      state.customer = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.address = action.payload.address;
        state.position = action.payload.position;
        state.status = 'idle';
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = 'error';
        state.address =
          'There was a problem getting your address. Make sure to fill this field!';
      }),
});
export const { onChangeInput, createUser, customerInfo } = userSlice.actions;

export default userSlice.reducer;
