import { useDispatch } from "react-redux";
import { ActionCreator } from "redux"

type Actions = {[index: string]: ActionCreator<any>}
export type ReduxHookMethod<T extends Actions> = {
  [K in keyof T]: (...args: Parameters<T[K]>) => ReturnType<T[K]>
}

export const mapActionsToHookMethod = <T extends Actions>(dispatch: ReturnType<typeof useDispatch>, actions: T): ReduxHookMethod<T> => {
  const appenedDispatch = Object.entries(actions).map(([key, func]) => {
    const method = (...args: Parameters<ActionCreator<any>>) => dispatch(func(...args));
    return [key, method] as const;
  });
  
  const methodObj = appenedDispatch.reduce<Partial<ReduxHookMethod<T>>>((acc, ele) => {
    const [key, method] = ele;
    acc[key as keyof T] = method;
    return acc;
  }, {}) as ReduxHookMethod<T>;
  
  return methodObj;
}