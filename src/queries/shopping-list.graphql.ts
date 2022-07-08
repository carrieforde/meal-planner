import { gql } from "@apollo/client";

export const SHOPPING_LIST = gql`
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

export const ADD_ITEM_TO_CART = gql`
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
