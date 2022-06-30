import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { Layout, QueryHandler } from "components";
import { useShoppingListQuery } from "generated/graphql";

export const ShoppingList = () => {
  const { data, error, loading } = useShoppingListQuery();

  return (
    <QueryHandler data={data} error={error} loading={loading}>
      <Layout>
        <Typography component="h1">Shopping List</Typography>
        <List>
          {data?.shoppingList?.map((listItem) => (
            <ListItem key={listItem.item.itemName}>
              <ListItemText primary={listItem.item.itemName} />
            </ListItem>
          ))}
        </List>
      </Layout>
    </QueryHandler>
  );
};
