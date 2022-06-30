import { render, screen } from "@testing-library/react";
import { List } from "./List";

const shoppingList = [
  {
    item: {
      itemName: "carrot",
      category: "PRODUCE",
    },
    quantityNeeded: 2,
    unit: null,
    inCart: null,
  },
  {
    item: {
      itemName: "milk",
      category: "DAIRY",
    },
    quantityNeeded: 1,
    unit: "GALLON",
    inCart: null,
  },
  {
    item: {
      itemName: "carrot cake",
      category: "BAKED_GOODS",
    },
    quantityNeeded: 5,
    unit: null,
    inCart: null,
  },
  {
    item: {
      itemName: "blueberry bagels",
      category: "BAKED_GOODS",
    },
    quantityNeeded: 1,
    unit: "PACKAGE",
    inCart: null,
  },
  {
    item: {
      itemName: "banana",
      category: "PRODUCE",
    },
    quantityNeeded: 23,
    unit: null,
    inCart: null,
  },
  {
    item: {
      itemName: "chicken breast",
      category: "MEAT",
    },
    quantityNeeded: 5,
    unit: "POUND",
    inCart: null,
  },
];

function renderList() {
  render(<List data={{ shoppingList }} />);
}

describe("List", () => {
  it("should render four categories", () => {
    renderList();

    shoppingList
      .reduce(
        (acc: string[], { item }) =>
          acc.includes(item.category) ? acc : [...acc, item.category],
        []
      )
      .forEach((category) =>
        expect(screen.getByTestId(category)).toBeInTheDocument()
      );
  });

  it("should render all items", () => {
    renderList();

    shoppingList.forEach(({ item: { itemName } }) =>
      expect(screen.getByTestId(itemName)).toBeInTheDocument()
    );
  });
});
