import type { Middleware } from "redux";
import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from "@reduxjs/toolkit";
import { RootState } from "../store";

//универсальность мидлвару. Указываем что 0будет приходить экшн с неким пейлоудом(тип пейлоуда указываем)

export type TwsActionTypes = {
  wsConnect: ActionCreatorWithPayload<string>;
  wsDisconnect: ActionCreatorWithoutPayload;
  wsSendMessage?: ActionCreatorWithPayload<any>;
  wsConnecting: ActionCreatorWithoutPayload;
  onOpen: ActionCreatorWithoutPayload;
  onClose: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<any>;
};

export const socketMiddleware = (
  wsActions: TwsActionTypes,
): Middleware<{}, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;
    let isConnected = false;
    let reconnectTimer = 0;
    let url = "";

    return (next) => (action) => {
      const { dispatch } = store;
      const {
        wsConnect,
        wsSendMessage,
        onOpen,
        onClose,
        onError,
        onMessage,
        wsConnecting,
        wsDisconnect,
      } = wsActions;
      if (wsConnect.match(action)) {
        url = action.payload;
        socket = new WebSocket(url);
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch(onOpen());
          isConnected = true;
          dispatch(wsConnecting());
        };

        socket.onerror = (event) => {
          dispatch(onError(event.type));
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch(onMessage(parsedData));
        };

        socket.onclose = (event) => {
          if (event.code !== 1000) {
            dispatch(onError(event.code.toString()));
          }
          dispatch(onClose());
          if (isConnected) {
            dispatch(wsConnecting);
            reconnectTimer = window.setTimeout(() => {
              dispatch(wsConnect(url));
            }, 3000);
          }
        };

        if (wsSendMessage?.match) {
          const payload = action.payload;
          const message = { ...payload };
          socket.send(JSON.stringify(message));
        }
        if (wsDisconnect?.match(action)) {
          clearTimeout(reconnectTimer);
          isConnected = false;
          reconnectTimer = 0;
          socket.close();
          dispatch(onClose());
        }
      }

      next(action);
    };
  };
};
