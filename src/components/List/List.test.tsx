import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  defaultUseShoppingListItemsReturn,
  useShoppingListMock,
} from "test-utilities/test-hooks";
import { List } from "./List";

function renderList() {
  render(<List />);
}

const { data, listCategories, addItemToCart } =
  defaultUseShoppingListItemsReturn;

describe("List", () => {
  beforeEach(() => {
    useShoppingListMock();
  });

  it("should render the categories", () => {
    renderList();

    (listCategories as string[]).forEach((category) =>
      expect(screen.getByTestId(category)).toBeInTheDocument()
    );
  });

  it("should render all items", () => {
    renderList();

    data?.list.items.forEach(({ name }) =>
      expect(screen.getByTestId(name)).toBeInTheDocument()
    );
  });

  it("should add item to the cart when clicked", () => {
    renderList();

    const item = data?.list.items.at(1);
    const button = screen.getByRole("button", {
      name: new RegExp(item?.name as string),
    });

    userEvent.click(button);

    expect(addItemToCart).toHaveBeenCalledWith(item?.id);
  });
});
