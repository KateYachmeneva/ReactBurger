import {
    TypedUseSelectorHook,
    useSelector as selectorHook,
    useDispatch as dispatchHook,
  } from "react-redux"
  import { RootState } from "./reducers/root-reducer"

  import { AppDispatch } from "./store"


  type DispatchFunc = () => AppDispatch
  export const useSelector: TypedUseSelectorHook<RootState> = selectorHook
  export const useDispatch: DispatchFunc = dispatchHook
