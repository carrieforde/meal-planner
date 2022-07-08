import { Box } from "@mui/material";
import { Dialog } from "components/Dialog";
import { Navigation } from "components/Navigation";
import { Snackbar } from "components/Snackbar";

export const Layout: React.FC = ({ children }) => {
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

        <Dialog />

        <Snackbar />
      </Box>
    </>
  );
};
