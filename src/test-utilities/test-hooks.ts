import { shoppingCategoriesMap, UnitMap } from "@constants";
import { useAddCatalogItem, useCatalogItems, useShoppingList } from "hooks";
import { mockGetShoppingList } from "./mockData";

jest.mock("hooks", () => ({
  useCatalogItems: jest.fn(() => ({
    data: undefined,
    error: undefined,
    loading: false,
    catalogRowData: [],
  })),
  useShoppingList: jest.fn(() => ({
    data: undefined,
    error: undefined,
    loading: false,
    listCategories: [],
    addItemToCart: jest.fn(),
    addItemToCartLoading: false,
  })),
  useAddCatalogItem: jest.fn(() => ({
    addCatalogItem: jest.fn(),
    loading: false,
  })),
}));

export const mockCatalogResponse = {
  catalog: [
    {
      id: "rSlQIDB2CZzvz4Klamug",
      name: "milk",
      category: "DAIRY",
      defaultUnit: "GALLON",
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
      defaultUnit: null,
    },
    {
      id: "7ron8dYBgH6zjBuYOpeT",
      name: "baking powder",
      category: "BAKING_SUPPLIES",
      defaultUnit: null,
    },
    {
      id: "1cBER9Mj8fBKW8BGtews",
      name: "baking soda",
      category: "BAKING_SUPPLIES",
      defaultUnit: null,
    },
  ],
};

export const mockMappedCatalogResponse = [
  {
    id: "rSlQIDB2CZzvz4Klamug",
    name: "milk",
    category: shoppingCategoriesMap.DAIRY,
    defaultUnit: UnitMap.GALLON,
  },
  {
    id: "cVACp992BGJL3Pu5hNK7",
    name: "avocado",
    category: shoppingCategoriesMap.PRODUCE,
    defaultUnit: null,
  },
  {
    id: "f0QbQE2UFnutNHJ29rbF",
    name: "bacon",
    category: shoppingCategoriesMap.MEAT,
    defaultUnit: null,
  },
  {
    id: "7ron8dYBgH6zjBuYOpeT",
    name: "baking powder",
    category: shoppingCategoriesMap.BAKING_SUPPLIES,
    defaultUnit: null,
  },
  {
    id: "1cBER9Mj8fBKW8BGtews",
    name: "baking soda",
    category: shoppingCategoriesMap.BAKING_SUPPLIES,
    defaultUnit: null,
  },
];

const mockedUseCatalogItems = jest.mocked(useCatalogItems);

const defaultUseCatalogItemsReturn: ReturnType<typeof useCatalogItems> = {
  data: mockCatalogResponse,
  error: undefined,
  loading: false,
  catalogRowData: mockMappedCatalogResponse,
};

export function useCatalogItemsMock(
  args?: Partial<ReturnType<typeof useCatalogItems>>
) {
  return mockedUseCatalogItems.mockReturnValue({
    ...defaultUseCatalogItemsReturn,
    ...args,
  });
}

const mockedUseShoppingList = jest.mocked(useShoppingList);

export const defaultUseShoppingListItemsReturn: ReturnType<
  typeof useShoppingList
> = {
  data: mockGetShoppingList.data,
  error: undefined,
  loading: false,
  listCategories: mockGetShoppingList.data.list.items
    .reduce(
      (acc: string[], item) =>
        acc.includes(item.category) ? acc : [...acc, item.category],
      []
    )
    .sort((a, b) => a.localeCompare(b)),
  addItemToCart: jest.fn(),
  addItemToCartLoading: false,
};

export function useShoppingListMock(
  args?: Partial<ReturnType<typeof useShoppingList>>
) {
  return mockedUseShoppingList.mockReturnValue({
    ...defaultUseShoppingListItemsReturn,
    ...args,
  });
}

const mockedUseAddCatalogItem = jest.mocked(useAddCatalogItem);

export const defaultUseAddCatalogItemReturn: ReturnType<
  typeof useAddCatalogItem
> = {
  addCatalogItem: jest.fn(),
  loading: false,
};

export function useAddCatalogItemMock(
  args?: Partial<ReturnType<typeof useAddCatalogItem>>
) {
  return mockedUseAddCatalogItem.mockReturnValue({
    ...defaultUseAddCatalogItemReturn,
    ...args,
  });
}
