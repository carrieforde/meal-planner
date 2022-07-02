import { gql } from "@apollo/client";

export const SHOPPING_LIST = gql`
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
