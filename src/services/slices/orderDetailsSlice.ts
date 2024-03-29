import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { submitOrderApi } from "../../utils/api";
import { TIngredientDataWithUuid } from "../types/types";
import { TOrderData } from "../types/types";
import { getCookie } from "../../utils/cookie";
type TOrderInitialState = {
  orderData: TOrderData;
  isLoading: boolean;
  hasError: boolean;
  error: null | unknown;
};
export const initialState: TOrderInitialState = {
  isLoading: false,
  hasError: false,
  orderData: {
    name: "",
    order: {
      number: null,
    },
    success: false,
  },
  error: null,
};

export const sendData = createAsyncThunk(
  "order/sendData",
  async (ingredients: TIngredientDataWithUuid[]) => {
    const response = await submitOrderApi(ingredients, getCookie("authToken"));
    return response;
  },
);
export const orderDetailsSlice = createSlice({
  name: "orderDetails",
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
      state.orderData = action.payload as TOrderData;
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
