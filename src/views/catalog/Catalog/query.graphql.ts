import { gql } from "@apollo/client";

export const GET_CATALOG = gql`
  query getCatalog {
    catalog {
      name
      category
      defaultUnit
    }
  }
`;
