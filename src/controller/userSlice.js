import {createAsyncThunk, createSlice, isPending} from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
  userInfo: {},
  isLoading: false,
  isErrors: false,
};

export const fetchUserAPI = createAsyncThunk('home/fetchUser', async () => {
  const response = await axios.get('https://fakestoreapi.com/users/2');
  return response.data;
});
export const updateUserInfo = createAsyncThunk(
  'home/updateUserInfo',
  async userUpdate => {
    const response = await axios.put('https://fakestoreapi.com/users/1', {
      email: userUpdate.email,
      username: userUpdate.username,
      password: userUpdate.password,
      name: {
        firstname: userUpdate.name.firstname,
        lastname: userUpdate.name.lastname,
      },
      address: {
        city: userUpdate.address.city,
        street: userUpdate.address.street,
        number: 3,
        zipcode: userUpdate.address.zipcode,
        geolocation: {
          lat: userUpdate.address.geolocation.lat,
          long: userUpdate.address.geolocation.long,
        },
      },
      phone: userUpdate.phone,
    });
    return response.data;
  },
);
export const userSlice = createSlice({
  name: 'fetchUser',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchUserAPI.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isErrors = false;
        state.userInfo = action.payload;
      })
      .addCase(fetchUserAPI.pending, (state, action) => {
        state.isLoading = true;
        state.isErrors = false;
      })
      .addCase(fetchUserAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.isErrors = true;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isErrors = false;
      })
      .addCase(updateUserInfo.pending, (state, action) => {
        state.isLoading = true;
        state.isErrors = false;
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isErrors = true;
      });
  },
});

export default userSlice.reducer;
