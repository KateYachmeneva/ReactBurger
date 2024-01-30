import logoutReducer, { initialState, logout } from "./logoutSlice";

describe("logout", () => {
  it("should set user to initial when logout is fulfilled", function () {
    const state = logoutReducer(initialState, logout.fulfilled());
    expect(state).toEqual({
      logoutRequest: false,
      logoutSuccess: true,
      logoutError: false,
      error: null,
    });
  });
});
