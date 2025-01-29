import { ShoppingCartService } from "./shoppingCartService";
import { database } from "./data.json";
import { createProductCard } from "./createProductCard";

export const loadProducts = () => {
  const shoppingCartService = new ShoppingCartService();
  const productContainerElement = document.getElementById("productsContainer");

  for (const product of database) {
    const productElement = createProductCard(product);
    const addProductToShoppingCartButton =
      productElement.getElementsByTagName("button")[0];

    addProductToShoppingCartButton.addEventListener("click", () => {
      shoppingCartService.addProduct(product, 4);
    });

    productContainerElement.appendChild(productElement);
  }
};
