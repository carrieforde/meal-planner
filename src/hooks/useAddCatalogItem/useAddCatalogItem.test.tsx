import { renderHook } from "@testing-library/react-hooks";
import { AddCatalogItemDocument } from "generated/graphql";
import { act } from "react-dom/test-utils";
import {
  resetDialog,
  setSnackbarMessage,
  setSnackbarOpen,
  setSnackbarSeverity,
} from "store";
import { mockedAddItemToCatalog } from "test-utilities/mockData";
import {
  createWrapper,
  TestApolloErrorType,
  testErrorMessage,
} from "test-utilities/test-wrappers";
import { useAddCatalogItem } from "./useAddCatalogItem";

jest.mock("store", () => ({
  setSnackbarMessage: jest.fn(),
  setSnackbarSeverity: jest.fn(),
  setSnackbarOpen: jest.fn(),
  resetDialog: jest.fn(),
}));

const { id, ...input } = mockedAddItemToCatalog.data.addCatalogItem.catalogItem;

function renderUseAddCatalogItem(errorType?: TestApolloErrorType) {
  const wrapper = createWrapper(
    [
      {
        result: mockedAddItemToCatalog,
        variables: { input },
        query: AddCatalogItemDocument,
      },
    ],
    errorType
  );
  return renderHook(() => useAddCatalogItem(), { wrapper });
}

describe("useAddCatalogItem", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should successfully call the addCatalogItemMutation", async () => {
    const { result, waitForNextUpdate } = renderUseAddCatalogItem();

    act(() => {
      result.current.addCatalogItem(input);
    });

    expect(result.current.loading).toBeTruthy();

    await waitForNextUpdate();

    expect(result.current.loading).toBeFalsy();

    expect(setSnackbarOpen).toHaveBeenCalled();
    expect(setSnackbarMessage).toHaveBeenCalledWith(
      mockedAddItemToCatalog.data.addCatalogItem.message
    );
    expect(setSnackbarSeverity).toHaveBeenCalledWith("success");
    expect(resetDialog).toHaveBeenCalled();
  });

  it("should handle errors from the addCatalogItem mutation", async () => {
    const { result, waitForNextUpdate } = renderUseAddCatalogItem("network");
    act(() => {
      result.current.addCatalogItem(input);
    });

    expect(result.current.loading).toBeTruthy();

    await waitForNextUpdate();

    expect(result.current.loading).toBeFalsy();

    expect(setSnackbarOpen).toHaveBeenCalled();
    expect(setSnackbarMessage).toHaveBeenCalledWith(testErrorMessage);
    expect(setSnackbarSeverity).toHaveBeenCalledWith("error");
    expect(resetDialog).toHaveBeenCalled();
  });
});
