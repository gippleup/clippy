import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import rootReducer from '@redux/reducers/index';
import thunk from 'redux-thunk';

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
})

export default store;