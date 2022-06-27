import { Box } from "@mui/material";
import { IngredientForm } from "../IngredientForm/IngredientForm";

function App() {
  return (
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
      <IngredientForm />
    </Box>
  );
}

export default App;
