import { store } from "store";
import { renderHook } from "@testing-library/react-hooks";
import {
  initialSnackbarState,
  resetSnackbar,
  setSnackbarMessage,
  setSnackbarOpen,
  setSnackbarSeverity,
  useSnackbarState,
} from "./snackbar";

jest.mock("store");

const storeMock = jest.mocked(store);

describe("snackbar", () => {
  describe("useSnackbarState", () => {
    it("should return the default state", () => {
      storeMock.getState.mockReturnValue({ snackbar: initialSnackbarState });

      const { result } = renderHook(() => useSnackbarState());

      expect(result.current).toMatchObject(initialSnackbarState);
    });

    it("should return the current state", () => {
      const mockState = {
        ...initialSnackbarState,
        // extra state here
      };
      storeMock.getState.mockReturnValue({ snackbar: mockState });

      const { result } = renderHook(() => useSnackbarState());

      expect(result.current).toMatchObject(mockState);
    });
  });

  /* Add test cases for each action */
  describe("action name here", () => {
    it("should dispatch the snackbar message", () => {
      setSnackbarMessage("banana successfully added to list");
      expect(storeMock.dispatch).toHaveBeenCalledWith({
        type: "setMessage",
        payload: "banana successfully added to list",
      });
    });

    it("should dispatch the snackbar severity", () => {
      setSnackbarSeverity("success");
      expect(storeMock.dispatch).toHaveBeenCalledWith({
        type: "setSeverity",
        payload: "success",
      });
    });

    it("should dispatch the snackbar open", () => {
      setSnackbarOpen();
      expect(storeMock.dispatch).toHaveBeenCalledWith({ type: "setOpen" });
    });

    it("shoudl dispatch the reset snackbar action", () => {
      resetSnackbar();
      expect(store.dispatch).toHaveBeenCalledWith({ type: "reset" });
    });
  });
});
