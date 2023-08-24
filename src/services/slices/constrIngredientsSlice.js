import {createSlice} from "@reduxjs/toolkit";



export const initialState = {
  constructorIngredients: [],
  bun: null
}

export const constrIngredientsSlice = createSlice({
  name:"constrIngredients",
  initialState,
  reducers:{
    updateconstrIngredients:(state,action) => {
           const ingredients = [...state.constructorIngredients];
           ingredients.splice(
            action.payload.to,
            0,
            ingredients.splice(action.payload.from, 1)[0]
            );
           state.constructorIngredients = ingredients;
           },

    addconstrIngredients:(state,action)=>{
            const newIngredient ={
              ...action.payload,
              uuid: crypto.randomUUID()
            }
            state.constructorIngredients.push(newIngredient);
    },
   setconstrBun: (state,action) => {
            state.bun = action.payload;
     },
   deleteconstrIngredient:(state,action) => {
    const ingredients = [...state.constructorIngredients.filter(ingredient => ingredient.uuid !== action.payload.uuid)];
            state.constructorIngredients = ingredients;
        },
       },
  })
export const {updateconstrIngredients,addconstrIngredients,setconstrBun,deleteconstrIngredient} = constrIngredientsSlice.actions;
export default constrIngredientsSlice.reducer;