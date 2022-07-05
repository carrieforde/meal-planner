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

export type AddCatalogItemResponse = {
  __typename?: "AddCatalogItemResponse";
  catalogItem?: Maybe<CatalogItem>;
  code: Scalars["Int"];
  message: Scalars["String"];
  success: Scalars["Boolean"];
};

export type AddItemToCartResponse = {
  __typename?: "AddItemToCartResponse";
  code: Scalars["Int"];
  item?: Maybe<ListItem>;
  message: Scalars["String"];
  success: Scalars["Boolean"];
};

export type AddItemToListResponse = {
  __typename?: "AddItemToListResponse";
  code: Scalars["Int"];
  item?: Maybe<RawListItem>;
  message: Scalars["String"];
  success: Scalars["Boolean"];
};

export type AddListItem = {
  itemId: Scalars["ID"];
  quantityNeeded: Scalars["Int"];
  unit?: InputMaybe<Scalars["String"]>;
};

export type CatalogInputItem = {
  category: Scalars["String"];
  defaultUnit?: InputMaybe<Scalars["String"]>;
  name: Scalars["String"];
};

export type CatalogItem = {
  __typename?: "CatalogItem";
  category: Scalars["String"];
  defaultUnit?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
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
  catalogId: Scalars["ID"];
  category: Scalars["String"];
  defaultUnit?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  inCart?: Maybe<Scalars["Boolean"]>;
  name: Scalars["String"];
  quantityNeeded: Scalars["Int"];
  unit?: Maybe<Scalars["String"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  addCatalogItem: AddCatalogItemResponse;
  addItemToCart: AddItemToCartResponse;
  addItemToList?: Maybe<AddItemToListResponse>;
};

export type MutationAddCatalogItemArgs = {
  input: CatalogInputItem;
};

export type MutationAddItemToCartArgs = {
  itemId: Scalars["String"];
};

export type MutationAddItemToListArgs = {
  input: AddListItem;
};

export type Query = {
  __typename?: "Query";
  /** Get catalog items */
  catalog: Array<CatalogItem>;
  /** Get a list of shopping items */
  list: List;
};

export type RawListItem = {
  __typename?: "RawListItem";
  inCart?: Maybe<Scalars["Boolean"]>;
  itemId: Scalars["ID"];
  quantityNeeded: Scalars["Int"];
  unit?: Maybe<Scalars["String"]>;
};

export type GetCatalogQueryVariables = Exact<{ [key: string]: never }>;

export type GetCatalogQuery = {
  __typename?: "Query";
  catalog: Array<{
    __typename?: "CatalogItem";
    id: string;
    name: string;
    category: string;
    defaultUnit?: string | null;
  }>;
};

export type AddCatalogItemMutationVariables = Exact<{
  input: CatalogInputItem;
}>;

export type AddCatalogItemMutation = {
  __typename?: "Mutation";
  addCatalogItem: {
    __typename?: "AddCatalogItemResponse";
    code: number;
    success: boolean;
    message: string;
    catalogItem?: {
      __typename?: "CatalogItem";
      id: string;
      name: string;
      category: string;
      defaultUnit?: string | null;
    } | null;
  };
};

export type AddItemToListMutationVariables = Exact<{
  input: AddListItem;
}>;

export type AddItemToListMutation = {
  __typename?: "Mutation";
  addItemToList?: {
    __typename?: "AddItemToListResponse";
    code: number;
    success: boolean;
    message: string;
    item?: {
      __typename?: "RawListItem";
      itemId: string;
      quantityNeeded: number;
      unit?: string | null;
      inCart?: boolean | null;
    } | null;
  } | null;
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
      inCart?: boolean | null;
      name: string;
      category: string;
      defaultUnit?: string | null;
      id: string;
      catalogId: string;
    }>;
  };
};

export type AddItemToCartMutationVariables = Exact<{
  itemId: Scalars["String"];
}>;

export type AddItemToCartMutation = {
  __typename?: "Mutation";
  addItemToCart: {
    __typename?: "AddItemToCartResponse";
    code: number;
    success: boolean;
    message: string;
    item?: {
      __typename?: "ListItem";
      id: string;
      name: string;
      category: string;
      defaultUnit?: string | null;
      quantityNeeded: number;
      unit?: string | null;
      inCart?: boolean | null;
    } | null;
  };
};

