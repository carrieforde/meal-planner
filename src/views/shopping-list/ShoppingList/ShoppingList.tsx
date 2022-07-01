import { Typography } from "@mui/material";
import { Layout, QueryHandler } from "components";
import { useShoppingListQuery } from "generated/graphql";
import { List } from "../components/List/List";

export const ShoppingList = () => {
  const { data, error, loading } = useShoppingListQuery();

  return (
    <QueryHandler data={data} error={error} loading={loading}>
      <Layout>
        <Typography component="h1">Shopping List</Typography>
        <List data={data} />
      </Layout>
    </QueryHandler>
  );
};
