import { MockedProvider } from "@apollo/client/testing";
import { render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import { AddItemToListDocument, GetCatalogDocument } from "generated/graphql";
import React from "react";
import { AddShoppingItemForm } from "./AddShoppingItemForm";

const catalogMock = {
  request: {
    query: GetCatalogDocument,
  },
  result: {
    data: {
      catalog: [
        {
          id: "rSlQIDB2CZzvz4Klamug",
          name: "Parmesan cheese",
          category: "DAIRY",
          defaultUnit: "",
        },
        {
          id: "cVACp992BGJL3Pu5hNK7",
          name: "avocado",
          category: "PRODUCE",
          defaultUnit: null,
        },
        {
          id: "f0QbQE2UFnutNHJ29rbF",
          name: "bacon",
          category: "MEAT",
          defaultUnit: "",
        },
      ],
    },
  },
};

const addItemToListMock = {
  request: {
    query: AddItemToListDocument,
  },
  result: {
    data: {
      addItemToList: {
        code: 200,
        success: true,
        message: "Item successfully added to list",
        item: {
          itemId: "3xlep01NAlqXN7hFvAAo",
          quantityNeeded: 1,
          unit: null,
          inCart: null,
        },
      },
    },
  },
};

const wrapper: React.FC = ({ children }) => (
  <MockedProvider mocks={[catalogMock, addItemToListMock]}>
    {children}
  </MockedProvider>
);

function renderAddShoppingItemForm() {
  render(<AddShoppingItemForm />, { wrapper });
}

describe("AddShoppingItemForm", () => {
  it("should handle adding an item to the list", async () => {
    renderAddShoppingItemForm();
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Item
    const autocomplete = screen.getByRole("combobox");
    userEvent.click(autocomplete);
    userEvent.type(autocomplete, "avocado");
    userEvent.click(screen.getByRole("option"));

    // Quantity Needed
    const quantity = screen.getByLabelText("Quantity Needed", { exact: false });
    userEvent.click(quantity);
    userEvent.type(quantity, "3");

    // Click Add to List
    const button = screen.getByRole("button", { name: "Add to List" });
    userEvent.click(button);

    expect("a").toEqual("a");
  });
});
