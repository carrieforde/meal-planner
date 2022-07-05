import { useSnackbarState } from "store";

jest.mock("store", () => ({
  ...jest.requireActual("store"),
  useSnackbarState: jest.fn(() => ({
    isOpen: false,
    message: null,
    severity: null,
  })),
}));

const mockedUseSnackbarState = jest.mocked(useSnackbarState);

export function useSnackbarStateMock(
  args?: ReturnType<typeof useSnackbarState>
) {
  return mockedUseSnackbarState.mockReturnValue({
    isOpen: false,
    message: null,
    severity: null,
    ...args,
  });
}
