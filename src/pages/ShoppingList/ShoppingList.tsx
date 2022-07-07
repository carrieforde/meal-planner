import { DialogType } from "@constants";
import AddIcon from "@mui/icons-material/Add";
import { Fab, Typography } from "@mui/material";
import { Layout, QueryHandler } from "components";
import { useGetShoppingListQuery } from "generated/graphql";
import { setDialogOpen, setDialogType } from "store";
import { List } from "components";

export const ShoppingList = () => {
  const { data, error, loading } = useGetShoppingListQuery();

  const handleFabClick = () => {
    setDialogType(DialogType.ADD_LIST_ITEM);
    setDialogOpen();
  };

  return (
    <QueryHandler data={data} error={error} loading={loading}>
      <Layout>
        <Typography component="h1">Shopping List</Typography>
        <List data={data} />

        <Fab
          color="primary"
          aria-label="Add Item to List"
          sx={{ position: "fixed", bottom: 32, right: 32 }}
          onClick={handleFabClick}
        >
          <AddIcon />
        </Fab>
      </Layout>
    </QueryHandler>
  );
};
