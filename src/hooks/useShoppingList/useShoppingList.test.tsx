import { act, renderHook } from "@testing-library/react-hooks";
import {
  AddItemToCartDocument,
  GetShoppingListDocument,
} from "generated/graphql";
import {
  mockAddItemToCart,
  mockGetShoppingList,
} from "test-utilities/mockData";
import {
  createWrapper,
  TestApolloErrorType,
} from "test-utilities/test-wrappers";
import { useShoppingList } from "./useShoppingList";

const itemId = mockAddItemToCart.data.addItemToCart.item.id;

function renderUseShoppingList(errorType?: TestApolloErrorType) {
  const wrapper = createWrapper(
    [
      { result: mockGetShoppingList, query: GetShoppingListDocument },
      {
        result: mockAddItemToCart,
        query: AddItemToCartDocument,
        variables: { itemId },
      },
    ],
    errorType
  );
  return renderHook(() => useShoppingList(), { wrapper });
}

describe("useShoppingList", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a list of categories", () => {
    const { result } = renderUseShoppingList();

    mockGetShoppingList.data.list.items.forEach((item) =>
      expect(result.current.listCategories?.includes(item.category))
    );
  });

  it("should call the addItemToCart mutation", async () => {
    const { result, waitForNextUpdate } = renderUseShoppingList();

    act(() => {
      result.current.addItemToCart(itemId);
    });

    expect(result.current.addItemToCartLoading).toBeTruthy();

    await waitForNextUpdate();

    expect(result.current.addItemToCartLoading).toBeFalsy();
  });
});
