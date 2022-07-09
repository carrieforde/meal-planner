import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { renderHook } from "@testing-library/react-hooks";
import { AddCatalogItemDocument } from "generated/graphql";
import { GraphQLError } from "graphql";
import { ReactNode } from "react";
import { act } from "react-dom/test-utils";
import {
  resetDialog,
  setSnackbarMessage,
  setSnackbarOpen,
  setSnackbarSeverity,
} from "store";
import { mockedAddItemToCatalog } from "test-utilities/mockData";
import { useAddCatalogItem } from "./useAddCatalogItem";

jest.mock("store", () => ({
  setSnackbarMessage: jest.fn(),
  setSnackbarSeverity: jest.fn(),
  setSnackbarOpen: jest.fn(),
  resetDialog: jest.fn(),
}));

const { id, ...input } = mockedAddItemToCatalog.data.addCatalogItem.catalogItem;

const addItemToCatalogMock: MockedResponse = {
  request: {
    query: AddCatalogItemDocument,
    variables: { input },
  },
  result: mockedAddItemToCatalog,
};

function createWrapper(errorType?: "graphql" | "network") {
  return function Wrapper({ children }: { children: ReactNode }) {
    const error =
      errorType === "network" ? new Error("An error occurred") : undefined;
    const errors =
      errorType === "graphql"
        ? [new GraphQLError("An error occurred")]
        : undefined;

    const mock = {
      ...addItemToCatalogMock,
      error,
      result: {
        ...addItemToCatalogMock.result,
        errors,
      },
    };

    return <MockedProvider mocks={[mock]}>{children}</MockedProvider>;
  };
}

// const wrapper: React.FC = ({ children }) => (
//   <MockedProvider mocks={[addItemToCatalogMock]}>{children}</MockedProvider>
// );

function renderUseAddCatalogItem(errorType?: "network" | "graphql") {
  const wrapper = createWrapper(errorType);
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
    expect(setSnackbarMessage).toHaveBeenCalledWith("An error occurred");
    expect(setSnackbarSeverity).toHaveBeenCalledWith("error");
    expect(resetDialog).toHaveBeenCalled();
  });
});
