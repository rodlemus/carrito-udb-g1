import { ShoppingCartService } from "./shoppingCartService.js";
import { database } from "./data.json";
import { createProductCard } from "./createProductCard.js";

export const loadProducts = () => {
  const shoppingCartService = new ShoppingCartService();
  const productContainerElement = document.getElementById("productsContainer");

  for (const product of database) {
    const productElement = createProductCard(product);

    // Obtén el botón "Agregar al carrito"
    const addProductToShoppingCartButton = productElement.querySelector("button.bg-green-500");

    // Agrega un event listener al botón
    addProductToShoppingCartButton.addEventListener("click", () => {
      // Obtén la cantidad seleccionada del producto
      const quantityValue = productElement.querySelector(".w-8.text-center.font-bold");
      const numberOfProducts = parseInt(quantityValue.textContent);

      // Llama al método addProduct con el producto y la cantidad
      shoppingCartService.addProduct(product, numberOfProducts);
      console.log("Producto agregado al carrito:", product); // <-- Verifica que el producto se agregue
    });

    // Agrega el card al contenedor de productos
    productContainerElement.appendChild(productElement);
  }
};