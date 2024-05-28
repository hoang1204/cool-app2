import {createAsyncThunk, createSlice, isPending} from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
  listProduct: [],
  listProduct2: [],
  isLoading1: false,
  isErrors1: false,
  isLoading2: false,
  isErrors2: false,
};

export const fetchDataAPI = createAsyncThunk(
  'home/fetchAllProduct',
  async () => {
    // isLoading1 = true;
    // isErrors1 = false;
    const response = await axios.get(
      'https://fakestoreapi.com/products?limit=10',
    );
    return response.data;
  },
);
export const fetchDataAPI1_1 = createAsyncThunk(
  'home/fetchAllProduct1_1',
  async () => {
    // isLoading1 = true;
    // isErrors1 = false;
    const response = await axios.get(
      'https://fakestoreapi.com/products?sort=desc',
    );
    return response.data;
  },
);
export const fetchDataAPI2 = createAsyncThunk(
  'home/fetchAllProduct2',
  async () => {
    const response = await axios.get(
      'https://fakestoreapi.com/products/category/electronics',
    );
    return response.data;
  },
);
export const homeSlice = createSlice({
  name: 'fetchData',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchDataAPI.fulfilled, (state, action) => {
        state.isLoading1 = false;
        state.isErrors1 = false;
        state.listProduct = action.payload;
      })
      .addCase(fetchDataAPI.pending, (state, action) => {
        state.isLoading1 = true;
        state.isErrors1 = false;
      })
      .addCase(fetchDataAPI.rejected, (state, action) => {
        state.isLoading1 = false;
        state.isErrors1 = true;
      })
      .addCase(fetchDataAPI2.fulfilled, (state, action) => {
        state.isLoading2 = false;
        state.isErrors2 = false;
        state.listProduct2 = action.payload;
      })
      .addCase(fetchDataAPI2.pending, (state, action) => {
        state.isLoading2 = true;
        state.isErrors2 = false;
      })
      .addCase(fetchDataAPI2.rejected, (state, action) => {
        state.isLoading2 = false;
        state.isErrors2 = true;
      })
      .addCase(fetchDataAPI1_1.fulfilled, (state, action) => {
        state.isLoading1 = false;
        state.isErrors1 = false;
        state.listProduct = action.payload;
        console.log('load api Vertical 22');
      })
      .addCase(fetchDataAPI1_1.pending, (state, action) => {
        state.isLoading1 = true;
        state.isErrors1 = false;
      })
      .addCase(fetchDataAPI1_1.rejected, (state, action) => {
        state.isLoading1 = false;
        state.isErrors1 = true;
      });
  },
});

export default homeSlice.reducer;
