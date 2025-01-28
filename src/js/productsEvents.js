import { ShoppingCartService } from "./shoppingCartService";

const products = document.getElementsByClassName("product");
const shoppingCartService = new ShoppingCartService();

for (const productElement of products) {
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
