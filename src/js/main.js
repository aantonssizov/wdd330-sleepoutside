import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const productsSection = document.querySelector("ul.product-list");
const dataSource = new ProductData("tents");
const products = new ProductList("tents", dataSource, productsSection);

products.init();
