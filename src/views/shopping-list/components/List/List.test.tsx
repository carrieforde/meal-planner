import { render, screen } from "@testing-library/react";
import { List } from "./List";

export const list = {
  items: [
    {
      item: {
        category: "PRODUCE",
        defaultUnit: null,
        name: "carrot",
      },
      quantityNeeded: 10,
      unit: null,
    },
    {
      item: {
        category: "PRODUCE",
        defaultUnit: null,
        name: "lemon",
      },
      quantityNeeded: 5,
      unit: null,
    },
    {
      item: {
        category: "BAKING_SUPPLIES",
        defaultUnit: null,
        name: "flour",
      },
      quantityNeeded: 2,
      unit: "POUNDS",
    },
    {
      item: {
        category: "DAIRY",
        defaultUnit: null,
        name: "blueberry cream cheese",
      },
      quantityNeeded: 2,
      unit: null,
    },
  ],
  createdAt: "2022-07-02T03:53:56.122Z",
  updatedAt: "2022-07-02T03:42:46.214Z",
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
