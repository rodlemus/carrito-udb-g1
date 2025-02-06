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

    // obtenemos el boton de agregar al carrito
    const addProductToShoppingCartButton =
      productElement.getElementsByTagName("button")[0];

    // y le agregamos un evento de click
    addProductToShoppingCartButton.addEventListener("click", () => {
      shoppingCartService.addProduct(product, 4);
    });

    // agregamos el card al contenedor de productos
    productContainerElement.appendChild(productElement);
  }
};
