---
to: src/store/slices/<%= name %>/<%= name %>.spec.ts
---
import store from "store";
import { renderHook } from "@testing-library/react-hooks";
import { initial<%= Name %>State, use<%= Name %>State } from "./<%= name %>";

jest.mock("store");

const storeMock = jest.mocked(store);

describe("<%= name %>", () => {
  describe("use<%= Name %>State", () => {
    it("should return the default state", () => {
      storeMock.getState.mockReturnValue({ <%= name %>: initial<%= Name %>State });

      const { result } = renderHook(() => use<%= Name %>State());

      expect(result.current).toMatchObject(initial<%= Name %>State);
    });

    it("should return the current state", () => {
      const mockState = {
        ...initial<%= Name %>State,
        // extra state here
      };
      storeMock.getState.mockReturnValue({ <%= name %>: mockState });

      const { result } = renderHook(() => use<%= Name %>State());

      expect(result.current).toMatchObject(mockState);
    });
  });

  /* Add test cases for each action */
  describe("action name here", () => {
    it("should dispatch an action", () => {
      // setYourAction();
      // expect(storeMock.dispatch).toHaveBeenCalledWith({
      //   type: "setYourAction",
      //   payload: "setYourActionPayload"
      // });
    });
  });
});
