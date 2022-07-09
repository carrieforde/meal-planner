import {
  useAddItemToCartMutation,
  useGetShoppingListQuery,
} from "generated/graphql";
import { useCallback, useMemo } from "react";

export const useShoppingList = () => {
  const { data, error, loading } = useGetShoppingListQuery();

  const listCategories = useMemo(
    () =>
      data?.list.items
        .reduce(
          (acc: string[], item) =>
            acc.includes(item.category) ? acc : [...acc, item.category],
          []
        )
        .sort((a, b) => a.localeCompare(b)),
    [data?.list.items]
  );

  const [addItemToCartMutation, { loading: addItemToCartLoading }] =
    useAddItemToCartMutation();

  const addItemToCart = useCallback(
    (itemId) => addItemToCartMutation({ variables: { itemId } }),
    [addItemToCartMutation]
  );

  return {
    data,
    error,
    loading,
    listCategories,
    addItemToCart,
    addItemToCartLoading,
  };
};
