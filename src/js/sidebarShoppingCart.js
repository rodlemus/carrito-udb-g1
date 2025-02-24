import { ShoppingCartService } from "./shoppingCartService.js";

const shoppingCartNavBarBtn = document.getElementById("shoppingCartNavBarBtn");
const shoppingCartCloseBtn = document.getElementById("shoppingCartCloseBtn");
const sidebarShoppingCartContainer = document.getElementById(
  "sidebarShoppingCart"
);

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
      <div class="flex justify-between items-center gap-4 p-4 bg-white rounded-lg shadow-md">
        <div class="flex-none">
          <img src="${item.product.url}" alt="${
      item.product.name
    }" class="w-16 h-16 object-cover rounded-md">
        </div>
        <div class="grow text-center">
          <span class="font-medium">${item.product.name}</span>
        </div>
        <div class="grow text-center">
          <span class="font-semibold">Cantidad: <span class="text-lg">${
            item.numberOfProducts
          }</span></span>
        </div>
        <div class="grow text-center">
          <span class="font-semibold">Precio: <span class="text-lg">$${
            item.product.price * item.numberOfProducts
          }</span></span>
        </div>
        <button class="text-red-500 hover:text-red-700 transition duration-300 remove-button" data-product-id="${
          item.product.id
        }">
          <i class="fas fa-trash text-lg"></i>
        </button>
      </div>
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
  const total = products.reduce(
    (sum, item) => sum + item.product.price * item.numberOfProducts,
    0
  );

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
const clearCartButton = document.querySelector(
  "#sidebarShoppingCart button.bg-red-600"
);

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
// Función para generar y mostrar la factura
const generateInvoice = (products) => {
  // Cerrar el carrito automáticamente
  sidebarShoppingCartContainer.classList.add("translate-x-full"); // Oculta el carrito
  sidebarShoppingCartContainer.classList.remove("translate-x-0"); // Asegura que no esté visible

  // Crear el contenedor de la factura
  const invoiceContainer = document.createElement("div");
  invoiceContainer.className = "fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center";

  const invoiceContent = document.createElement("div");
  invoiceContent.className = "bg-white p-6 rounded-lg w-11/12 max-w-2xl";

  const invoiceTitle = document.createElement("h2");
  invoiceTitle.className = "text-2xl font-bold mb-4";
  invoiceTitle.textContent = "Factura de Compra";

  const invoiceList = document.createElement("ul");
  invoiceList.className = "mb-4";

  let subtotal = 0; // Subtotal sin IVA
  let ivaRate = 0.13; // Tasa de IVA (13%)
  let ivaAmount = 0; // Monto del IVA
  let total = 0; // Total con IVA incluido

  // Generar la lista de productos en la factura
  products.forEach((item) => {
    const productUnitPrice = item.product.price; // Precio unitario
    const productTotal = item.product.price * item.numberOfProducts; // Precio total por producto
    subtotal += productTotal; // Sumar al subtotal

    const invoiceItem = document.createElement("li");
    invoiceItem.className = "flex justify-between items-center border-b py-2";
    invoiceItem.innerHTML = `
      <div class="flex flex-col">
        <span class="font-medium">${item.product.name}</span>
        <span class="text-sm text-gray-600">Cantidad: ${item.numberOfProducts}</span>
        <span class="text-sm text-gray-600">Precio unitario: $${productUnitPrice.toFixed(2)}</span>
      </div>
      <span class="font-semibold">$${productTotal.toFixed(2)}</span>
    `;
    invoiceList.appendChild(invoiceItem);
  });

  // Calcular el IVA y el total
  ivaAmount = subtotal * ivaRate; // Calcular el monto del IVA
  total = subtotal + ivaAmount; // Calcular el total con IVA

  // Mostrar el subtotal, IVA y total en la factura
  const invoiceDetails = document.createElement("div");
  invoiceDetails.className = "text-right space-y-2";

  const subtotalElement = document.createElement("div");
  subtotalElement.className = "text-sm text-gray-600";
  subtotalElement.textContent = `Subtotal: $${subtotal.toFixed(2)}`;
  invoiceDetails.appendChild(subtotalElement);

  const ivaElement = document.createElement("div");
  ivaElement.className = "text-sm text-gray-600";
  ivaElement.textContent = `IVA (13%): $${ivaAmount.toFixed(2)}`;
  invoiceDetails.appendChild(ivaElement);

  const totalElement = document.createElement("div");
  totalElement.className = "font-bold text-xl";
  totalElement.textContent = `Total: $${total.toFixed(2)}`;
  invoiceDetails.appendChild(totalElement);

  // Botón para cerrar la factura y seguir comprando
  const closeButton = document.createElement("button");
  closeButton.className = "mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer";
  closeButton.textContent = "Seguir Comprando";
  closeButton.addEventListener("click", () => {
    document.body.removeChild(invoiceContainer); // Cierra el modal de la factura
  });

  // Agregar elementos al contenido de la factura
  invoiceContent.appendChild(invoiceTitle);
  invoiceContent.appendChild(invoiceList);
  invoiceContent.appendChild(invoiceDetails);
  invoiceContent.appendChild(closeButton);

  // Agregar el contenido de la factura al contenedor
  invoiceContainer.appendChild(invoiceContent);

  // Mostrar la factura en el cuerpo del documento
  document.body.appendChild(invoiceContainer);
};
