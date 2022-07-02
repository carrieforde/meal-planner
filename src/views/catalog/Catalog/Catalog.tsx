import { Typography } from "@mui/material";
import { Layout, QueryHandler } from "components";
import { useGetCatalogQuery } from "generated/graphql";
import React from "react";

export const Catalog = () => {
  const { data, error, loading } = useGetCatalogQuery();

  return (
    <Layout>
      <QueryHandler data={data} error={error} loading={loading}>
        <Typography component="h1">Catalog</Typography>
      </QueryHandler>
    </Layout>
  );
};
