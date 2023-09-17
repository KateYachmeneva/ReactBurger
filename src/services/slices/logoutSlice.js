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
};

export const logout = createAsyncThunk(
  "user/resetPassword",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const refreshToken = getCookie("refreshToken");
      const response = await logoutApi(refreshToken);
      deleteCookie("authToken");
      deleteCookie("refreshToken");
      dispatch(logoutUser());
      return response;
    } catch (error) {
      throw error;
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
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.logoutRequest = false;
      state.logoutSuccess = true;
      state.logoutError = false;
    });
    builder.addCase(logout.rejected, (state) => {
      state.logoutRequest = false;
      state.loginSuccess = false;
      state.loginError = true;
    });
  },
});

export default logoutSlice.reducer;
