import registerReducer, { initialState, registerUser } from "./registerSlice";

global.fetch = jest.fn();
describe("registerUser async thunk", () => {
  describe("registration/register", () => {
    it("should register with resolved response", async () => {
      fetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(),
      });
      const dispatch = jest.fn();
      const thunk = registerUser({
        email: "test@example.com",
        password: "password",
        name: "Kate",
      });
      await thunk(dispatch);

      const { calls } = dispatch.mock;

      expect(calls).toHaveLength(2);
      const [start] = calls;

      expect(start[0].type).toBe("registration/register/pending");
    });
    it("should fetch with rejected response", async () => {
      fetch.mockResolvedValue({
        ok: false,
      });
      const dispatch = jest.fn();
      const thunk = registerUser({
        email: "test@example.com",
        password: "password",
        name: "Kate",
      });
      await thunk(dispatch);

      const { calls } = dispatch.mock;
      expect(calls).toHaveLength(2);
      const [start, end] = calls;

      expect(start[0].type).toBe("registration/register/pending");
      expect(end[0].type).toBe("registration/register/rejected");
    });
  });
  describe("registerSlice", () => {
    it("shoud change status with registerUser.pending", () => {
      const state = registerReducer(initialState, registerUser.pending());
      expect(state.registerRequest).toBe(true);
      expect(state.error).toBeNull();
    });
    it("shoud change status with registerUser.fullfield", () => {
      const state = registerReducer(initialState, registerUser.fulfilled());
      expect(state).toEqual({
        registerRequest: false,
        registerSuccess: true,
        registerFailed: false,
        error: null,
      });
    });
    it("shoud change status with registerUser.rejected", () => {
      const state = registerReducer(initialState, registerUser.rejected());
      expect(state).toEqual({
        registerRequest: false,
        registerSuccess: false,
        registerFailed: true,
      });
    });
  });
});
