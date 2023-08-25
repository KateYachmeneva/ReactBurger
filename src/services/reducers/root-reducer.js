import { combineReducers } from "redux";
import modalSlice from "../slices/modalSlice";
import getIngridientsSlice from "../slices/ingredientsSlice";
import appSlice from "../slices/appSlice";
import constrIngredientsSlice from "../slices/constrIngredientsSlice";
import orderDetailsSlice from "../slices/orderDetailsSlice";

export const rootReducer = combineReducers({
  ingredients: getIngridientsSlice,
  modal: modalSlice,
  app: appSlice,
  constrIngredients: constrIngredientsSlice,
  orderDetails: orderDetailsSlice,
});
