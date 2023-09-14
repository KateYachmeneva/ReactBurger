import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserDataApi }from "../../utils/api";
import { setUserData } from "./userSlice";
import { getCookie } from "../../utils/cookie";


export const initialState = {
    getUserDataRequest: false,
    getUserDataSuccess: false,
    getUserDataError: false,
    authChecked: false,
  };
export const getUserInfo = createAsyncThunk(
  "userInfo/getUserInfo",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await getUserDataApi()
      dispatch(setUserData(response))
      
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const getUserDataSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    authChecked: (state) => {
      state.authChecked = true
    },
  },
  extraReducers(builder) {
    builder.addCase(getUserInfo.pending, (state) => {
      state.getUserDataRequest = true
      state.getUserDataSuccess = false
      state.getUserDataError = false
    })
    builder.addCase(getUserInfo.fulfilled, (state) => {
      state.getUserDataRequest = false
      state.getUserDataSuccess = true
      state.getUserDataError = false
    })
    builder.addCase(getUserInfo.rejected, (state) => {
      state.getUserDataRequest = false
      state.getUserDataSuccess = false
      state.getUserDataError = true
    })
  },
})



export const checkUserAuth = () => async (dispatch) => {
  if (getCookie("authToken")) {
    try {
      await dispatch(getUserInfo())
    } catch (error) {
      console.log(error)
    }
  }
  dispatch(authChecked())
}
export default getUserDataSlice.reducer
export const { authChecked } = getUserDataSlice.actions