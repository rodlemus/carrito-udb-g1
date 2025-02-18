import { loadProducts } from "./js/productsEvents";
import { ShoppingCartService } from "./js/shoppingCartService";

// creamos una instancia de la clase para usar sus metodos
const shoppinCartService = new ShoppingCartService();

const main = () => {
  loadProducts();
  // Llamamos el metodo que actualiza el contador del carrito para mostrarlo desde que se carga la pagina
  shoppinCartService.updateCartCount();
};

main();
