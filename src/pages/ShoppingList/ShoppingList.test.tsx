import { ApolloError } from "@apollo/client";
import { render, screen } from "@testing-library/react";
import { GraphQLError } from "graphql";
import { useShoppingListMock } from "test-utilities/test-hooks";
import {
  useDialogStateMock,
  useSnackbarStateMock,
} from "test-utilities/test-state";
import { ShoppingList } from "./ShoppingList";

function renderShoppingList() {
  render(<ShoppingList />);
}

describe("ShoppingList", () => {
  beforeEach(() => {
    useShoppingListMock();
    useSnackbarStateMock();
    useDialogStateMock();
  });

  it("should show the loading state", () => {
    useShoppingListMock({ loading: true });
    renderShoppingList();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("should render the shopping list", async () => {
    renderShoppingList();

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(
      screen.getByText("Shopping List", { exact: false })
    ).toBeInTheDocument();
  });

  it("should render an alert when a network error occurs", async () => {
    useShoppingListMock({
      data: undefined,
      error: new ApolloError({
        graphQLErrors: [new GraphQLError("an error occurred")],
      }),
    });
    renderShoppingList();

    expect(screen.getByRole("alert")).toBeInTheDocument();
  });
});
