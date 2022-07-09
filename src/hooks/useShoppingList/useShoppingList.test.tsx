import { MockedProvider } from "@apollo/client/testing";
import { act, renderHook } from "@testing-library/react-hooks";
import {
  AddItemToListDocument,
  GetShoppingListDocument,
} from "generated/graphql";
import { GraphQLError } from "graphql";
import { ReactNode } from "react";
import {
  mockAddItemToList,
  mockGetShoppingList,
} from "test-utilities/mockData";
import { useShoppingList } from "./useShoppingList";

const shoppingListMock = {
  request: {
    query: GetShoppingListDocument,
  },
  result: mockGetShoppingList,
};

const addItemToListMock = {
  request: {
    query: AddItemToListDocument,
    variables: {
      itemId: "3xlep01NAlqXN7hFvAAo",
    },
  },
  result: mockAddItemToList,
};

const createWrapper = (errorType?: "network" | "graphql") =>
  function Wrapper({ children }: { children: ReactNode }) {
    const error =
      errorType === "network" ? new Error("An error occurred") : undefined;
    const errors =
      errorType === "graphql" ? [new GraphQLError("Error!")] : undefined;

    return (
      <MockedProvider
        mocks={[
          {
            ...shoppingListMock,
            error,
            result: { ...shoppingListMock.result, errors },
          },
          {
            ...addItemToListMock,
            error,
            result: { ...addItemToListMock.result, errors },
          },
        ]}
      >
        {children}
      </MockedProvider>
    );
  };

function renderUseShoppingList(errorType?: "network" | "graphql") {
  const wrapper = createWrapper(errorType);
  return renderHook(() => useShoppingList(), { wrapper });
}

describe("useShoppingList", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a list of categories", () => {
    const { result } = renderUseShoppingList();

    shoppingListMock.result.data.list.items.forEach((item) =>
      expect(result.current.listCategories?.includes(item.category))
    );
  });

  it("should call the addItemToCart mutation", async () => {
    const { result } = renderUseShoppingList();

    act(() => {
      result.current.addItemToCart(
        mockAddItemToList.data.addItemToList.item.itemId
      );
    });

    expect(result.current.addItemToCartLoading).toBeTruthy();
  });
});
