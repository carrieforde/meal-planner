import { shoppingCategoriesMap } from "@constants";
import { renderHook } from "@testing-library/react-hooks";
import { GetCatalogDocument } from "generated/graphql";
import { mockedCatalog } from "test-utilities/mockData";
import {
  createWrapper,
  TestApolloErrorType,
} from "test-utilities/test-wrappers";
import { useCatalogItems } from "./useCatalogItems";

const categoryList = Object.values(shoppingCategoriesMap);

function renderUseCatalogItems(errorType?: TestApolloErrorType) {
  const wrapper = createWrapper(
    [{ result: mockedCatalog, query: GetCatalogDocument }],
    errorType
  );
  return renderHook(() => useCatalogItems(), { wrapper });
}

describe("useCatalogItems", () => {
  it("should return query data", async () => {
    const { result, waitForNextUpdate } = renderUseCatalogItems();

    expect(result.current.loading).toBeTruthy();
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeUndefined();

    await waitForNextUpdate();

    expect(result.current.loading).toBeFalsy();
    expect(result.current.data).toMatchObject(mockedCatalog.data);
    expect(result.current.error).toBeUndefined();
  });

  it("should generate row data", async () => {
    const { result, waitForNextUpdate } = renderUseCatalogItems();

    await waitForNextUpdate();

    result.current.catalogRowData?.forEach((item) => {
      expect(categoryList).toContain(item.category);
    });
  });
});
