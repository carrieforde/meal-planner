import {
  List as MuiList,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { ShoppingListQuery } from "generated/graphql";
import React from "react";

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
        <ListItem key={category} sx={{ display: "block" }}>
          <ListItemText primary={category} />

          <MuiList>
            {data?.shoppingList.map(({ item, inCart }) => (
              <ListItem>
                <ListItemIcon>
                  <CheckBoxIcon color={inCart ? "success" : "disabled"} />
                </ListItemIcon>
                <ListItemText primary={item.itemName} />
              </ListItem>
            ))}
          </MuiList>
        </ListItem>
      ))}
    </MuiList>
  );
};