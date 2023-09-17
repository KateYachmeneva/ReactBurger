import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateUserDataApi } from "../../utils/api";
import { setUserData } from "./userSlice";
import { getCookie } from "../../utils/cookie";

export const initialState = {
  updateUserDataRequest: false,
  updateUserDataSuccess: false,
  updateUserDataError: false,
  authChecked: false,
};
export const updateUserInfo = createAsyncThunk(
  "userInfo/getUserInfo",
  async (data, { dispatch }) => {
    console.log(data);
    try {
      const response = await updateUserDataApi(getCookie("authToken"), data);
      dispatch(setUserData(response));

      return response;
    } catch (error) {
      throw error;
    }
  },
);

export const updateUserDataSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    authChecked: (state) => {
      state.authChecked = true;
    },
  },
  extraReducers(builder) {
    builder.addCase(updateUserInfo.pending, (state) => {
      state.updateUserDataRequest = true;
      state.updateUserDataSuccess = false;
      state.updateUserDataError = false;
    });
    builder.addCase(updateUserInfo.fulfilled, (state) => {
      state.updateUserDataRequest = false;
      state.updateUserDataSuccess = true;
      state.updateUserDataError = false;
    });
    builder.addCase(updateUserInfo.rejected, (state) => {
      state.updateUserDataRequest = false;
      state.updateUserDataSuccess = false;
      state.updatetUserDataError = true;
    });
  },
});

export default updateUserDataSlice.reducer;
