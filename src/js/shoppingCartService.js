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
    // se crea el objeto con el producto y la cantidad
    const productAddedToShoppingCart = {
      product,
      numberOfProducts,
    };
    // obenemos los productos guardados en el localStorage
    // le vamos agregar el producto que se acaba de agregar
    const products = this.getProducts();

    const productsUpdated =  [...products, productAddedToShoppingCart];
    
    // se guarda el carrito en el localStorage
    // y a que cambiamos el estado ahora tenemos que escribir nuevamente el cambio en el local storage
    localStorage.setItem(this.localStorageKey, JSON.stringify(productsUpdated));
  }

  //leemos los productos del localStorage
  getProducts() {
    const products = JSON.parse(localStorage.getItem(this.localStorageKey)) || [];
    if (products) {
      this.productsState = products;
    }
    return this.productsState;
  }
}
