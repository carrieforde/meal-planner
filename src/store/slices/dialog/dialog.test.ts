import { store } from "store";
import { renderHook } from "@testing-library/react-hooks";
import {
  initialDialogState,
  resetDialog,
  setDialogOpen,
  setDialogType,
  useDialogState,
} from "./dialog";
import { DialogType } from "@constants";

jest.mock("store");

const storeMock = jest.mocked(store);

describe("dialog", () => {
  describe("useDialogState", () => {
    it("should return the default state", () => {
      storeMock.getState.mockReturnValue({ dialog: initialDialogState });

      const { result } = renderHook(() => useDialogState());

      expect(result.current).toMatchObject(initialDialogState);
    });

    it("should return the current state", () => {
      const mockState = {
        ...initialDialogState,
        // extra state here
      };
      storeMock.getState.mockReturnValue({ dialog: mockState });

      const { result } = renderHook(() => useDialogState());

      expect(result.current).toMatchObject(mockState);
    });
  });

  /* Add test cases for each action */
  describe("action name here", () => {
    it("should dispatch a setDialogOpen action", () => {
      setDialogOpen();
      expect(store.dispatch).toHaveBeenCalledWith({ type: "setDialogOpen" });
    });

    it("should dispatch a setDialogType action", () => {
      setDialogType(DialogType.ADD_CATALOG_ITEM);
      expect(store.dispatch).toHaveBeenCalledWith({
        type: "setDialogType",
        payload: DialogType.ADD_CATALOG_ITEM,
      });
    });

    it("should dispatch a resetDialog action", () => {
      resetDialog();
      expect(store.dispatch).toHaveBeenCalledWith({ type: "resetDialog" });
    });
  });
});
