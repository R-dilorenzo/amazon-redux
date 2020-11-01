import { configureStore } from '@reduxjs/toolkit';
import basketReducer from '../features/basketSlice';
import filterReducer from '../features/filterSlice';
import loginReducer from '../features/loginSlice';

export default configureStore({
  reducer: {
    login: loginReducer,
    basket: basketReducer,
    filter:filterReducer,
  },
});
