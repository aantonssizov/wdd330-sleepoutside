import ShoppingCart from "./ShoppingCart.mjs";
import { getLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

function setCartFooter() {
  const cartFooter = document.querySelector(".cart-footer");
  const cartTotal = cartFooter.querySelector("p.cart-total");

  if (!cartItems.length) return;

  cartFooter.classList.remove("hide");
  const total = cartItems
    .reduce((prev, curr) => prev + curr.FinalPrice * curr.quantity, 0)
    .toFixed(2);
  cartTotal.textContent = `Total: ${total}$`;
}

const cartItems = getLocalStorage("so-cart");
const listItem = document.querySelector(".product-list");
const shoppingCart = new ShoppingCart(cartItems, listItem);

loadHeaderFooter();
shoppingCart.renderList();
setCartFooter();
