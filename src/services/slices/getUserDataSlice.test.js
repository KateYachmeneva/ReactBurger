import { authChecked, getUserDataSlice } from "./getUserDataSlice";

describe("authChecked reducer", () => {
  it("should handle authChecked", () => {
    const initialState = {
      getUserDataRequest: false,
      getUserDataSuccess: false,
      getUserDataError: false,
      authChecked: false,
      error: null,
    };

    const action = authChecked();

    const newState = getUserDataSlice.reducer(initialState, action);

    expect(newState.authChecked).toBe(true);
  });
});
