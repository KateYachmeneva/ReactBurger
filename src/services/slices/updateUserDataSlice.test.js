import updateUserDataReducer, {
  initialState,
  authChecked,
  updateUserInfo,
  updateUserDataSlice,
} from "./updateUserDataSlice";

global.fetch = jest.fn();

describe("updateUserInfo async thunk", () => {
  describe("userInfo/getUserInfo", () => {
    it("should register with resolved response", async () => {
      fetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(),
      });
      const dispatch = jest.fn();
      const thunk = updateUserInfo({
        email: "test@example.com",
        password: "password",
        name: "Kate",
      });
      await thunk(dispatch);

      const { calls } = dispatch.mock;

      expect(calls).toHaveLength(2);
      const [start] = calls;

      expect(start[0].type).toBe("userInfo/getUserInfo/pending");
    });
    it("should fetch with rejected response", async () => {
      fetch.mockResolvedValue({
        ok: false,
      });
      const dispatch = jest.fn();
      const thunk = updateUserInfo({
        email: "test@example.com",
        password: "password",
        name: "Kate",
      });
      await thunk(dispatch);

      const { calls } = dispatch.mock;
      expect(calls).toHaveLength(2);
      const [start] = calls;

      expect(start[0].type).toBe("userInfo/getUserInfo/pending");
    });
  });
  describe("RegisterSlice", () => {
    it("shoud change status with getUserInfo.pending", () => {
      const state = updateUserDataReducer(
        initialState,
        updateUserInfo.pending(),
      );
      expect(state.updateUserDataRequest).toBe(true);
      expect(state.error).toBeNull();
    });
    it("shoud change status with getUserInfo.fullfield", () => {
      const state = updateUserDataReducer(
        {
          updateUserDataRequest: false,
          updateUserDataSuccess: false,
          updateUserDataFailed: false,
        },
        updateUserInfo.fulfilled(),
      );
      expect(state).toEqual({
        updateUserDataRequest: false,
        updateUserDataSuccess: true,
        updateUserDataFailed: false,
        error: null,
      });
    });
    it("shoud change status with getUserInfo.rejected", () => {
      const state = updateUserDataReducer(
        initialState,
        updateUserInfo.rejected(),
      );
      expect(state).toEqual({
        updateUserDataRequest: false,
        updateUserDataSuccess: false,
        updateUserDataFailed: true,
        authchecked: false,
      });
    });
  });
});

describe("authChecked reducer", () => {
  it("should handle authChecked", () => {
    const initState = {
      updateUserDataRequest: false,
      updateUserDataSuccess: false,
      updateUserDataError: false,
      updateUserDataFailed: false,
      authchecked: false,
      error: null,
    };

    const action = authChecked();

    const newState = updateUserDataSlice.reducer(initState, action);

    expect(newState.authchecked).toBe(true);
  });
});
