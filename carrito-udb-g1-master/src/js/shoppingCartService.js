export class ShoppingCartService {

  productsState = [];
  localStorageKey = "products";

  //metodo para inicializar el local storage
  // cuando se ejecute por primera vez en el navegador del usuario la key "products" no existira
  // por lo que se creara un arreglo vacio

  // si ya existe la key "products" no se hace nada

  // se ejecuta en el constructor de la clase ShoppingCartService por eso es privado
  #initLocalStorage() {
    const products = JSON.parse(localStorage.getItem(this.localStorageKey));
    if (!products) {
      localStorage.setItem(this.localStorageKey, JSON.stringify([]));
    }
  }

  constructor() {
    this.#initLocalStorage();
  }
  
  addProduct(product, numberOfProducts) {
  console.log("Producto recibido:", product); // <-- Verifica que el producto sea correcto
  console.log("Cantidad recibida:", numberOfProducts); // <-- Verifica que la cantidad sea correcta

  const productAddedToShoppingCart = {
    product,
    numberOfProducts,
  };

  const products = this.getProducts();
  const productsUpdated = [...products, productAddedToShoppingCart];

  localStorage.setItem(this.localStorageKey, JSON.stringify(productsUpdated));
  console.log("Producto agregado:", productAddedToShoppingCart); // <-- Este es el console.log que debería aparecer
}

  //leemos los productos del localStorage
  getProducts() {
    const products = JSON.parse(localStorage.getItem(this.localStorageKey)) || [];
    if (products) {
      this.productsState = products;
    }
    return this.productsState;
  }
  //remover productos del carrito
  removeProduct(productId) {
  console.log("ID del producto a eliminar:", productId); // <-- Verifica que el ID sea correcto

  const products = this.getProducts();
  const updatedProducts = products.filter(item => item.product.id !== productId);

  console.log("Productos después de eliminar:", updatedProducts); // <-- Verifica que el producto se haya eliminado

  localStorage.setItem(this.localStorageKey, JSON.stringify(updatedProducts));
}
  // Método para limpiar el carrito
  clearCart() {
    localStorage.setItem(this.localStorageKey, JSON.stringify([])); // Establece el carrito como un arreglo vacío
    this.productsState = []; // Limpia el estado local
    console.log("Carrito vaciado"); // <-- Verifica que el carrito se haya vaciado
  }
}
