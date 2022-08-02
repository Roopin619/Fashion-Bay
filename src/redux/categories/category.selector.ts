import { createSelector } from "reselect";

import { RootState } from "../store";

import { CategoriesState } from "./category.reducer";
import { CategoryMap } from "./category.types";

// Create select function to get the slice of categoriesReducer that we need
const selectCategoryReducer = (state: RootState): CategoriesState => state.categoriesReducer;

// memoize selector
export const selectCategories = createSelector(
  [selectCategoryReducer], // array of input selectors
  (categoriesSlice) => categoriesSlice.categories // output selector (Its arguments are the outputs of input selectors)
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories): CategoryMap =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {} as CategoryMap)
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);
