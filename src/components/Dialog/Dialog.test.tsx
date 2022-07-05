import { MockedProvider } from "@apollo/client/testing";
import { DialogType } from "@constants";
import { render, screen } from "@testing-library/react";
import { useDialogStateMock } from "test-utilities/test-state";
import { Dialog } from "./Dialog";

jest.mock("views", () => ({
  ...jest.requireActual("views"),
  AddCatalogItemForm: () => <div data-testid="addCatalogItem" />,
  AddShoppingItemForm: () => <div data-testid="addShoppingItem" />,
}));

const wrapper: React.FC = ({ children }) => (
  <MockedProvider>{children}</MockedProvider>
);

function renderDialog() {
  render(<Dialog />, { wrapper });
}

describe("Dialog", () => {
  beforeEach(() => {
    useDialogStateMock({
      isDialogOpen: true,
    });
  });

  it("should return null if the type is null", () => {
    renderDialog();
    expect(screen.queryByTestId("dialog")).not.toBeInTheDocument();
  });

  it("should display the add catalog item form", () => {
    useDialogStateMock({
      isDialogOpen: true,
      type: DialogType.ADD_CATALOG_ITEM,
    });
    renderDialog();
    expect(screen.getByTestId("addCatalogItem")).toBeInTheDocument();
  });

  it("should display the add list item form", () => {
    useDialogStateMock({
      isDialogOpen: true,
      type: DialogType.ADD_LIST_ITEM,
    });
    renderDialog();
    expect(screen.getByTestId("addShoppingItem")).toBeInTheDocument();
  });
});
