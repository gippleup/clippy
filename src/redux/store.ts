import { configureStore } from "@reduxjs/toolkit";
import rootReducer from '@redux/reducers/index';
import { useDispatch } from "react-redux";
import ReduxActions from "./actions";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: true,
    serializableCheck: false,
    immutableCheck: false,
  }),
});

const boot = () => {
  store.dispatch(ReduxActions.recentQuery.get());
  store.dispatch(ReduxActions.clipped.get());
}

boot();

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>() 
export default store;