export const GetCatalogDocument = gql`
  query getCatalog {
    catalog {
      id
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
export const AddCatalogItemDocument = gql`
  mutation addCatalogItem($input: CatalogInputItem!) {
    addCatalogItem(input: $input) {
      code
      success
      message
      catalogItem {
        id
        name
        category
        defaultUnit
      }
    }
  }
`;
export type AddCatalogItemMutationFn = Apollo.MutationFunction<
  AddCatalogItemMutation,
  AddCatalogItemMutationVariables
>;

/**
 * __useAddCatalogItemMutation__
 *
 * To run a mutation, you first call `useAddCatalogItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCatalogItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCatalogItemMutation, { data, loading, error }] = useAddCatalogItemMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddCatalogItemMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddCatalogItemMutation,
    AddCatalogItemMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AddCatalogItemMutation,
    AddCatalogItemMutationVariables
  >(AddCatalogItemDocument, options);
}
export type AddCatalogItemMutationHookResult = ReturnType<
  typeof useAddCatalogItemMutation
>;
export type AddCatalogItemMutationResult =
  Apollo.MutationResult<AddCatalogItemMutation>;
export type AddCatalogItemMutationOptions = Apollo.BaseMutationOptions<
  AddCatalogItemMutation,
  AddCatalogItemMutationVariables
>;
export const AddItemToListDocument = gql`
  mutation addItemToList($input: AddListItem!) {
    addItemToList(input: $input) {
      code
      success
      message
      item {
        itemId
        quantityNeeded
        unit
        inCart
      }
    }
  }
`;
export type AddItemToListMutationFn = Apollo.MutationFunction<
  AddItemToListMutation,
  AddItemToListMutationVariables
>;

/**
 * __useAddItemToListMutation__
 *
 * To run a mutation, you first call `useAddItemToListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddItemToListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addItemToListMutation, { data, loading, error }] = useAddItemToListMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddItemToListMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddItemToListMutation,
    AddItemToListMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AddItemToListMutation,
    AddItemToListMutationVariables
  >(AddItemToListDocument, options);
}
export type AddItemToListMutationHookResult = ReturnType<
  typeof useAddItemToListMutation
>;
export type AddItemToListMutationResult =
  Apollo.MutationResult<AddItemToListMutation>;
export type AddItemToListMutationOptions = Apollo.BaseMutationOptions<
  AddItemToListMutation,
  AddItemToListMutationVariables
>;
export const GetShoppingListDocument = gql`
  query getShoppingList {
    list {
      items {
        quantityNeeded
        unit
        inCart
        name
        category
        defaultUnit
        id
        catalogId
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
export const AddItemToCartDocument = gql`
  mutation AddItemToCart($itemId: String!) {
    addItemToCart(itemId: $itemId) {
      code
      success
      message
      item {
        id
        name
        category
        defaultUnit
        quantityNeeded
        unit
        inCart
      }
    }
  }
`;
export type AddItemToCartMutationFn = Apollo.MutationFunction<
  AddItemToCartMutation,
  AddItemToCartMutationVariables
>;

/**
 * __useAddItemToCartMutation__
 *
 * To run a mutation, you first call `useAddItemToCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddItemToCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addItemToCartMutation, { data, loading, error }] = useAddItemToCartMutation({
 *   variables: {
 *      itemId: // value for 'itemId'
 *   },
 * });
 */
export function useAddItemToCartMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddItemToCartMutation,
    AddItemToCartMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AddItemToCartMutation,
    AddItemToCartMutationVariables
  >(AddItemToCartDocument, options);
}
export type AddItemToCartMutationHookResult = ReturnType<
  typeof useAddItemToCartMutation
>;
export type AddItemToCartMutationResult =
  Apollo.MutationResult<AddItemToCartMutation>;
export type AddItemToCartMutationOptions = Apollo.BaseMutationOptions<
  AddItemToCartMutation,
  AddItemToCartMutationVariables
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
