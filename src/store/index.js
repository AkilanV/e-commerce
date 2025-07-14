import { configureStore } from '@reduxjs/toolkit';
import loaderReducer from './feaures/loading/loaderSetUpSlice';

export const store = configureStore({
  reducer: {
    loader: loaderReducer,
  },
});
