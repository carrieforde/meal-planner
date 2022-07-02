import { MockedProvider } from "@apollo/client/testing";
import { render, screen } from "@testing-library/react";
import { GraphQLError } from "graphql";
import { ReactNode } from "react";
import { list } from "../components/List/List.test";
import { SHOPPING_LIST } from "./query.graphql";
import { ShoppingList } from "./ShoppingList";

const shoppingListMock = {
  request: {
    query: SHOPPING_LIST,
  },
  result: {
    data: list,
  },
};

const createWrapper = (errorType?: "network" | "graphql") =>
  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <MockedProvider
        mocks={[
          {
            ...shoppingListMock,
            error:
              errorType === "network"
                ? new Error("An error occurred")
                : undefined,
            result: {
              ...shoppingListMock.result,
              errors:
                errorType === "graphql"
                  ? [new GraphQLError("Error!")]
                  : undefined,
            },
          },
        ]}
      >
        {children}
      </MockedProvider>
    );
  };

function renderShoppingList(errorType?: "network" | "graphql") {
  const wrapper = createWrapper(errorType);
  render(<ShoppingList />, { wrapper });
}

describe("ShoppingList", () => {
  it("should show the loading state", () => {
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
    renderShoppingList("network");

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("should render an alert when a graphql error occurs", async () => {
    renderShoppingList("graphql");

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(screen.getByRole("alert")).toBeInTheDocument();
  });
});
