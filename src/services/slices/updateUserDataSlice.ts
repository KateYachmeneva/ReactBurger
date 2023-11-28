import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateUserDataApi } from "../../utils/api";
import { setUserData } from "./userSlice";
import { getCookie } from "../../utils/cookie";
import { TFullUserData } from "../../utils/types";

export type TUpdateUserState = {
  updateUserDataRequest: boolean;
  updateUserDataSuccess: boolean;
  updateUserDataFailed: boolean;
  authchecked: boolean;
  error: null | unknown;
};
export const initialState: TUpdateUserState = {
  updateUserDataRequest: false,
  updateUserDataSuccess: false,
  updateUserDataFailed: false,
  authchecked: false,
  error: null,
};
export const updateUserInfo = createAsyncThunk(
  "userInfo/getUserInfo",
  async (data: TFullUserData, { dispatch }) => {
    const authToken = getCookie("authToken");
    if (authToken) {
      const response = await updateUserDataApi(authToken, data);
      dispatch(setUserData(response));
      return response;
    }
  },
);

export const updateUserDataSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    authChecked: (state) => {
      state.authchecked = true;
    },
  },
  extraReducers(builder) {
    builder.addCase(updateUserInfo.pending, (state) => {
      state.updateUserDataRequest = true;
      state.updateUserDataSuccess = false;
      state.updateUserDataFailed = false;
      state.error = null;
    });
    builder.addCase(updateUserInfo.fulfilled, (state) => {
      state.updateUserDataRequest = false;
      state.updateUserDataSuccess = true;
      state.updateUserDataFailed = false;
      state.error = null;
    });
    builder.addCase(updateUserInfo.rejected, (state, action) => {
      state.updateUserDataRequest = false;
      state.updateUserDataSuccess = false;
      state.updateUserDataFailed = true;
      state.error = action.payload;
    });
  },
});

export default updateUserDataSlice.reducer;
