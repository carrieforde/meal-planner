import React from "react";
import { Alert, Snackbar as MuiSnackbar } from "@mui/material";
import { resetSnackbar, useSnackbarState } from "store";

export const Snackbar = () => {
  const { isSnackbarOpen, severity, message } = useSnackbarState();

  return (
    <MuiSnackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={isSnackbarOpen}
      onClose={resetSnackbar}
    >
      <Alert severity={severity ?? "success"}>{message}</Alert>
    </MuiSnackbar>
  );
};
