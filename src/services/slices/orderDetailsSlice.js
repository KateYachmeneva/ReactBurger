import {createAsyncThunk,createSlice} from "@reduxjs/toolkit";
import { getIngridientsApi } from "../../utils/api";
import { setError } from "./appSlice";
import { CODES } from "../../utils/errors";


export const initialState = {
  isLoading: false,
  hasError: false,
  data: []
}

export const getIngredients = createAsyncThunk(
  "ingredients/getAllWells",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await getIngridientsApi()
       return response
    } catch (error) {
      dispatch(setError(CODES.SERVER_ERR))
      return rejectWithValue(error)
    }
  }
)
export const orderDetailsSlice = createSlice({
  name:"ingredients",
  initialState,
  reducers:{},
  extraReducers(builder) {
    builder.addCase(getIngredients.pending, (state) => {
      state.isLoading = true
      state.hasError= false
     })
    builder.addCase(getIngredients.fulfilled, (state, action) => {
      state.isLoading = false
      state.hasError= false
      state.data = [...action.payload.data]
     
    })
    builder.addCase(getIngredients.rejected, (state) => {
      state.isLoading = false
      state.hasError= true
    })
  },
})

export default orderDetailsSlice.reducer