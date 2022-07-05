import { Alert, Box, Snackbar } from "@mui/material";
import { Navigation } from "components/Navigation";
import { resetSnackbar, useSnackbarState } from "store";

export const Layout: React.FC = ({ children }) => {
  const { isOpen, message, severity } = useSnackbarState();

  return (
    <>
      <Navigation />
      <Box
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          width: "100%",
          paddingLeft: 3,
          paddingRight: 3,
          position: "relative",
        }}
      >
        {children}

        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={isOpen}
          onClose={resetSnackbar}
        >
          <Alert severity={severity ?? "success"}>{message}</Alert>
        </Snackbar>
      </Box>
    </>
  );
};
