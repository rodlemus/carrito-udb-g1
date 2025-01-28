import { ShoppingCartService } from "./shoppingCartService";
import { database } from "./data.json";

const shoppingCartService = new ShoppingCartService();
const productContainerElement = document.getElementById("productsContainer");

for (const product of database) {
  const addProductToShoppingCartButton =
    productElement.getElementsByTagName("button")[0];

  console.log(addProductToShoppingCartButton);
  if (addProductToShoppingCartButton) {
    addProductToShoppingCartButton.addEventListener("click", () => {
      shoppingCartService.addProduct(
        { id: "abc", name: "mechacnich keyboard" },
        4
      );
    });
  }
}

//load products from json
console.log(database);

const createProductElement = (product) => {};
