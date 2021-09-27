import { AJAX } from "./helper.js";
import _ from "lodash";
export const state = {
  products: {},
  filteredproducts: {},
  categories: [],
};

export const loadProducts = async function () {
  try {
    const data = await AJAX("https://fakestoreapi.com/products");
    state.products = data;
    state.filteredproducts = data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const loadCategories = async function () {
  try {
    const data = await AJAX("https://fakestoreapi.com/products/categories");
    state.categories = data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const searchProducts = function (searchinput) {
  state.filteredproducts = state.products?.filter((item) =>
    item.title.includes(searchinput)
  );
};

export const sortBy = function (value) {
  state.filteredproducts = _.sortBy(state.products, [value]);
};

export const filterByCategories = function (value) {
  if (value === "Choose Category") {
    state.filteredproducts = state.products;
    return;
  }
  state.filteredproducts = state.products?.filter(
    (item) => item.category === value
  );
};
