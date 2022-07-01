import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type InventoryItem = {
  __typename?: "InventoryItem";
  category: Scalars["String"];
  defaultUnit?: Maybe<Scalars["String"]>;
  itemName: Scalars["String"];
};

export type ListItem = {
  __typename?: "ListItem";
  inCart?: Maybe<Scalars["Boolean"]>;
  item: InventoryItem;
  quantityNeeded: Scalars["Int"];
  unit?: Maybe<Scalars["String"]>;
};

export type Query = {
  __typename?: "Query";
  /** Get items on the shopping list */
  shoppingList: Array<ListItem>;
};

export type ShoppingListQueryVariables = Exact<{ [key: string]: never }>;

export type ShoppingListQuery = {
  __typename?: "Query";
  shoppingList: Array<{
    __typename?: "ListItem";
    quantityNeeded: number;
    unit?: string | null;
    inCart?: boolean | null;
    item: { __typename?: "InventoryItem"; itemName: string; category: string };
  }>;
};

export const ShoppingListDocument = gql`
  query ShoppingList {
    shoppingList {
      item {
        itemName
        category
      }
      quantityNeeded
      unit
      inCart
    }
  }
`;

/**
 * __useShoppingListQuery__
 *
 * To run a query within a React component, call `useShoppingListQuery` and pass it any options that fit your needs.
 * When your component renders, `useShoppingListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useShoppingListQuery({
 *   variables: {
 *   },
 * });
 */
export function useShoppingListQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ShoppingListQuery,
    ShoppingListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ShoppingListQuery, ShoppingListQueryVariables>(
    ShoppingListDocument,
    options
  );
}
export function useShoppingListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ShoppingListQuery,
    ShoppingListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ShoppingListQuery, ShoppingListQueryVariables>(
    ShoppingListDocument,
    options
  );
}
export type ShoppingListQueryHookResult = ReturnType<
  typeof useShoppingListQuery
>;
export type ShoppingListLazyQueryHookResult = ReturnType<
  typeof useShoppingListLazyQuery
>;
export type ShoppingListQueryResult = Apollo.QueryResult<
  ShoppingListQuery,
  ShoppingListQueryVariables
>;

export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[];
  };
}
const result: PossibleTypesResultData = {
  possibleTypes: {},
};
export default result;
