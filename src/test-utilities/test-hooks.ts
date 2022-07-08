import { shoppingCategoriesMap, UnitMap } from "@constants";
import { useCatalogItems } from "hooks";

jest.mock("hooks", () => ({
  useCatalogItems: jest.fn(() => ({
    data: undefined,
    error: undefined,
    loading: false,
    catalogRowData: [],
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
