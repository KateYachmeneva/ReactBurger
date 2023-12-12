import { createSlice } from "@reduxjs/toolkit";

interface IAppSliceState {
  error: string;
  loader: Boolean;
}
const initialState: IAppSliceState = {
  error: "",
  loader: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setError(state, action) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = "";
    },
  },
});

export const { setError, clearError } = appSlice.actions;
export default appSlice.reducer;
