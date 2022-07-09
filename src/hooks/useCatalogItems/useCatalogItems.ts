import { ShoppingCategories, shoppingCategoriesMap } from "@constants";
import { CatalogItem, useGetCatalogQuery } from "generated/graphql";
import { useMemo } from "react";

function mapCatalogItem({ category, ...item }: CatalogItem) {
  return {
    ...item,
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
