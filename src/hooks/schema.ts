import { ActionCreator } from "redux"

type Actions = {[index: string]: ActionCreator<any>}
export type ReduxHookMethod<T extends Actions> = {
  [K in keyof T]: (...args: Parameters<T[K]>) => ReturnType<T[K]>
}
