import { MockedProvider } from "@apollo/client/testing";
import { render, screen } from "@testing-library/react";
import { List } from "./List";

export const list = {
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  items: [
    {
      id: "carrot",
      category: "PRODUCE",
      defaultUnit: null,
      name: "carrot",
      catalogId: "carrot",
      quantityNeeded: 10,
      unit: null,
    },
    {
      id: "lemon",
      category: "PRODUCE",
      defaultUnit: null,
      name: "lemon",
      catalogId: "lemon",
      quantityNeeded: 5,
      unit: null,
    },
    {
      id: "lemon",
      category: "BAKING_SUPPLIES",
      defaultUnit: null,
      name: "flour",
      catalogId: "lemon",
      quantityNeeded: 2,
      unit: "POUNDS",
    },
    {
      id: "blueberry cream cheese",
      category: "DAIRY",
      defaultUnit: null,
      name: "blueberry cream cheese",
      catalogId: "blueberry cream cheese",
      quantityNeeded: 2,
      unit: null,
    },
  ],
};

const wrapper: React.FC = ({ children }) => (
  <MockedProvider>{children}</MockedProvider>
);

function renderList() {
  render(<List data={{ list }} />, { wrapper });
}

describe("List", () => {
  it("should render four categories", () => {
    renderList();

    list.items
      .reduce(
        (acc: string[], item) =>
          acc.includes(item.category) ? acc : [...acc, item.category],
        []
      )
      .forEach((category) =>
        expect(screen.getByTestId(category)).toBeInTheDocument()
      );
  });

  it("should render all items", () => {
    renderList();

    list.items.forEach(({ name }) =>
      expect(screen.getByTestId(name)).toBeInTheDocument()
    );
  });
});
