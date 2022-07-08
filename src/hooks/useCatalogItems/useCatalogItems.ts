import {
  ShoppingCategories,
  shoppingCategoriesMap,
  UnitMap,
  Units,
} from "@constants";
import { CatalogItem, useGetCatalogQuery } from "generated/graphql";
import { useMemo } from "react";

function mapCatalogItem({ id, name, defaultUnit, category }: CatalogItem) {
  return {
    id,
    name,
    defaultUnit: defaultUnit ? UnitMap[defaultUnit as Units] : null,
    category: shoppingCategoriesMap[category as ShoppingCategories],
  };
}

export const useCatalogItems = () => {
  const { data, error, loading } = useGetCatalogQuery();

  const catalogRowData = useMemo(
    () => data?.catalog.map((item) => mapCatalogItem(item)),
    [data?.catalog]
  );

  return {
    data,
    error,
    loading,
    catalogRowData,
  };
};
