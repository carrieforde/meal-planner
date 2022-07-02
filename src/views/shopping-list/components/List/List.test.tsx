import { render, screen } from "@testing-library/react";
import { List } from "./List";

const list = {
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  items: [
    {
      item: {
        name: "carrot",
        category: "PRODUCE",
      },
      quantityNeeded: 2,
      unit: null,
    },
    {
      item: {
        name: "milk",
        category: "DAIRY",
      },
      quantityNeeded: 1,
      unit: "GALLON",
    },
    {
      item: {
        name: "carrot cake",
        category: "BAKED_GOODS",
      },
      quantityNeeded: 5,
      unit: null,
    },
    {
      item: {
        name: "blueberry bagels",
        category: "BAKED_GOODS",
      },
      quantityNeeded: 1,
      unit: "PACKAGE",
    },
    {
      item: {
        name: "banana",
        category: "PRODUCE",
      },
      quantityNeeded: 23,
      unit: null,
    },
    {
      item: {
        name: "chicken breast",
        category: "MEAT",
      },
      quantityNeeded: 5,
      unit: "POUND",
    },
  ],
};

function renderList() {
  render(<List data={{ list }} />);
}

describe("List", () => {
  it("should render four categories", () => {
    renderList();

    list.items
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

    list.items.forEach(({ item: { name } }) =>
      expect(screen.getByTestId(name)).toBeInTheDocument()
    );
  });
});
