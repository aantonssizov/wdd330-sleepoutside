import ShoppingCart from "./ShoppingCart.mjs";
import { getLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const cartItems = getLocalStorage("so-cart");
const listItem = document.querySelector(".product-list");
const shoppingCart = new ShoppingCart(cartItems, listItem);

loadHeaderFooter();
shoppingCart.renderList();
