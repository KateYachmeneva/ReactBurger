import { createReducer } from "@reduxjs/toolkit";
import { TFeedOrder, WebsocketStatus } from "../types/types";
import {
  wsOpen,
  wsClose,
  wsMessage,
  wsError,
  wsConnecting,
} from "../actions/actions";

type TFeedState = {
  status: WebsocketStatus;
  orders?: TFeedOrder[];
  total?: number;
  totalToday?: number;
  connectionError: string;
};

const initialState: TFeedState = {
  status: WebsocketStatus.OFFLINE,
  orders: [],
  total: 0,
  totalToday: 0,
  connectionError: "",
};

export const feedReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnecting, (state) => {
      state.status = WebsocketStatus.CONNECTING;
    })
    .addCase(wsOpen, (state) => {
      state.status = WebsocketStatus.ONLINE;
      state.connectionError = "";
    })
    .addCase(wsClose, (state) => {
      state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(wsError, (state, action) => {
      state.connectionError = action.payload;
    })
    .addCase(wsMessage, (state, action) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    });
});
