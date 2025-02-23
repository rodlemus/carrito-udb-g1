import { ShoppingCartService } from "./shoppingCartService";
import { database } from "./data.json";
import { createProductCard } from "./createProductCard";

export const loadProducts = () => {
  const shoppingCartService = new ShoppingCartService();
  const productContainerElement = document.getElementById("productsContainer");

  // leemos todos los productos de la base de datos ( el archivo data.json)
  for (const product of database) {
    // creamos el card del producto con la funcion createProductCard
    // le pasamos el objeto json a la funcion producto

    const productElement = createProductCard(product);

    // Obtenemos el boton Agregar al carrito
    const addProductToShoppingCartButton = productElement.querySelector("button.bg-green-500");

    // y le agregamos un evento de click
    addProductToShoppingCartButton.addEventListener("click", () => {
      // Obtenemos la cantidad selecciona del producto
      const quantityValue = productElement.querySelector(".w-8.text-center.font-bold");
      const numberOfProducts = parseInt(quantityValue.textContent);

      // llama al metodo addProduct con el producto y la cantidad
      shoppingCartService.addProduct(product, numberOfProducts);
      console.log("Producto agregado al carrito con exito: ", product);
    });

    // agregamos el card al contenedor de productos
    productContainerElement.appendChild(productElement);
  }
};
