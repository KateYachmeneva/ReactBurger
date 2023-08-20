import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    error: "",
    loader: false,
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers:{
        setError(state,action){
            state.error = action.payload
        },
        clearError(state){
            state.error = ""
        },
    },
})

export const {setError,clearError} = appSlice.actions
export default appSlice.reducer;