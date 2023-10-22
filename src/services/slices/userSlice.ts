import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { forgotPasswordApi, resetPasswordApi } from "../../utils/api";
import { TFullUserData,TFormData} from "../../utils/types";

interface IUserData {
  user: TFullUserData,
  loginRequest: boolean,
  loginFailed: boolean,
  isLoggedIn: boolean,
  loginError: null | unknown,
}
export const initialState : IUserData = {
  user: {} as TFullUserData,
  loginRequest: false,
  loginFailed: false,
  isLoggedIn: false,
  loginError: false,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      Object.assign(state, {
        user: action.payload.user,
        isLoggedIn: true,
      });
    },
    logoutUser: (state) => {
      Object.assign(state, {
        user: {},
        loginRequest: false,
        loginFailed: false,
        isLoggedIn: false,
        loginError: false,
      });
    },
  },
});

export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (email:string) => {
    const response = await forgotPasswordApi(email);

    return response;
  },
);
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (data: TFormData) => {
    const response = await resetPasswordApi(data);
    return response;
  },
);

export default userSlice.reducer;
export const { setUserData, logoutUser } = userSlice.actions;
