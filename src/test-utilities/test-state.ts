import {
  initialDialogState,
  initialSnackbarState,
  useDialogState,
  useSnackbarState,
} from "store";

jest.mock("store", () => ({
  ...jest.requireActual("store"),
  useSnackbarState: jest.fn(() => ({
    isSnackbarOpen: false,
    message: null,
    severity: null,
  })),
  useDialogState: jest.fn(() => ({
    isDialogOpen: false,
    type: null,
  })),
}));

const mockedUseSnackbarState = jest.mocked(useSnackbarState);

export function useSnackbarStateMock(
  args?: Partial<ReturnType<typeof useSnackbarState>>
) {
  return mockedUseSnackbarState.mockReturnValue({
    ...initialSnackbarState,
    ...args,
  });
}

const mockedUseDialogState = jest.mocked(useDialogState);

export function useDialogStateMock(
  args?: Partial<ReturnType<typeof useDialogState>>
) {
  return mockedUseDialogState.mockReturnValue({
    ...initialDialogState,
    ...args,
  });
}
