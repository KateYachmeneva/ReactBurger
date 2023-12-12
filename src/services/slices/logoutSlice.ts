import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { logoutApi } from "../../utils/api";
import { getCookie, deleteCookie } from "../../utils/cookie";
import { logoutUser } from "./userSlice";

interface ILogoutSlice {
  logoutRequest: boolean;
  logoutSuccess: boolean;
  logoutError: boolean;
  error: null | unknown;
}

const initialState: ILogoutSlice = {
  logoutRequest: false,
  logoutSuccess: false,
  logoutError: false,
  error: null,
};

export const logout = createAsyncThunk(
  "user/resetPassword",
  async (_, { dispatch }) => {
    const refreshToken = getCookie("refreshToken");
    if (refreshToken) {
      const response = await logoutApi(refreshToken);
      deleteCookie("authToken");
      deleteCookie("refreshToken");
      dispatch(logoutUser());
      return response;
    }
  },
);

export const logoutSlice = createSlice({
  name: "logout",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(logout.pending, (state) => {
      state.logoutRequest = true;
      state.logoutSuccess = false;
      state.logoutError = false;
      state.error = null;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.logoutRequest = false;
      state.logoutSuccess = true;
      state.logoutError = false;
      state.error = null;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.logoutRequest = false;
      state.logoutSuccess = false;
      state.logoutError = true;
      state.error = action.payload;
    });
  },
});

export default logoutSlice.reducer;
