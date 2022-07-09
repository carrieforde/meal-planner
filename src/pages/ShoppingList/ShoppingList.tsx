import { DialogType } from "@constants";
import AddIcon from "@mui/icons-material/Add";
import { Fab, Typography } from "@mui/material";
import { Layout, List, QueryHandler } from "components";
import { useShoppingList } from "hooks";
import { setDialogOpen, setDialogType } from "store";

export const ShoppingList = () => {
  const { data, error, loading } = useShoppingList();

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
