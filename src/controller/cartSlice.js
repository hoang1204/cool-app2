import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {storage} from '../core/utils/storage';

const initialState = {
  listCartProduct: [],
  key: 'null',
};
const checkIfItemExists = (list, item) => {
  return list.some(listItem => listItem.id === item.id);
};
export const cartSlice = createSlice({
  name: 'cart-slice',
  initialState,
  reducers: {
    addCart: (state, action) => {
      checkIfItemExists(state.listCartProduct, action.payload)
        ? (state.listCartProduct = state.listCartProduct.map(product => {
            if (product.id === action.payload.id) {
              return {
                ...product,
                amount:
                  product.amount >= 1 ? product.amount + 1 : product.amount,
              };
            }
            return {
              ...product,
            };
          }))
        : state.listCartProduct.push(action.payload);
      storage.set(state.key, JSON.stringify(state.listCartProduct));
    },
    removeCart: (state, action) => {
      state.listCartProduct = state.listCartProduct.filter(
        item => item.id !== action.payload.id,
      );
      storage.set(state.key, JSON.stringify(state.listCartProduct));
    },
    incrementAmount: (state, action) => {
      state.listCartProduct = state.listCartProduct.map(product => {
        if (product.id === action.payload.id) {
          return {
            ...product,
            amount: product.amount >= 1 ? product.amount + 1 : product.amount,
          };
        }
        return {
          ...product,
        };
      });
      storage.set(state.key, JSON.stringify(state.listCartProduct));
    },
    decrementAmount: (state, action) => {
      state.listCartProduct = state.listCartProduct.map(product => {
        if (product.id === action.payload.id) {
          return {
            ...product,
            amount: product.amount > 1 ? product.amount - 1 : 1,
          };
        }
        return {
          ...product,
        };
      });
      storage.set(state.key, JSON.stringify(state.listCartProduct));
    },
    removeAllCart: (state, action) => {
      state.listCartProduct = [];
      storage.set(state.key, JSON.stringify(state.listCartProduct));
    },
    loadDataLocal: (state, action) => {
      console.log(action.payload);
      const jsonListCartProduct = storage.getString(action.payload);
      console.log(jsonListCartProduct);
      state.key = action.payload;
      if (jsonListCartProduct != 'null')
        state.listCartProduct = JSON.parse(jsonListCartProduct);
      else state.listCartProduct = [];
    },
  },
});

export const {
  addCart,
  removeCart,
  incrementAmount,
  decrementAmount,
  removeAllCart,
  loadDataLocal,
} = cartSlice.actions;

export const selectCount = state => state.counter.value;

export const incrementIfOdd = amount => (dispatch, getState) => {};

export default cartSlice.reducer;
