import { AppActionCollection } from "@redux/actions";
import { AppDispatch } from "@redux/store";
import { AsyncThunk } from "@reduxjs/toolkit";
import { getHandyArray } from "./array";

type SimplifiedQueryPromise = (Promise<any> & {
  abort: (reason?: string | undefined) => any;
});

export const queryPromiseManager = {
  pendingPromises: getHandyArray<SimplifiedQueryPromise>(),
  abortPrevious: function() {
    this.pendingPromises.forEach((p) => p.abort());
    this.pendingPromises.clear();
  },
  addNewPromise: function(promise: SimplifiedQueryPromise) {
    this.pendingPromises.push(promise);
    promise.finally(this.pendingPromises.remove.bind(null, promise));
  }
};

export const runAndRegisterToQueryManager
  = <A extends AsyncThunk<any, any, any>>(actionCreator: A, dispatch: AppDispatch) => (...args: any[]) => {
  const promise = dispatch(actionCreator(args));
  queryPromiseManager.addNewPromise(promise);
}