import {createAsyncThunk,createSlice} from "@reduxjs/toolkit";
import { submitOrderApi } from "../../utils/api";
import { setError } from "./appSlice";
import { CODES } from "../../utils/errors";


export const initialState = {
  isLoading: false,
  hasError: false,
  orderData: {},
}

export const sendData = createAsyncThunk(
  "order/sendData",
  async (ingredients, { dispatch, rejectWithValue }) => {
    try {
      const response = await submitOrderApi(ingredients)
       return response
    } catch (error) {
      dispatch(setError(CODES.SERVER_ERR))
      return rejectWithValue(error)
    }
  }
)
export const orderDetailsSlice = createSlice({
  name:"data",
  initialState,
  reducers:{},
  extraReducers(builder) {
    builder.addCase(sendData.pending, (state) => {
      state.isLoading = true
      state.hasError= false
     })
    builder.addCase(sendData.fulfilled, (state, action) => {
      state.isLoading = false
      state.orderData = action.payload
           
    })
    builder.addCase(sendData.rejected, (state) => {
      state.isLoading = false
      state.hasError= true
    })
  },
})

export default orderDetailsSlice.reducer