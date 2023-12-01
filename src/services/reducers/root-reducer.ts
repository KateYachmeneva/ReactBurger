import { combineReducers } from "redux";
import modalSlice from "../slices/modalSlice";
import getIngridientsSlice from "../slices/ingredientsSlice";
import appSlice from "../slices/appSlice";
import userSlice from "../slices/userSlice";
import registerSlice from "../slices/registerSlice";
import getUserDataSlice from "../slices/getUserDataSlice";
import constrIngredientsSlice from "../slices/constrIngredientsSlice";
import orderDetailsSlice from "../slices/orderDetailsSlice";
import { feedReducer } from "./feedReducer";

export const rootReducer = combineReducers({
  ingredients: getIngridientsSlice,
  modal: modalSlice,
  app: appSlice,
  constrIngredients: constrIngredientsSlice,
  orderDetails: orderDetailsSlice,
  userData: userSlice,
  auth: getUserDataSlice,
  register: registerSlice,
  feed: feedReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
