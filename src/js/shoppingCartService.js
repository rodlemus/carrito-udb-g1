import Swal from "sweetalert2";

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
    try {
      // se crea el objeto con el producto y la cantidad
      const productAddedToShoppingCart = {
        product,
        numberOfProducts,
      };
      // obenemos los productos guardados en el localStorage
      // le vamos agregar el producto que se acaba de agregar
      const products = this.getProducts();
      const alreadyExist = products.some(
        (item) => item.product.id === product.id
      );

      if (alreadyExist) {
        this.checkSameProductInCart(product.id, numberOfProducts, products);
        Swal.fire({
          title: "Producto agregado al carrito!",
          text: `${product.name} se ha añadido a tu carrito.`,
          icon: "success",
          confirmButtonText: "¡OK!",
        }).then(() => {
          // Aquí puedes actualizar el contador del carrito en el navbar
          this.updateCartCount();
        });
        return;
      }

      const productsUpdated = [...products, productAddedToShoppingCart];

      // se guarda el carrito en el localStorage
      // y a que cambiamos el estado ahora tenemos que escribir nuevamente el cambio en el local storage
      localStorage.setItem(
        this.localStorageKey,
        JSON.stringify(productsUpdated)
      );

      Swal.fire({
        title: "Producto agregado al carrito!",
        text: `${product.name} se ha añadido a tu carrito.`,
        icon: "success",
        confirmButtonText: "¡OK!",
      }).then(() => {
        // Aquí puedes actualizar el contador del carrito en el navbar
        this.updateCartCount();
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Hubo un error al agregar el producto al carrito. Intentalo nuevamente.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      console.error("Error al agregar el producto al carrito: ", error);
    }
  }

  checkSameProductInCart(productId, numberOfProducts, products) {
    const product = products.find((item) => item.product.id === productId);
    product.numberOfProducts += numberOfProducts;
    localStorage.setItem(this.localStorageKey, JSON.stringify(products));
  }

  updateCartCount() {
    const productsInCart = this.getProducts();
    const cartCount = productsInCart.reduce(
      (acc, item) => acc + item.numberOfProducts,
      0
    );
    const cartButton = document.getElementById("shoppingCartNavBarBtn");
    const countBadge = cartButton.querySelector("div span");

    countBadge
      ? (countBadge.textContent = cartCount)
      : console.log("No se encontro el elemento del contador");
    // Aqui actualizamos el numero de productos en el carrito
  }

  //leemos los productos del localStorage
  getProducts() {
    const products =
      JSON.parse(localStorage.getItem(this.localStorageKey)) || [];
    if (products) {
      this.productsState = products;
    }
    return this.productsState;
  }

  // remover productos del carrito
  removeProduct(productId) {
    console.log("ID del producto a eliminar: ", productId);

    const products = this.getProducts();
    const updatedProducts = products.filter(
      (item) => item.product.id !== productId
    );

    console.log("Productos despues de eliminar: ", updatedProducts);

    localStorage.setItem(this.localStorageKey, JSON.stringify(updatedProducts));
    this.updateCartCount();
  }

  // metodo para limpiar el carrito
  clearCart() {
    localStorage.setItem(this.localStorageKey, JSON.stringify([])); // Establecemos el carrito como un array vacio
    this.productsState = [];
    console.log("Carrito vaciado");
    this.updateCartCount();
  }
}
