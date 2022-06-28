import { Box } from "@mui/material";
import { Navigation } from "components/Navigation/Navigation";

export const Layout: React.FC = ({ children }) => (
  <>
    <Navigation />
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {children}
    </Box>
  </>
);
