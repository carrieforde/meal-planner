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

export type CatalogItem = {
  __typename?: "CatalogItem";
  category: Scalars["String"];
  defaultUnit?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
};

export type List = {
  __typename?: "List";
  createdAt: Scalars["String"];
  items: Array<ListItem>;
  updatedAt: Scalars["String"];
};

export type ListItem = {
  __typename?: "ListItem";
  item: CatalogItem;
  quantityNeeded: Scalars["Int"];
  unit?: Maybe<Scalars["String"]>;
};

export type Query = {
  __typename?: "Query";
  /** Get catalog items */
  catalog: Array<CatalogItem>;
  /** Get a list of shopping items */
  list: List;
};

export type GetCatalogQueryVariables = Exact<{ [key: string]: never }>;

export type GetCatalogQuery = {
  __typename?: "Query";
  catalog: Array<{
    __typename?: "CatalogItem";
    name: string;
    category: string;
    defaultUnit?: string | null;
  }>;
};

export type GetShoppingListQueryVariables = Exact<{ [key: string]: never }>;

export type GetShoppingListQuery = {
  __typename?: "Query";
  list: {
    __typename?: "List";
    createdAt: string;
    updatedAt: string;
    items: Array<{
      __typename?: "ListItem";
      quantityNeeded: number;
      unit?: string | null;
      item: {
        __typename?: "CatalogItem";
        name: string;
        category: string;
        defaultUnit?: string | null;
      };
    }>;
  };
};

export const GetCatalogDocument = gql`
  query getCatalog {
    catalog {
      name
      category
      defaultUnit
    }
  }
`;

/**
 * __useGetCatalogQuery__
 *
 * To run a query within a React component, call `useGetCatalogQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCatalogQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCatalogQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCatalogQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetCatalogQuery,
    GetCatalogQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCatalogQuery, GetCatalogQueryVariables>(
    GetCatalogDocument,
    options
  );
}
export function useGetCatalogLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCatalogQuery,
    GetCatalogQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetCatalogQuery, GetCatalogQueryVariables>(
    GetCatalogDocument,
    options
  );
}
export type GetCatalogQueryHookResult = ReturnType<typeof useGetCatalogQuery>;
export type GetCatalogLazyQueryHookResult = ReturnType<
  typeof useGetCatalogLazyQuery
>;
export type GetCatalogQueryResult = Apollo.QueryResult<
  GetCatalogQuery,
  GetCatalogQueryVariables
>;
export const GetShoppingListDocument = gql`
  query getShoppingList {
    list {
      items {
        item {
          name
          category
          defaultUnit
        }
        quantityNeeded
        unit
      }
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useGetShoppingListQuery__
 *
 * To run a query within a React component, call `useGetShoppingListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetShoppingListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetShoppingListQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetShoppingListQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetShoppingListQuery,
    GetShoppingListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetShoppingListQuery, GetShoppingListQueryVariables>(
    GetShoppingListDocument,
    options
  );
}
export function useGetShoppingListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetShoppingListQuery,
    GetShoppingListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetShoppingListQuery,
    GetShoppingListQueryVariables
  >(GetShoppingListDocument, options);
}
export type GetShoppingListQueryHookResult = ReturnType<
  typeof useGetShoppingListQuery
>;
export type GetShoppingListLazyQueryHookResult = ReturnType<
  typeof useGetShoppingListLazyQuery
>;
export type GetShoppingListQueryResult = Apollo.QueryResult<
  GetShoppingListQuery,
  GetShoppingListQueryVariables
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
