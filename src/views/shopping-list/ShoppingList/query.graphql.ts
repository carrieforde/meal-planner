import { gql } from "@apollo/client";

export const SHOPPING_LIST = gql`
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
