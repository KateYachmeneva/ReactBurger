import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getIngridientsApi } from "../../utils/api";

export const initialState = {
  isLoading: false,
  hasError: false,
  data: [],
  error: null,
};

export const getIngredients = createAsyncThunk(
  "ingredients/getAllWells",
  async () => {
    const response = await getIngridientsApi();
    return response;
  },
);
export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    setSelectedIngredient: (state, action) => {
      state.selectedIngredient = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getIngredients.pending, (state) => {
      state.isLoading = true;
      state.hasError = false;
      state.error = null;
    });
    builder.addCase(getIngredients.fulfilled, (state, action) => {
      state.isLoading = false;
      state.hasError = false;
      state.data = [...action.payload.data];
      state.error = null;
    });
    builder.addCase(getIngredients.rejected, (state, action) => {
      state.isLoading = false;
      state.hasError = true;
      state.error = action.payload;
    });
  },
});

export default ingredientsSlice.reducer;
export const { setSelectedIngredient } = ingredientsSlice.actions;
