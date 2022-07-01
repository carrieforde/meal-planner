import {
  List as MuiList,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { ShoppingListQuery } from "generated/graphql";
import React from "react";
import { getText } from "utilities";
import { ShoppingCategories, shoppingCategoriesMap } from "@constants";

export type ListProps = {
  data?: ShoppingListQuery;
};

export const List: React.FC<ListProps> = ({ data }) => {
  const categories = data?.shoppingList
    .reduce(
      (acc: string[], { item }) =>
        acc.includes(item.category) ? acc : [...acc, item.category],
      []
    )
    .sort((a, b) => a.localeCompare(b));

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
            {data?.shoppingList
              .filter(({ item }) => item.category === category)
              .sort((a, b) => a.item.itemName.localeCompare(b.item.itemName))
              .map(({ item: { itemName }, inCart, quantityNeeded, unit }) => (
                <ListItem key={itemName} data-testid={itemName}>
                  <ListItemIcon>
                    <CheckBoxIcon color={inCart ? "success" : "disabled"} />
                  </ListItemIcon>
                  <ListItemText
                    primary={getText({ itemName, quantityNeeded, unit })}
                  />
                </ListItem>
              ))}
          </MuiList>
        </ListItem>
      ))}
    </MuiList>
  );
};
