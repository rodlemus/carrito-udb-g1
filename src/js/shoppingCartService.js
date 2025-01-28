export class ShoppingCartService {
  state = [];
  addProduct(product, numberOfProducts) {
    const productAddedToShoppingCart = {
      product,
      numberOfProducts,
    };
    this.state = [...this.state, productAddedToShoppingCart];
    alert(
      `Producto agregado al carrito ${JSON.stringify(
        productAddedToShoppingCart
      )}`
    );
  }
}
