import { Box } from "@mui/material";
import { Navigation } from "components/Navigation";

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
        minHeight: "100vh",
        width: "100%",
        paddingLeft: 3,
        paddingRight: 3,
      }}
    >
      {children}
    </Box>
  </>
);
