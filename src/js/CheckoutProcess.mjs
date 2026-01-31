import ExternalServices from "./ExternalServices.mjs";
import { alertMessage, getLocalStorage } from "./utils.mjs";

function packageItems(items) {
    const result = items.map((item) => ({
        id: item.Id,
        name: item.Name,
        price: item.FinalPrice,
        quantity: item.quantity
    }))

    return result;
}

function formDataToJSON(formElement) {
    const formData = new FormData(formElement),
        convertedJSON = {};

    formData.forEach(function (value, key) {
        convertedJSON[key] = value;
    });

    return convertedJSON;
}

export default class CheckoutProcess {
    constructor() {
        this.cartItems = getLocalStorage("so-cart");
        this.subtotal = 0;
        this.tax = 0;
        this.shipping = 0;
        this.orderTotal = 0;
        this.externalServices = new ExternalServices();
    }

    setOrderSubtotal() {
        const orderSubtotal = document.querySelector("p.subtotal");

        if (!this.cartItems.length) return;

        this.subtotal = this.cartItems
            .reduce((prev, curr) => prev + curr.FinalPrice * curr.quantity, 0).toFixed(2);

        orderSubtotal.textContent = `Subtotal: $${this.subtotal}`;
    }

    setOrderSummary() {
        const orderTax = document.querySelector("p.tax")
        const orderShippingEstimate = document.querySelector("p.shipping-estimate");
        const orderTotalElm = document.querySelector("p.order-total");

        if (!this.cartItems.length) return;

        this.tax = (this.subtotal * 0.06).toFixed(2); // sales tax is 6%
        this.shipping = (this.cartItems.length - 1) * 2 + 10; // 10$ for the first item + 2$ for each additional item
        this.orderTotal = (+this.subtotal + +this.tax + +this.shipping).toFixed(2);

        orderTax.textContent = `Tax: $${this.tax}`;
        orderShippingEstimate.textContent = `Shipping Estimate: $${this.shipping}`;
        orderTotalElm.textContent = `Order Total: $${this.orderTotal}`;
    }

    async checkout(form) {
        const payload = formDataToJSON(form);
        payload["items"] = packageItems(this.cartItems);
        payload["orderDate"] = new Date().toISOString();
        payload["orderTotal"] = this.orderTotal;
        payload["shipping"] = this.shipping;
        payload["tax"] = this.tax;

        try {
            await this.externalServices.checkout(payload);
            location.replace(`/checkout/success`);
        } catch (err) {
            Object.values(err.message).forEach(message => alertMessage(message));
        }
    }
}