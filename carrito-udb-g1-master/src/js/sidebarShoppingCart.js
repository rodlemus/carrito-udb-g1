import { ShoppingCartService } from "./shoppingCartService.js";

const shoppingCartNavBarBtn = document.getElementById("shoppingCartNavBarBtn");
const shoppingCartCloseBtn = document.getElementById("shoppingCartCloseBtn");
const sidebarShoppingCartContainer = document.getElementById("sidebarShoppingCart");

// Evento para abrir el carrito
shoppingCartNavBarBtn.addEventListener("click", (e) => {
  sidebarShoppingCartContainer.classList.add("translate-x-0");
  sidebarShoppingCartContainer.classList.remove("translate-x-full");
  renderCartItems(); // Renderiza los productos al abrir el carrito
});

// Evento para cerrar el carrito
shoppingCartCloseBtn.addEventListener("click", (e) => {
  sidebarShoppingCartContainer.classList.add("translate-x-full");
  sidebarShoppingCartContainer.classList.remove("translate-x-0");
});

// Función para renderizar los productos en el carrito
const renderCartItems = () => {
  const shoppingCartService = new ShoppingCartService();
  const cartItemsContainer = document.getElementById("cartItemsContainer");
  cartItemsContainer.innerHTML = ""; // Limpia el contenedor antes de renderizar

  const products = shoppingCartService.getProducts();
  console.log("Productos en el carrito:", products);

  // Renderiza cada producto en el carrito
  products.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.className = "flex justify-between items-center p-2 border-b";

    cartItem.innerHTML = `
      <img src="${item.product.Url}" alt="${item.product.name}" class="w-16 h-16 object-cover rounded-md">
      <span>${item.product.name}</span>
      <span>Cantidad: ${item.numberOfProducts}</span>
      <span>Precio: $${item.product.price * item.numberOfProducts}</span>
      <button class="text-red-500 hover:text-red-700 transition duration-300 remove-button" data-product-id="${item.product.id}">
    <i class="fas fa-trash"></i>
  </button>
      
    `;

    cartItemsContainer.appendChild(cartItem);
  });

  // Agrega event listeners a los botones "Eliminar"
  const removeButtons = document.querySelectorAll(".remove-button");
  removeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.getAttribute("data-product-id");
      removeFromCart(productId);
    });
  });

  // Calcula el total del carrito
  const total = products.reduce((sum, item) => sum + item.product.price * item.numberOfProducts, 0);

  // Actualiza el elemento que muestra el total
  const cartTotalElement = document.getElementById("cartTotal");
  if (cartTotalElement) {
    cartTotalElement.textContent = `Total: $${total.toFixed(2)}`; // Muestra el total con 2 decimales
  } else {
    console.error("Elemento con ID 'cartTotal' no encontrado.");
  }

  // Muestra u oculta el botón de "Pagar" según si hay productos en el carrito
  const payButton = document.getElementById("payButton");
  if (payButton) {
    if (products.length > 0) {
      payButton.style.display = "block"; // Muestra el botón si hay productos
    } else {
      payButton.style.display = "none"; // Oculta el botón si no hay productos
    }
  } else {
    console.error("Elemento con ID 'payButton' no encontrado.");
  }
};

// Función para eliminar un producto del carrito
const removeFromCart = (productId) => {
  const shoppingCartService = new ShoppingCartService();
  shoppingCartService.removeProduct(productId);
  renderCartItems(); // Re-renderiza el carrito después de eliminar un producto
};

// Evento para renderizar los productos cuando se abre el carrito
shoppingCartNavBarBtn.addEventListener("click", () => {
  renderCartItems();
});
// Obtén el botón "Borrar todo"
const clearCartButton = document.querySelector("#sidebarShoppingCart button.bg-red-600");

// Agrega un evento al botón "Borrar todo"
if (clearCartButton) {
  clearCartButton.addEventListener("click", () => {
    clearCart();
  });
}

// Función para eliminar todos los productos del carrito
const clearCart = () => {
  const shoppingCartService = new ShoppingCartService();
  shoppingCartService.clearCart(); // Llama a un método en el servicio para limpiar el carrito
  renderCartItems(); // Re-renderiza el carrito para reflejar los cambios
};
// Evento para el botón de "Pagar"
const payButton = document.getElementById("payButton");
if (payButton) {
  payButton.addEventListener("click", () => {
    const shoppingCartService = new ShoppingCartService();
    const products = shoppingCartService.getProducts();

    if (products.length > 0) {
      alert("Redirigiendo a la página de pago..."); // Puedes cambiar esto por una redirección real
      // Aquí puedes agregar la lógica para redirigir a una página de pago
    } else {
      alert("El carrito está vacío. Agrega productos para continuar.");
    }
  });
}