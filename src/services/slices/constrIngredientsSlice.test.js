import constrIngredientsReducer, {
  initialState,
  updateconstrIngredients,
  setconstrBun,
  addconstrIngredients,
  undoconstrIngredients,
  deleteconstrIngredient,
} from "./constrIngredientsSlice";
import {
  firstIngredient,
  secondIngredient,
} from "../../components/mocks/mocks";
import missingIcon from "../../images/missing-icon.svg";

describe("constrIngredients reducer", () => {
  it("should handle initial state", () => {
    expect(constrIngredientsReducer(undefined, { type: "unknown" })).toEqual(
      initialState,
    );
  });

  it("should handle updateconstrIngredients", () => {
    const action = {
      type: updateconstrIngredients.type,
      payload: { from: 0, to: 2 },
    };

    const newState = constrIngredientsReducer(
      {
        ...initialState,
        constructorIngredients: [firstIngredient, secondIngredient],
      },
      action,
    );

    expect(newState).toEqual({
      constructorIngredients: [secondIngredient, firstIngredient],
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
    });
  });

  it("should handle addconstrIngredients", () => {
    const newIngredient = {
      name: "New Ingredient",
      type: "Type",
      proteins: 3,
      fat: 5,
      carbohydrates: 10,
      calories: 80,
      price: 1.5,
      image: "new-ingredient-image-path",
      image_mobile: "new-ingredient-mobile-image-path",
      image_large: "new-ingredient-large-image-path",
    };
    const action = {
      type: addconstrIngredients.type,
      payload: newIngredient,
    };
    const newState = constrIngredientsReducer(initialState, action);

    expect(newState.constructorIngredients).toHaveLength(1);
    expect(newState.constructorIngredients[0]).toEqual({
      ...newIngredient,
    });
  });

  it("should handle setconstrBun", () => {
    const action = {
      type: setconstrBun.type,
      payload: firstIngredient,
    };

    const newState = constrIngredientsReducer(initialState, action);

    expect(newState.bun).toEqual(firstIngredient);
  });

  it("should handle undoconstrIngredients", () => {
    const action = {
      type: undoconstrIngredients.type,
      payload: [],
    };

    const newState = constrIngredientsReducer(initialState, action);

    expect(newState.constructorIngredients).toEqual(
      initialState.constructorIngredients,
    );
  });

  it("should handle deleteconstrIngredient", () => {
    const initialState = {
      constructorIngredients: [
        { uuid: "1", name: "Ingredient 1" },
        { uuid: "2", name: "Ingredient 2" },
        { uuid: "3", name: "Ingredient 3" },
      ],
      bun: {
        _id: "bun-id",
        name: "Bun",
        type: "Bun Type",
        proteins: 5,
        fat: 10,
        carbohydrates: 20,
        calories: 150,
        price: 2.5,
        image: "bun-image-path",
        image_mobile: "bun-mobile-image-path",
        image_large: "bun-large-image-path",
        uuid: "bun-uuid",
      },
    };

    const action = {
      type: deleteconstrIngredient.type,
      payload: { uuid: "2" },
    };

    const newState = constrIngredientsReducer(initialState, action);

    expect(newState.constructorIngredients).toEqual([
      { uuid: "1", name: "Ingredient 1" },
      { uuid: "3", name: "Ingredient 3" },
    ]);
  });
});
