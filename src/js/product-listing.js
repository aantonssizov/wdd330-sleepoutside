import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam, loadLocalJSON } from "./utils.mjs";

loadHeaderFooter();

const categoryNames = await loadLocalJSON("category-names.json");
const category = getParam("category");
const categoryName = categoryNames[category];
const productsTitle = document.querySelector("section.products h2");
const productsSection = document.querySelector("ul.product-list");
const dataSource = new ProductData(category);
const products = new ProductList(category, dataSource, productsSection);

productsTitle.textContent = `Top Products: ${categoryName}`;

products.init();
