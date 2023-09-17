import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUserDataApi } from "../../utils/api";
import { setCookie } from "../../utils/cookie";
import { setUserData } from "./userSlice";

const initialState = {
  loginRequest: false,
  loginSuccess: false,
  loginError: false,
};

export const logIn = createAsyncThunk(
  "login/user",
  async ({ email, password }, { dispatch }) => {
    try {
      const response = await loginUserDataApi({ email, password });
      const authToken = response.accessToken.split("Bearer ")[1];
      const refreshToken = response.refreshToken;
      setCookie("authToken", authToken);
      setCookie("refreshToken", refreshToken);
      localStorage.setItem("refreshToken", refreshToken);
      dispatch(setUserData(response));
      return response;
    } catch (error) {
      throw error;
    }
  },
);

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(logIn.pending, (state) => {
      state.loginRequest = true;
      state.loginSuccess = false;
      state.loginError = false;
    });
    builder.addCase(logIn.fulfilled, (state) => {
      state.loginRequest = false;
      state.loginSuccess = true;
      state.loginError = false;
    });
    builder.addCase(logIn.rejected, (state) => {
      state.loginRequest = false;
      state.loginSuccess = false;
      state.loginError = true;
    });
  },
});

export default loginSlice.reducer;
