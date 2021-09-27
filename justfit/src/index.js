import "./style.scss";
import "./css/products.css";
import "./css/main.css";

import * as model from "./app/model";
import productView from "./app/views/productView";
import _ from "lodash";
import dropdownView from "./app/views/dropdownView";

export const loadApp = () => {
  const showProducts = async function () {
    try {
      await model.loadProducts();

      const { products } = model.state;
      productView.render(products);
    } catch (err) {
      alert(err.message);
    }
  };

  showProducts();

  const input = document.getElementById("searchinput");
  input.addEventListener("keyup", searchProducts);

  function searchProducts() {
    model.searchProducts(input.value);
    const { filteredproducts } = model.state;
    productView.render(filteredproducts);
  }

  async function loadDropdown() {
    await model.loadCategories();
    const { categories } = model.state;
    dropdownView.render(categories);
  }

  loadDropdown();

  let radios = document.querySelectorAll('input[type=radio][name="sort"]');
  radios.forEach((radio) => radio.addEventListener("change", sortBy));

  function sortBy(e) {
    model.sortBy(e.target.value);
    const { filteredproducts } = model.state;
    productView.render(filteredproducts);
  }

  let drop = document.getElementById("dropdown");

  drop.addEventListener("change", filterByCategories);

  function filterByCategories(e) {
    model.filterByCategories(e.target.value);
    const { filteredproducts } = model.state;
    productView.render(filteredproducts);
  }
};

loadApp();
