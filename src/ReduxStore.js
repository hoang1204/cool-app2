import {configureStore} from '@reduxjs/toolkit';
import homeReducer from './controller/homeSlice';
import cartReducer from './controller/cartSlice';
import userReducer from './controller/userSlice';
export const store = configureStore({
  reducer: {
    homeFetchData: homeReducer,
    cartReducer: cartReducer,
    userReducer: userReducer,
  },
});
