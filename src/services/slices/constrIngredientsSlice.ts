import { createSlice } from "@reduxjs/toolkit";
import { TIngredientDataWithUuid} from '../../utils/types';
import missingIcon from "../../images/missing-icon.svg";



interface SliceState {
  constructorIngredients:TIngredientDataWithUuid[];

  bun: TIngredientDataWithUuid;
}

const initialState:SliceState = {
  constructorIngredients: [],
  bun: {
    _id: "",
    name: "Нет булки",
    type: "",
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: missingIcon,
    image_mobile: "",
    image_large: "",
    uuid: "",
  },
};

export const constrIngredientsSlice = createSlice({
  name: "constrIngredients",
  initialState,
  reducers: {
    updateconstrIngredients: (state, action) => {
      const ingredients = [...state.constructorIngredients];
      ingredients.splice(
        action.payload.to,
        0,
        ingredients.splice(action.payload.from, 1)[0],
      );
      state.constructorIngredients = ingredients;
    },

    addconstrIngredients: (state, action) => {
      const newIngredient = {
        ...action.payload,
        uuid: crypto.randomUUID(),
      };
      state.constructorIngredients.push(newIngredient);
    },
    setconstrBun: (state, action) => {
      state.bun = action.payload;
    },
    undoconstrIngredients: (state, action) => {
      state.constructorIngredients = action.payload;
    },
    deleteconstrIngredient: (state, action) => {
      const ingredients = [
        ...state.constructorIngredients.filter(
          (ingredient) => ingredient.uuid !== action.payload.uuid,
        ),
      ];
      state.constructorIngredients = ingredients;
    },
  },
});
export const {
  updateconstrIngredients,
  addconstrIngredients,
  setconstrBun,
  deleteconstrIngredient,
  undoconstrIngredients,
} = constrIngredientsSlice.actions;
export default constrIngredientsSlice.reducer;
