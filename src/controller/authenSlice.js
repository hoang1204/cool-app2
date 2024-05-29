import {createAsyncThunk, createSlice, isPending} from '@reduxjs/toolkit';
import axios from 'axios';
import auth from '@react-native-firebase/auth';
import {storage} from '../core/utils/storage';
const initialState = {
  message: null,
  user: null,
  loading: false,
  error: null,
};
//errors
export const signUpUser = createAsyncThunk('authen/signUp', async user => {
  try {
    await auth().createUserWithEmailAndPassword(user.userName, user.userPass);

    return 'Đăng ký thành công';
  } catch (error) {
    // Xử lý lỗi Firebase
    var errorMessage;
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = 'Email đã được sử dụng';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Email không hợp lệ';
    } else {
      errorMessage = error.message;
    }
    return errorMessage;
  }
});
//errors
export const loginUser = createAsyncThunk('authen/login', async userInfo => {
  try {
    const user = await auth().signInWithEmailAndPassword(
      'hoangchomoi@gmail.com',
      'Hoangcmbk1!',
    );

    return JSON.stringify({
      message: 'Đăng nhập thành công',
      user: user,
    });
  } catch (error) {
    // Xử lý lỗi Firebase
    var errorMessage;
    if (error.code === 'auth/invalid-email') {
      errorMessage = 'Email không hợp lệ';
    } else if (error.code === 'auth/wrong-password') {
      errorMessage = 'Sai mật khẩu';
    } else {
      errorMessage = error.message;
    }
    return {
      message: errorMessage,
      user: null,
    };
  }
});
export const authenSlice = createSlice({
  name: 'authen',
  initialState,
  reducers: {
    saveUserInfo: (state, action) => {
      var payload = action.payload;
      var userInfo = JSON.stringify({
        email: payload.user.email,
        uid: payload.user.uid,
      });
      state.user = userInfo;
      storage.set('userInfo', userInfo);
      //   console.log(storage.getString('userInfo'));
    },
    logoutUser: (state, action) => {
      state.user = null;
      storage.delete('userInfo');
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signUpUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.error = null;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      });
  },
});
export const {setMessageNull, saveUserInfo, logoutUser} = authenSlice.actions;
export default authenSlice.reducer;
