import ingredientsReducer, {
  initialState,
  getIngredients,
} from "./ingredientsSlice";
import { mockIngr } from "../../components/mocks/mocks";

global.fetch = jest.fn();
describe("getIngredients", () => {
  it("should fetchIngredients with resolved response", async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockIngr),
    });
    const dispatch = jest.fn();
    const thunk = getIngredients();
    await thunk(dispatch);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    const [start, end] = calls;

    expect(start[0].type).toBe("ingredients/getAll/pending");
    expect(end[0].type).toBe("ingredients/getAll/fulfilled");
    expect(end[0].payload).toBe(mockIngr.data);
  });

  it("should fetch with rejected response", async () => {
    fetch.mockResolvedValue({
      ok: false,
    });
    const dispatch = jest.fn();
    const thunk = getIngredients();
    await thunk(dispatch);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    const [start, end] = calls;

    expect(start[0].type).toBe("ingredients/getAll/pending");
    expect(end[0].type).toBe("ingredients/getAll/rejected");
  });
});
describe("ingredientsSlice", () => {
  it("shoud change status with getIngredients.pending", () => {
    const state = ingredientsReducer(initialState, getIngredients.pending());
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });
  it("shoud change status with getIngredients.fullfield", () => {
    const state = ingredientsReducer(
      initialState,
      getIngredients.fulfilled(mockIngr.data),
    );
    expect(state).toEqual({
      isLoading: false,
      hasError: false,
      data: mockIngr.data,
      error: null,
      selectedIngredient: null,
    });
  });
  it("shoud change status with getIngredients.rejected", () => {
    const state = ingredientsReducer(initialState, getIngredients.rejected());
    expect(state).toEqual({
      isLoading: false,
      hasError: true,
      data: [],
      selectedIngredient: null,
    });
  });
});
