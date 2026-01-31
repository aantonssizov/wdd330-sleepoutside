import { alertMessage, getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
        // the product details are needed before rendering the HTML
        // once the HTML is rendered, add a listener to the Add to Cart button
        // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on 'this' to understand why.
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails();
        document.getElementById("addToCart")
            .addEventListener("click", this.addProductToCart.bind(this));
    }

    addProductToCart() {
        const cartItems = getLocalStorage("so-cart") ?? [];
        const cartItem = cartItems.find((itm) => itm.Id === this.product.Id);
        if (cartItem) {
            const cartItemIndex = cartItems.indexOf(cartItem);
            cartItem.quantity++;
            cartItems[cartItemIndex] = cartItem;
        } else {
            this.product.quantity = 1;
            cartItems.push(this.product);
        }
        setLocalStorage("so-cart", cartItems);
        alertMessage("Item succesfully added to the cart!");
    }

    renderProductDetails() {
        const main = document.querySelector("main");
        const section = document.createElement("section");
        const brand = document.createElement("h3");
        const name = document.createElement("h2");
        const img = document.createElement("img");
        const price = document.createElement("p");
        const color = document.createElement("p");
        const description = document.createElement("p");
        const addBtnContainer = document.createElement("div");
        const addBtn = document.createElement("button");

        section.classList.add("product-detail");

        brand.textContent = this.product.Brand.Name;

        name.textContent = this.product.NameWithoutBrand;
        name.classList.add("divider");

        img.src = this.product.Images.PrimaryLarge;
        img.classList.add("divider");
        img.alt = this.product.NameWithoutBrand;

        price.innerHTML = `$${this.product.FinalPrice} ${this.product.FinalPrice < this.product.SuggestedRetailPrice ? "<span class=\"discounted\">Discounted</span>" : ""}`;
        price.classList.add("product-card__price");

        color.textContent = this.product.Colors.map((itm) => itm.ColorName).join(", ");
        color.classList.add("product__color");

        description.setHTMLUnsafe(this.product.DescriptionHtmlSimple);
        description.classList.add("product__description");

        addBtnContainer.classList.add("product-detail__add");

        addBtn.id = "addToCart";
        addBtn.textContent = "Add to Cart";
        addBtn.setAttribute("data-id", this.productId);

        addBtnContainer.appendChild(addBtn);

        section.append(brand, name, img, price, color, description, addBtnContainer);

        main.replaceChildren(section);
    }
}