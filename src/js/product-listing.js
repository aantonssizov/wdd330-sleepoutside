import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam, loadLocalJSON } from "./utils.mjs";

async function setProductsTitle() {
  const categoryNames = await loadLocalJSON("category-names.json");
  const categoryName = categoryNames[category];
  const productsTitle = document.querySelector("section.products h2");

  productsTitle.textContent = `Top Products: ${categoryName}`;
}

loadHeaderFooter();
setProductsTitle();

const category = getParam("category");
const productsSection = document.querySelector("ul.product-list");
const dataSource = new ExternalServices(category);
const products = new ProductList(category, dataSource, productsSection);

products.init();
