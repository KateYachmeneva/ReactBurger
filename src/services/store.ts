import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers/root-reducer";
import thunk from "redux-thunk";
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";
import { socketMiddleware } from "./middleware/socketMiddleware";
import { TWActions } from "../services/actions/actions";
import { ThunkAction } from "redux-thunk";
import {
  connect as WsConnect,
  disconnect as WsDisconnect,
  wsConnecting as WsConnecting,
  wsOpen as WsOpen,
  wsClose as WsClose,
  wsMessage as WsMessage,
  wsError as WsError,
} from "./actions/actions";
import type {} from "redux-thunk/extend-redux";
const wsActions = {
  wsConnect: WsConnect,
  wsDisconnect: WsDisconnect,
  wsConnecting: WsConnecting,
  onOpen: WsOpen,
  onClose: WsClose,
  onError: WsError,
  onMessage: WsMessage,
};

export type RootState = ReturnType<typeof rootReducer>;

const liveTableMiddleware = socketMiddleware(wsActions);

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(thunk, liveTableMiddleware);
  },
});
export type AppActions = TWActions;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AppActions
>;
export type AppDispatch = typeof store.dispatch;
export const useDispatch: () => AppDispatch = dispatchHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
