import ReduxActions from "@redux/actions";
import { ReduxRootState } from "@redux/schema";
import { AppDispatch, useAppDispatch } from "@redux/store";
import { useSelector } from "react-redux";
import { ActionCreator } from "redux"

type Actions = {[index: string]: ActionCreator<any>}
export type ReduxHookMethod<T extends Actions> = {
  [K in keyof T]: (...args: Parameters<T[K]>) => ReturnType<ReturnType<T[K]>>;
}

type MethodMappingOption<T extends Actions> = {
  [K in keyof T]?: (actionCreator: T[K], dispatch: AppDispatch) => (...args: Parameters<T[K]>) => any; 
}

export const appendDispatchToActions
  = <T extends Actions>(dispatch: AppDispatch, actions: T, methodMapping?: MethodMappingOption<T>) => {
  return Object.entries(actions).map(([key, actionCreator]) => {
    const mapFunc = methodMapping !== undefined ? methodMapping[key] : undefined;
    const method = mapFunc
      ? mapFunc(actionCreator as T[string], dispatch)
      : (...args: Parameters<ActionCreator<any>>) => dispatch(actionCreator(...args));
    return [key, method] as const;
  });;
}

export const mapActionsToHookMethod
  = <T extends Actions>(dispatch: AppDispatch, actions: T, methodMapping?: MethodMappingOption<T>): ReduxHookMethod<T> => {
  const appendedDispatch = appendDispatchToActions(dispatch, actions, methodMapping);  
  return appendedDispatch.reduce<Partial<ReduxHookMethod<T>>>((acc, ele) => {
    const [key, method] = ele;
    acc[key as keyof T] = method;
    return acc;
  }, {}) as ReduxHookMethod<T>;;
}

// Actions are registered in redux/actions/index
type RegisteredActionKeys = keyof typeof ReduxActions;
type ReduxActionCollection = typeof ReduxActions;
export const createReduxHook
  : <K extends RegisteredActionKeys>(stateKey: K, methodMappingOption?: MethodMappingOption<ReduxActionCollection[K]>) => (() => {state: ReduxRootState[K], methods: ReduxHookMethod<ReduxActionCollection[K]>})
  = (stateKey, methodMappingOption) => () => {
  const state = useSelector((state: ReduxRootState) => state[stateKey]);
  const dispatch = useAppDispatch();
  const actions = ReduxActions[stateKey]
  const methods = mapActionsToHookMethod(dispatch, actions, methodMappingOption);
  return {
    state,
    methods,
  };
}
