import userReducer, {
  initialState,
  setUserData,
  logoutUser,
} from "./userSlice";

describe("user reducer", () => {
  it("should return the initial state", () => {
    const state = userReducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  it("should handle setUserData", () => {
    const user = { id: 1, name: "John Doe" };
    const state = userReducer(initialState, setUserData({ user }));
    expect(state).toEqual({
      ...initialState,
      user,
      isLoggedIn: true,
    });
  });

  it("should handle logoutUser", () => {
    const state = userReducer(initialState, logoutUser());
    expect(state).toEqual({
      user: {},
      loginRequest: false,
      loginFailed: false,
      isLoggedIn: false,
      loginError: false,
    });
  });
});
