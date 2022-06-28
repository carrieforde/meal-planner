import React from "react";
import { Route, Routes } from "react-router";
import { ItemInventory, MealPlans, Recipes, ShoppingList } from "views";

export const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<ShoppingList />} />
    <Route path="shopping-list" element={<ShoppingList />} />
    <Route path="item-inventory" element={<ItemInventory />} />
    <Route path="recipes" element={<Recipes />} />
    <Route path="meal-plans" element={<MealPlans />} />
  </Routes>
);
