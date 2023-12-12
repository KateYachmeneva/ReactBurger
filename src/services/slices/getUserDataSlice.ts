import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { getUserDataApi, updateTokenApi } from "../../utils/api";
import { setUserData } from "./userSlice";
import { getCookie, setCookie } from "../../utils/cookie";
import { TTokenData } from "../types/types";

interface IUserDataSlice {
  getUserDataRequest: boolean;
  getUserDataSuccess: boolean;
  getUserDataError: boolean;
  authChecked: boolean;
  error: null | unknown;
}
export const initialState: IUserDataSlice = {
  getUserDataRequest: false,
  getUserDataSuccess: false,
  getUserDataError: false,
  authChecked: false,
  error: null,
};
export const getUserInfo = createAsyncThunk(
  "userInfo/getUserInfo",
  async (_, { dispatch }) => {
    const response = await getUserDataApi();
    dispatch(setUserData(response));
    return response;
  },
);
export const checkUserAuth = () => async (dispatch: AppDispatch) => {
  if (getCookie("authToken")) {
    try {
      await dispatch(getUserInfo() as any);
    } catch (error) {}
  }
  dispatch(authChecked());
};
export const refreshToken = createAsyncThunk(
  "userInfo/refreshToken",
  async (_, { dispatch }) => {
    try {
      const refreshTokenCookie = getCookie("refreshToken");
      if (typeof refreshTokenCookie !== "string") {
        return { error: "Refresh token is missing." };
      }
      const response: TTokenData = await updateTokenApi(refreshTokenCookie);
      const authToken = response.accessToken.split("Bearer ")[1];
      const refreshToken = response.refreshToken;
      setCookie("authToken", authToken);
      setCookie("refreshToken", refreshToken);
      dispatch(getUserInfo());
      return response;
    } catch (error) {
      if (error === "jwt expired") {
        // Если токен истек, вызываем refreshToken
        dispatch(refreshToken());
      } else {
        throw error; // Ошибка будет автоматически обработана в rejected
      }
    }
  },
);

export const getUserDataSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    authChecked: (state) => {
      state.authChecked = true;
    },
  },
  extraReducers(builder) {
    builder.addCase(getUserInfo.pending, (state) => {
      state.getUserDataRequest = true;
      state.getUserDataSuccess = false;
      state.getUserDataError = false;
      state.error = null;
    });
    builder.addCase(getUserInfo.fulfilled, (state) => {
      state.getUserDataRequest = false;
      state.getUserDataSuccess = true;
      state.getUserDataError = false;
      state.error = null;
    });
    builder.addCase(getUserInfo.rejected, (state, action) => {
      state.getUserDataRequest = false;
      state.getUserDataSuccess = false;
      state.getUserDataError = true;
      state.error = action.payload;
    });
    builder.addCase(refreshToken.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export default getUserDataSlice.reducer;
export const { authChecked } = getUserDataSlice.actions;
