import { MockedProvider } from "@apollo/client/testing";
import { DialogType } from "@constants";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setDialogOpen, setDialogType } from "store";
import {
  mockMappedCatalogResponse,
  useCatalogItemsMock,
} from "test-utilities/test-hooks";
import {
  useDialogStateMock,
  useSnackbarStateMock,
} from "test-utilities/test-state";
import { Catalog } from "./Catalog";

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
  setDialogOpen: jest.fn(),
  setDialogType: jest.fn(),
}));

const wrapper: React.FC = ({ children }) => (
  <MockedProvider>{children}</MockedProvider>
);

function renderCatalog() {
  render(<Catalog />, { wrapper });
}

describe("Catalog", () => {
  beforeEach(() => {
    useCatalogItemsMock();
    useDialogStateMock();
    useSnackbarStateMock();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should display the correct number of rows", () => {
    renderCatalog();

    mockMappedCatalogResponse.forEach((item) => {
      expect(screen.getByText(item.name, { exact: false })).toBeInTheDocument();
    });
  });

  it("should dispatch actions to open the dialog when the FAB is clicked", () => {
    renderCatalog();

    userEvent.click(screen.getByTestId("addCatalogItem"));

    expect(setDialogType).toHaveBeenCalledWith(DialogType.ADD_CATALOG_ITEM);
    expect(setDialogOpen).toHaveBeenCalled();
  });
});
