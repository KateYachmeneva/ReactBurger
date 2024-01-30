import modalReducer, {
  initialState,
  openModal,
  closeModal,
} from "./modalSlice";

describe("modal reducer", () => {
  it("should handle openModal", () => {
    const state = modalReducer(initialState, openModal());
    expect(state).toEqual({ isOpen: true });
  });

  it("should handle closeModal", () => {
    const openState = { isOpen: true };
    const state = modalReducer(openState, closeModal());
    expect(state).toEqual({ isOpen: false });
  });

  it("should not modify state for unknown action", () => {
    const currentState = { isOpen: true };
    const state = modalReducer(currentState, { type: "UNKNOWN_ACTION" });
    expect(state).toEqual(currentState);
  });
});
