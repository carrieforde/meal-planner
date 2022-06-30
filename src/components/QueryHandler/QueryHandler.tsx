import { ApolloError } from "@apollo/client";
import { Alert, AlertTitle, Box, CircularProgress } from "@mui/material";
import React, { ReactNode } from "react";

export interface QueryHandlerProps<T> {
  data?: T;
  error?: ApolloError;
  loading?: boolean;
  children: ReactNode;
}

export const QueryHandler: React.FC<QueryHandlerProps<unknown>> = ({
  data,
  error,
  loading,
  children,
}) => {
  if (error) {
    return (
      <Alert>
        <AlertTitle>Error</AlertTitle>
        {error.message}
      </Alert>
    );
  }

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <CircularProgress variant="indeterminate" />
      </Box>
    );
  }

  if (!data) {
    return (
      <Alert>
        <AlertTitle>No data found!</AlertTitle>
      </Alert>
    );
  }

  return <>{children}</>;
};
