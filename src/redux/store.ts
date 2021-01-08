import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import rootReducer from '@redux/reducers/index';
import thunk from 'redux-thunk';
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: true,
    serializableCheck: false,
    immutableCheck: false,
  }),
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>() 
export default store;