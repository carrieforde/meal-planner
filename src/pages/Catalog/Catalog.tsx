import {
  DialogType,
  ShoppingCategories,
  shoppingCategoriesMap,
  UnitMap,
  Units,
} from "@constants";
import AddIcon from "@mui/icons-material/Add";
import { Box, Fab, IconButton, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Layout, QueryHandler } from "components";
import {
  CatalogItem,
  useAddItemToListMutation,
  useGetCatalogQuery,
} from "generated/graphql";
import React from "react";
import { setDialogOpen, setDialogType } from "store";

const AddToList: React.FC<CatalogItem> = ({ id }) => {
  const [addItemToList] = useAddItemToListMutation({
    variables: {
      input: {
        itemId: id,
        quantityNeeded: 3,
      },
    },
  });

  const handleClick = () => addItemToList();
  return (
    <IconButton onClick={handleClick}>
      <AddIcon />
    </IconButton>
  );
};

function mapCatalogItem({ id, name, defaultUnit, category }: CatalogItem) {
  return {
    id,
    name,
    defaultUnit: UnitMap[defaultUnit as Units],
    category: shoppingCategoriesMap[category as ShoppingCategories],
  };
}

export const Catalog = () => {
  const { data, error, loading } = useGetCatalogQuery();

  const columns: GridColDef[] = [
    {
      field: "add",
      headerName: "Add to List",
      renderCell: (params) => <AddToList {...params.row} />,
    },
    {
      field: "name",
      headerName: "Item Name",
      minWidth: 225,
    },
    {
      field: "category",
      headerName: "Category",
      minWidth: 225,
    },
    {
      field: "defaultUnit",
      headerName: "Default Unit",
    },
  ];

  const rows = data?.catalog.map((item) => mapCatalogItem(item));

  const handleFabClick = () => {
    setDialogType(DialogType.ADD_CATALOG_ITEM);
    setDialogOpen();
  };

  return (
    <Layout>
      <QueryHandler data={data} error={error} loading={loading}>
        <Typography component="h1">Catalog</Typography>
        {rows?.length && (
          <Box sx={{ width: "100%", height: "650px" }}>
            <DataGrid columns={columns} rows={rows} />
          </Box>
        )}

        <Fab
          color="primary"
          aria-label="Add Catalog Item"
          sx={{ position: "fixed", bottom: 32, right: 32 }}
          onClick={handleFabClick}
        >
          <AddIcon />
        </Fab>
      </QueryHandler>
    </Layout>
  );
};
