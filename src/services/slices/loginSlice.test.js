import loginReducer, { initialState, logIn } from "./loginSlice";

global.fetch = jest.fn();
describe("logIn async thunk", () => {
  describe("login/user", () => {
    it("should login with resolved response", async () => {
      fetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(),
      });
      const dispatch = jest.fn();
      const thunk = logIn({ email: "test@example.com", password: "password" });
      await thunk(dispatch);

      const { calls } = dispatch.mock;

      expect(calls).toHaveLength(2);
      const [start] = calls;

      expect(start[0].type).toBe("login/user/pending");
    });
    it("should fetch with rejected response", async () => {
      fetch.mockResolvedValue({
        ok: false,
      });
      const dispatch = jest.fn();
      const thunk = logIn({ email: "test@example.com", password: "password" });
      await thunk(dispatch);

      const { calls } = dispatch.mock;
      expect(calls).toHaveLength(2);
      const [start, end] = calls;

      expect(start[0].type).toBe("login/user/pending");
      expect(end[0].type).toBe("login/user/rejected");
    });
  });
  describe("loginSlice", () => {
    it("shoud change status with logIn.pending", () => {
      const state = loginReducer(initialState, logIn.pending());
      expect(state.loginRequest).toBe(true);
      expect(state.error).toBeNull();
    });
    it("shoud change status with logIn.fullfield", () => {
      const state = loginReducer(initialState, logIn.fulfilled());
      expect(state).toEqual({
        loginRequest: false,
        loginSuccess: true,
        loginError: false,
        error: null,
      });
    });
    it("shoud change status with logIn.rejected", () => {
      const state = loginReducer(initialState, logIn.rejected());
      expect(state).toEqual({
        loginRequest: false,
        loginSuccess: false,
        loginError: true,
      });
    });
  });
});
