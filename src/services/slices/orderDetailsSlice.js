import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { submitOrderApi } from "../../utils/api";
import { setError } from "./appSlice";
import { CODES } from "../../utils/errors";

export const initialState = {
  isLoading: false,
  hasError: false,
  orderData: {},
  error: null,
};

export const sendData = createAsyncThunk(
  "order/sendData",
  async (ingredients) => {
    const response = await submitOrderApi(ingredients);
    return response;
  },
);
export const orderDetailsSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(sendData.pending, (state) => {
      state.isLoading = true;
      state.hasError = false;
      state.error = null;
    });
    builder.addCase(sendData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orderData = action.payload;
      state.error = null;
    });
    builder.addCase(sendData.rejected, (state, action) => {
      state.isLoading = false;
      state.hasError = true;
      state.error = action.payload;
    });
  },
});

export default orderDetailsSlice.reducer;
