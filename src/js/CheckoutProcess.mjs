import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
    constructor() {
        this.cartItems = getLocalStorage("so-cart");
    }

    setOrderSubtotal() {
        const orderSubtotal = document.querySelector("p.subtotal");

        if (!this.cartItems.length) return;

        const subtotal = this.cartItems
            .reduce((prev, curr) => prev + curr.FinalPrice, 0);

        orderSubtotal.textContent = `Subtotal: $${subtotal.toFixed(2)}`;
    }

    setOrderSummary() {
        const orderSubtotal = document.querySelector("p.subtotal");
        const orderTax = document.querySelector("p.tax")
        const orderShippingEstimate = document.querySelector("p.shipping-estimate");
        const orderTotal = document.querySelector("p.order-total");

        if (!this.cartItems.length) return;

        const subtotal = this.cartItems
            .reduce((prev, curr) => prev + curr.FinalPrice, 0);
        const tax = (subtotal * 0.06); // sales tax is 6%
        const shipping = (this.cartItems.length - 1) * 2 + 10; // 10$ for the first item + 2$ for each additional item
        const total = +subtotal + +tax + +shipping;

        orderSubtotal.textContent = `Subtotal: $${subtotal.toFixed(2)}`;
        orderTax.textContent = `Tax: $${tax.toFixed(2)}`;
        orderShippingEstimate.textContent = `Shipping Estimate: $${shipping.toFixed(2)}`;
        orderTotal.textContent = `Order Total: $${total.toFixed(2)}`;
    }
}