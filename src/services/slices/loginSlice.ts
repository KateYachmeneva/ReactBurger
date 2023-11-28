import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUserDataApi } from "../../utils/api";
import { setCookie } from "../../utils/cookie";
import { setUserData } from "./userSlice";
import { ILoginUserData, TTokenData } from "../../utils/types";

interface ILoginSlice {
  loginRequest: boolean;
  loginSuccess: boolean;
  loginError: boolean;
  error: null | unknown;
}
const initialState: ILoginSlice = {
  loginRequest: false,
  loginSuccess: false,
  loginError: false,
  error: null,
};

export const logIn = createAsyncThunk(
  "login/user",
  async ({ email, password }: ILoginUserData, { dispatch }) => {
    const response: TTokenData = await loginUserDataApi({ email, password });
    const authToken = response.accessToken.split("Bearer ")[1];
    const refreshToken = response.refreshToken;
    setCookie("authToken", authToken);
    setCookie("refreshToken", refreshToken);
    localStorage.setItem("refreshToken", refreshToken);
    dispatch(setUserData(response));
    return response;
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
      state.error = null;
    });
    builder.addCase(logIn.fulfilled, (state) => {
      state.loginRequest = false;
      state.loginSuccess = true;
      state.loginError = false;
      state.error = null;
    });

    builder.addCase(logIn.rejected, (state, action) => {
      state.loginRequest = false;
      state.loginSuccess = false;
      state.loginError = true;
      state.error = action.payload;
    });
  },
});

export default loginSlice.reducer;
