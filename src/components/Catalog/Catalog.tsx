import { DialogType } from "@constants";
import AddIcon from "@mui/icons-material/Add";
import { Box, Fab, IconButton, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Layout, QueryHandler } from "components";
import { CatalogItem, useAddItemToListMutation } from "generated/graphql";
import { useCatalogItems } from "hooks";
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

export const Catalog = () => {
  const { data, error, loading, catalogRowData: rows } = useCatalogItems();

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

  const handleFabClick = () => {
    setDialogType(DialogType.ADD_CATALOG_ITEM);
    setDialogOpen();
  };

  return (
    <Layout>
      <QueryHandler data={data} error={error} loading={loading}>
        <Typography component="h1">Catalog</Typography>
        {rows?.length && (
          <Box sx={{ width: "100%" }}>
            <DataGrid autoHeight columns={columns} rows={rows} />
          </Box>
        )}

        <Fab
          data-testid="addCatalogItem"
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
