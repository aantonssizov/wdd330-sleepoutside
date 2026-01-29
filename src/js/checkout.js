import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

const checkoutProcess = new CheckoutProcess();
const zipInput = document.querySelector("input#zipCode");

loadHeaderFooter();
checkoutProcess.setOrderSubtotal();

zipInput.addEventListener("input", (event) => {
  if (!event.data) return;

  checkoutProcess.setOrderSummary();
});
