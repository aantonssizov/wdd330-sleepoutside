import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

const checkoutProcess = new CheckoutProcess();
const zipInput = document.querySelector("input#zipCode");
const checkoutForm = document.querySelector("form.checkout-form");

loadHeaderFooter();
checkoutProcess.setOrderSubtotal();

zipInput.addEventListener("input", () => {
  if (!zipInput.value) return;

  checkoutProcess.setOrderSummary();
});

checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (checkoutForm.checkValidity()) {
    checkoutProcess.checkout(checkoutForm);
  } else {
    checkoutForm.reportValidity();
  }
});
