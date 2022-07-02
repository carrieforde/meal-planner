import { Typography } from "@mui/material";
import { Layout, QueryHandler } from "components";
import { useGetShoppingListQuery } from "generated/graphql";

export const ShoppingList = () => {
  const { data, error, loading } = useGetShoppingListQuery();

  return (
    <QueryHandler data={data} error={error} loading={loading}>
      <Layout>
        <Typography component="h1">Shopping List</Typography>
        {/* <List data={data} /> */}
      </Layout>
    </QueryHandler>
  );
};
