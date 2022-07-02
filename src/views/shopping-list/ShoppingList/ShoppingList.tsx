import { Typography } from "@mui/material";
import { Layout, QueryHandler } from "components";
import { useGetShoppingListQuery } from "generated/graphql";
import { List } from "../components";

export const ShoppingList = () => {
  const { data, error, loading } = useGetShoppingListQuery();

  return (
    <Layout>
      <QueryHandler data={data} error={error} loading={loading}>
        <Typography component="h1">Shopping List</Typography>
        <List data={data} />
      </QueryHandler>
    </Layout>
  );
};
