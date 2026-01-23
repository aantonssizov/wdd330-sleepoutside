// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// get param from the URL
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  return urlParams.get(param);
}

// render list with a template
export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {

  const renderedItems = list
    .map(templateFn)
    .join("");

  if (clear)
    parentElement.replaceChildren([]);

  parentElement.insertAdjacentHTML(position, renderedItems);
}

// render with a template
export function renderWithTemplate(template, parentElement, data = null, callback = null) {
  const fragment = document.createRange().createContextualFragment(template);
  parentElement.replaceChildren(fragment);

  if (callback) callback(data);
}

// load template from a given path
async function loadTemplate(path) {
  const response = await fetch(path);

  if (response.ok)
    return await response.text();
  else
    throw new Error(`Failed to fetch the template from the path: ${path}`);
}

// load templates for header and footer and render them
export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partials/header.html");
  const footerTemplate = await loadTemplate("../partials/footer.html");

  const header = document.querySelector("#main-header");
  const footer = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, header);
  renderWithTemplate(footerTemplate, footer);
}

// load local JSON file
export async function loadLocalJSON(filename) {
  const response = await fetch(`../json/${filename}`);
  const data = await response.json();
  return data;
}