import orderDetailsReducer, {
  initialState,
  sendData,
} from "./orderDetailsSlice";
import { mockOrder } from "../../components/mocks/mocks";

const mockResp = {
  success: true,
};
global.fetch = jest.fn();
describe("sendData", () => {
  it("should sendData with resolved response", async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResp),
    });
    const dispatch = jest.fn();
    const thunk = sendData();
    await thunk(dispatch);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    const [start, end] = calls;

    expect(start[0].type).toBe("order/sendData/pending");
    expect(end[0].type).toBe("order/sendData/fulfilled");
    expect(end[0].payload).toBe(mockResp);
  });

  it("should fetch with rejected response", async () => {
    fetch.mockResolvedValue({
      ok: false,
    });
    const dispatch = jest.fn();
    const thunk = sendData();
    await thunk(dispatch);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    const [start, end] = calls;

    expect(start[0].type).toBe("order/sendData/pending");
    expect(end[0].type).toBe("order/sendData/rejected");
  });
});
describe("orderDetailsSlice", () => {
  it("shoud change status with sendData.pending", () => {
    const state = orderDetailsReducer(initialState, sendData.pending());
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });
  it("shoud change status with sendData.fullfield", () => {
    const state = orderDetailsReducer(
      initialState,
      sendData.fulfilled(mockOrder),
    );
    expect(state).toEqual({
      isLoading: false,
      hasError: false,
      orderData: mockOrder,
      error: null,
    });
  });
  it("shoud change status with sendData.rejected", () => {
    const state = orderDetailsReducer(initialState, sendData.rejected());
    expect(state).toEqual({
      isLoading: false,
      hasError: true,
      orderData: {
        name: "",
        order: {
          number: null,
        },
        success: false,
      },
    });
  });
});
