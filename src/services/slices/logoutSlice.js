import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { logoutApi } from "../../utils/api";
import { setError } from "./appSlice";
import { CODES } from "../../utils/errors";
import { getCookie, deleteCookie } from "../../utils/cookie";
import { logoutUser } from "./userSlice";
import { useSelector } from "react-redux";

const initialState = {
  logoutRequest: false,
  logoutSuccess: false,
  logoutError: false,
  error: null,
};

export const logout = createAsyncThunk(
  "user/resetPassword",
  async (_, { dispatch }) => {
    const refreshToken = getCookie("refreshToken");
    const response = await logoutApi(refreshToken);
    deleteCookie("authToken");
    deleteCookie("refreshToken");
    dispatch(logoutUser());
    return response;
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
      state.loginSuccess = false;
      state.loginError = true;
      state.error = action.payload;
    });
  },
});

export default logoutSlice.reducer;
