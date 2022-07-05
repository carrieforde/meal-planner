import AddIcon from "@mui/icons-material/Add";
import { Dialog, Fab, Typography } from "@mui/material";
import { Layout, QueryHandler } from "components";
import { useGetShoppingListQuery } from "generated/graphql";
import { useState } from "react";
import { List } from "../components";
import { AddShoppingItemForm } from "./components";

export const ShoppingList = () => {
  const { data, error, loading } = useGetShoppingListQuery();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClose = () => setIsDialogOpen(false);

  const handleFabClick = () => setIsDialogOpen(true);

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

        <Dialog open={isDialogOpen} onClose={handleClose}>
          <AddShoppingItemForm onClose={handleClose} />
        </Dialog>
      </Layout>
    </QueryHandler>
  );
};
