import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getIngredientsApi } from "../../utils/api";
import { TIngredientData } from "../types/types";

interface IngredientsState {
  isLoading: boolean;
  hasError: boolean;
  data: TIngredientData[];
  error: unknown | null;
  selectedIngredient?: TIngredientData | null;
}
const initialState: IngredientsState = {
  isLoading: false,
  hasError: false,
  data: [] as TIngredientData[],
  error: null,
  selectedIngredient: null,
};

export const getIngredients = createAsyncThunk(
  "ingredients/getAll",
  async function (_) {
    const response = await getIngredientsApi();
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
      state.data = [...action.payload];
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
