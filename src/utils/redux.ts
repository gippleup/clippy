import ReduxActions from "@redux/actions";
import { ReduxRootState } from "@redux/schema";
import { useDispatch, useSelector } from "react-redux";
import { ActionCreator } from "redux"

type Actions = {[index: string]: ActionCreator<any>}
export type ReduxHookMethod<T extends Actions> = {
  [K in keyof T]: (...args: Parameters<T[K]>) => ReturnType<T[K]>
}

export const mapActionsToHookMethod = <T extends Actions>(dispatch: ReturnType<typeof useDispatch>, actions: T): ReduxHookMethod<T> => {
  const appendedDispatch = Object.entries(actions).map(([key, func]) => {
    const method = (...args: Parameters<ActionCreator<any>>) => dispatch(func(...args));
    return [key, method] as const;
  });
  
  const methodObj = appendedDispatch.reduce<Partial<ReduxHookMethod<T>>>((acc, ele) => {
    const [key, method] = ele;
    acc[key as keyof T] = method;
    return acc;
  }, {}) as ReduxHookMethod<T>;
  
  return methodObj;
}

// Actions are registered in redux/actions/index
type RegisteredActionKeys = keyof typeof ReduxActions;
type ReduxActionCollection = typeof ReduxActions;
export const createReduxHook
  : <K extends RegisteredActionKeys>(stateKey: K) => (() => {state: ReduxRootState[K], methods: ReduxHookMethod<ReduxActionCollection[K]>})
  = (stateKey) => () => {
  const state = useSelector((state: ReduxRootState) => state[stateKey]);
  const dispatch = useDispatch();
  const actions = ReduxActions[stateKey]
  const methods = mapActionsToHookMethod(dispatch, actions);
  return {
    state,
    methods,
  };
}
