import { Box, IconButton, Typography } from "@mui/material";
import { Layout, QueryHandler } from "components";
import { CatalogItem, useGetCatalogQuery } from "generated/graphql";
import React from "react";
import { GridColDef, DataGrid } from "@mui/x-data-grid";
import {
  ShoppingCategories,
  shoppingCategoriesMap,
  UnitMap,
  Units,
} from "@constants";
import AddIcon from "@mui/icons-material/Add";

const AddToList: React.FC<CatalogItem> = ({ name }) => {
  // eslint-disable-next-line no-console
  const handleClick = () => console.log(`adding ${name} to list`);
  return (
    <IconButton onClick={handleClick}>
      <AddIcon />
    </IconButton>
  );
};

function mapCatalogItem(item: CatalogItem) {
  return {
    id: item.name,
    name: item.name,
    defaultUnit: UnitMap[item.defaultUnit as Units],
    category: shoppingCategoriesMap[item.category as ShoppingCategories],
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

  return (
    <Layout>
      <QueryHandler data={data} error={error} loading={loading}>
        <Typography component="h1">Catalog</Typography>
        {rows?.length && (
          <Box sx={{ width: "100%", height: "650px" }}>
            <DataGrid columns={columns} rows={rows} />
          </Box>
        )}
      </QueryHandler>
    </Layout>
  );
};
