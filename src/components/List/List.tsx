import { ShoppingCategories, shoppingCategoriesMap } from "@constants";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import {
  List as MuiList,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useShoppingList } from "hooks";
import React from "react";
import { getText } from "utilities";

export const List: React.FC = () => {
  const {
    listCategories: categories,
    addItemToCart,
    addItemToCartLoading: loading,
    data,
  } = useShoppingList();

  if (!categories?.length) {
    return <p>No items on list</p>;
  }

  return (
    <MuiList>
      {categories?.map((category) => (
        <ListItem
          key={category}
          data-testid={category}
          sx={{ display: "block" }}
        >
          <ListItemText
            primary={shoppingCategoriesMap[category as ShoppingCategories]}
          />

          <MuiList>
            {data?.list.items
              .filter((item) => item.category === category)
              .sort((a, b) => a.name.localeCompare(b.name))
              .map(({ name, id, quantityNeeded, unit, inCart }) => (
                <ListItem key={id} data-testid={name}>
                  <ListItemButton
                    disabled={loading}
                    onClick={() => addItemToCart(id)}
                  >
                    <ListItemIcon>
                      <CheckBoxIcon color={inCart ? "success" : "disabled"} />
                    </ListItemIcon>

                    <ListItemText
                      primary={getText({
                        itemName: name,
                        quantityNeeded,
                        unit,
                      })}
                      primaryTypographyProps={{
                        sx: {
                          textDecoration: inCart ? "line-through" : "none",
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
          </MuiList>
        </ListItem>
      ))}
    </MuiList>
  );
};
