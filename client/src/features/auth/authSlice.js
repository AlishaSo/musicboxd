import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

//get user from local storage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

//signUp user
export const signUp = createAsyncThunk('auth/sign-up', async (user, thunkAPI) => {
  try {
    return await authService.signUp(user);
  } catch(e) {
    const message =  (e.response && 
      e.response.data && 
      e.response.data.message) || 
      e.message || 
      e.toString();

    return thunkAPI.rejectWithValue(message);
  }
})

//login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch(e) {
    const message =  (e.response && 
      e.response.data && 
      e.response.data.message) || 
      e.message || 
      e.toString();

    return thunkAPI.rejectWithValue(message);
  }
})

//logout user
export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: state => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    }
  },
  extraReducers: builder => {
    builder
      .addCase(signUp.pending, state => {
        state.isLoading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, state => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, state => {
        state.user = null;
      })
  }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;