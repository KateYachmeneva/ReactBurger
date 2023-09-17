import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { forgotPasswordApi, resetPasswordApi } from "../../utils/api";
export const initialState = {
  user: {},
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
  async (email, { rejectWithValue }) => {
    try {
      const response = await forgotPasswordApi(email);

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await resetPasswordApi(data);
      // dispatch(setUserData(response))

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export default userSlice.reducer;
export const { setUserData, logoutUser } = userSlice.actions;
