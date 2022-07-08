import React from "react";
import { Route, Routes } from "react-router";
import { Catalog, MealPlans, Recipes, ShoppingList } from "pages";

export const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<ShoppingList />} />
    <Route path="shopping-list" element={<ShoppingList />} />
    <Route path="catalog" element={<Catalog />} />
    <Route path="recipes" element={<Recipes />} />
    <Route path="meal-plans" element={<MealPlans />} />
  </Routes>
);
