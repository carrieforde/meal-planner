import { gql } from "@apollo/client";

export const GET_CATALOG = gql`
  query getCatalog {
    catalog {
      id
      name
      category
      defaultUnit
    }
  }
`;

export const ADD_CATALOG_ITEM = gql`
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

export const ADD_ITEM_TO_LIST = gql`
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
