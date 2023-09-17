import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { registerUserRequestApi } from "../../utils/api";
import { setError } from "./appSlice";
import { CODES } from "../../utils/errors";
import { setUserData } from "./userSlice";
import { setCookie } from "../../utils/cookie";

export const initialState = {
  registerRequest: false,
  registerFailed: false,
  registerSuccess: false,
};

export const registerUser = createAsyncThunk(
  "registration/register",
  async ({ email, password, name }, { dispatch, rejectWithValue }) => {
    try {
      const response = registerUserRequestApi({
        email,
        password,
        name,
      });
      const authToken = response.accessToken.split("Bearer ")[1];
      const refreshToken = response.refreshToken;
      setCookie("authToken", authToken);
      setCookie("refreshToken", refreshToken);
      dispatch(setUserData(response));
      return response;
    } catch (error) {
      throw error;
    }
  },
);

export const registerSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(registerUser.pending, (state) => {
      state.registerRequest = true;
      state.registerSuccess = false;
      state.registerFailed = false;
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.registerRequest = false;
      state.registerSuccess = true;
      state.registerFailed = false;
    });
    builder.addCase(registerUser.rejected, (state) => {
      state.registerRequest = false;
      state.registerSuccess = false;
      state.registerFailed = true;
    });
  },
});

export default registerSlice.reducer;
