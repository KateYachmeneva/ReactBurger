import { combineReducers } from "redux"
import modalSlice from "../slices/modalSlice"
import getIngridientsSlice from "../slices/ingridientsSlice"
import appSlice from "../slices/appSlice"
import constrIngredientsSlice from "../slices/constrIngredientsSlice"
import orderDetailsSlice from "../slices/orderDetailsSlice"
import ingredientDetailsSlice from "../slices/ingredientDetailsSlice"

export const rootReducer = combineReducers({
  ingredients: getIngridientsSlice,
  modal: modalSlice,
  app: appSlice,
  constrIngredients:constrIngredientsSlice,
  orderDetails: orderDetailsSlice,
  ingredientDetails: ingredientDetailsSlice,
})
