import {configureStore} from '@reduxjs/toolkit';
import homeReducer from './controller/homeSlice';
import cartReducer from './controller/cartSlice';
import userReducer from './controller/userSlice';
import authenSlice from './controller/authenSlice';
export const store = configureStore({
  reducer: {
    homeFetchData: homeReducer,
    cartReducer: cartReducer,
    userReducer: userReducer,
    authenReducer: authenSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
