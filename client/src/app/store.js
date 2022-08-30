import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import reviewReducer from '../features/reviews/reviewSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    reviews: reviewReducer 
  }
});