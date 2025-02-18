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
        confirmButtonText: "Aceptar"
      });
      console.error("Error al agregar el producto al carrito: ", error);
    }
  }

  updateCartCount() {
    const productsInCart = this.getProducts();
    const cartCount = productsInCart.reduce((acc, item) => acc + item.numberOfProducts, 0);
    const cartButton = document.getElementById("shoppingCartNavBarBtn");
    const countBadge = cartButton.querySelector('div span');

    countBadge ? countBadge.textContent = cartCount : console.log("No se encontro el elemento del contador");
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
}
