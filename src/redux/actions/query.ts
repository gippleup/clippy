import { createAction } from "@reduxjs/toolkit";

const set = createAction<string>('query/set');
const clear = createAction<undefined>('query/clear');

export default {
  set,
  clear
}