const shoppingCartNavBarBtn = document.getElementById("shoppingCartNavBarBtn");
const shoppingCartCloseBtn = document.getElementById("shoppingCartCloseBtn");
const sidebarShoppingCartContainer = document.getElementById(
  "sidebarShoppingCart"
);
// sidebar container

shoppingCartNavBarBtn.addEventListener("click", (e) => {
  sidebarShoppingCartContainer.classList.add("translate-x-0");
  sidebarShoppingCartContainer.classList.remove("translate-x-full");
});

shoppingCartCloseBtn.addEventListener("click", (e) => {
  sidebarShoppingCartContainer.classList.add("translate-x-full");
  sidebarShoppingCartContainer.classList.remove("translate-x-0");
});
