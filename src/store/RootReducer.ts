import { combineReducers } from '@reduxjs/toolkit';
import loaderReducer from './feaures/loading/loaderSetUpSlice';
import cartReducer from './feaures/cart/cartDetailsSlice';

const rootReducer = combineReducers({
  loaderState: loaderReducer,
  cartState: cartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
