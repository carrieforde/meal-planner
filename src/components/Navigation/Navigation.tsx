import BookIcon from "@mui/icons-material/Book";
import CalendarMonthIcon from "@mui/icons-material/CalendarToday";
import InventoryIcon from "@mui/icons-material/Inventory";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { KeyboardEvent, MouseEvent, useCallback, useState } from "react";
import Link from "next/link";

export const Navigation = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = useCallback(
    (event: KeyboardEvent | MouseEvent) => {
      if (
        (event.type === "keydown" && (event as KeyboardEvent).key === "Tab") ||
        (event as KeyboardEvent).key === "Shift"
      ) {
        return;
      }

      setDrawerOpen((s) => !s);
    },
    []
  );

  return (
    <>
      <IconButton onClick={handleDrawerToggle}>
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClick={handleDrawerToggle}
        onKeyDown={handleDrawerToggle}
      >
        <Box component="nav" sx={{ width: "325px", maxWidth: "100%" }}>
          <List>
            <ListItem>
              <ListItemIcon>
                <CalendarMonthIcon />
              </ListItemIcon>
              <ListItemText
                primary={<Link href="/meal-plans">Meal Plans</Link>}
              />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <BookIcon />
              </ListItemIcon>
              <ListItemText primary={<Link href="/recipes">Recipes</Link>} />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText
                primary={<Link href="/shopping-list">Shopping List</Link>}
              />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <InventoryIcon />
              </ListItemIcon>
              <ListItemText primary={<Link href="/catalog">Catalog</Link>} />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};
