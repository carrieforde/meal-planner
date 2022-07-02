import {
  List as MuiList,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { GetShoppingListQuery } from "generated/graphql";
import React from "react";
import { getText } from "utilities";
import { ShoppingCategories, shoppingCategoriesMap } from "@constants";

export type ListProps = {
  data?: GetShoppingListQuery;
};

export const List: React.FC<ListProps> = ({ data }) => {
  const categories = data?.list?.items
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
            {data?.list.items
              .filter(({ item }) => item.category === category)
              .sort((a, b) => a.item.name.localeCompare(b.item.name))
              .map(({ item: { name }, quantityNeeded, unit }) => (
                <ListItem key={name} data-testid={name}>
                  <ListItemIcon>
                    <CheckBoxIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={getText({ itemName: name, quantityNeeded, unit })}
                  />
                </ListItem>
              ))}
          </MuiList>
        </ListItem>
      ))}
    </MuiList>
  );
};
