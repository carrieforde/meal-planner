import { shoppingCategoriesMap } from "@constants";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  defaultUseAddCatalogItemReturn,
  useAddCatalogItemMock,
} from "test-utilities/test-hooks";
import { AddCatalogItemForm } from "./AddCatalogItemForm";

function renderAddCatalogItemForm() {
  render(<AddCatalogItemForm />);
}

describe("AddCatalogItemForm", () => {
  beforeEach(() => {
    useAddCatalogItemMock();
  });

  it("should call addCatalogItem with the form values", () => {
    renderAddCatalogItemForm();
    userEvent.type(screen.getByRole("textbox"), "banana");

    // userEvent.click(screen.getByRole("button", { name: "Default Unit ​" }));
    // userEvent.click(screen.getByRole("listbox"));
    // userEvent.click(screen.getByRole("option", { name: UnitMap.POUND }));

    userEvent.click(screen.getByRole("button", { name: /Category/ }));
    userEvent.click(screen.getByRole("listbox"));
    userEvent.click(
      screen.getByRole("option", { name: shoppingCategoriesMap.PRODUCE })
    );

    userEvent.click(screen.getByRole("button", { name: "Save" }));

    expect(defaultUseAddCatalogItemReturn.addCatalogItem).toHaveBeenCalledWith({
      name: "banana",
      category: "PRODUCE",
      defaultUnit: null,
    });
  });
});
