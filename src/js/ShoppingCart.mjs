import { renderListWithTemplate, setLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryMedium}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: ${item.quantity}</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <button class="card__remove" data-id="${item.Id}">X</button>
</li>`;

  return newItem;
}

export default class ShoppingCart {
  constructor(cartItems, listElement) {
    this.cartItems = cartItems;
    this.listElement = listElement;
  }

  renderList() {
    renderListWithTemplate(cartItemTemplate, this.listElement, this.cartItems, "afterbegin", true);
    this.listElement.querySelectorAll("button.card__remove").forEach(button => {
      button.addEventListener("click", () => {
        this.cartItems = this.cartItems.filter(cartItem => cartItem.Id !== button.getAttribute("data-id"));
        setLocalStorage("so-cart", this.cartItems);
        location.reload();
      })
    })
  }
}