export const createProductCard = (product) => {
  const divProductContainer = document.createElement("div");
  divProductContainer.classList.add("product");
  divProductContainer.className = "flex flex-col shadow-lg rounded-md w-full p-4 hover:shadow-xl";


  // a cualquir etiqueta html se le puede agregar un atributo personalizado
  // en este caso le agregamos un atributo product-id con el id del producto

  // <div product-id="abc" class="product flex flex-col border rounded-sm w-fit p-4">
  // esto puede ser util cuando se quiera obtener el id del producto
  // para hacer una peticion a la base de datos o para eliminar el producto del carrito
  divProductContainer.setAttribute("product-id", product.id);

  // Contenedor para la imagen, nombre y descripción
  const cardContentMaxGrow = document.createElement("div");
  cardContentMaxGrow.className = "flex flex-col items-center justify-center flex-grow";

  const productImg = document.createElement("img");
  productImg.className = "h-48 object-cover";
  productImg.src = product.Url;

  const productName = document.createElement("span");
  productName.className = "font-bold mt-2";
  productName.textContent = product.name;

  const productDescription = document.createElement("p");
  productDescription.className = "text-sm text-center";
  productDescription.textContent = product.description;

  // Mostrar la cantidad disponible
  const productStock = document.createElement("span");
  productStock.className = "text-sm text-gray-600 mt-1";
  productStock.textContent = `Disponible: ${product.stock}`;

  cardContentMaxGrow.appendChild(productImg);
  cardContentMaxGrow.appendChild(productName);
  cardContentMaxGrow.appendChild(productDescription);
  cardContentMaxGrow.appendChild(productStock); // <-- Aquí se agrega el stock

  // Contenedor para la cantidad con botones de + y -
  const quantityContainer = document.createElement("div");
  quantityContainer.className = "flex items-center justify-between rounded-sm px-2 py-3 bg-gray-200 md:w-5/12 sm:w-4/12 lg:w-6/12";

  const decreaseButton = document.createElement("button");
  decreaseButton.className = "p-1 hover:cursor-pointer";
  decreaseButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
    </svg>
  `;

  const quantityValue = document.createElement("span");
  quantityValue.className = "w-8 text-center font-bold";
  quantityValue.textContent = "1"; // 1 es el valor inicial del contador

  const increaseButton = document.createElement("button");
  increaseButton.className = "p-1 hover:cursor-pointer";
  increaseButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
    </svg>
  `;

  // Agregar eventos para modificar la cantidad
  decreaseButton.addEventListener("click", () => {
    let currentValue = parseInt(quantityValue.textContent);
    if (currentValue > 1) {
      quantityValue.textContent = currentValue - 1;
    }
  });

  increaseButton.addEventListener("click", () => {
  let currentValue = parseInt(quantityValue.textContent);
  if (currentValue < product.stock) {
    quantityValue.textContent = currentValue + 1;
  }
});

  quantityContainer.appendChild(decreaseButton);
  quantityContainer.appendChild(quantityValue);
  quantityContainer.appendChild(increaseButton);

  // Contenedor para el botón "Agregar al carrito"
  const productActionsContainer = document.createElement("div");
  productActionsContainer.className = "flex items-center justify-between w-full mt-4";

  const addProductToShoppingCartButton = document.createElement("button");
  addProductToShoppingCartButton.type = "button";
  addProductToShoppingCartButton.className =
    "bg-green-500 text-white rounded-sm p-3 cursor-pointer";
  addProductToShoppingCartButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#fff"><path d="M440-600v-120H320v-80h120v-120h80v120h120v80H520v120h-80ZM280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM40-800v-80h131l170 360h280l156-280h91L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68.5-39t-1.5-79l54-98-144-304H40Z"/></svg>
  `;

  productActionsContainer.appendChild(quantityContainer);
  productActionsContainer.appendChild(addProductToShoppingCartButton);

  // Precio al final
  const productPrice = document.createElement("span");
  productPrice.className = "font-semibold text-red-700 text-xl text-center mt-2";
  productPrice.textContent = `$${product.price}`;

  divProductContainer.appendChild(cardContentMaxGrow);
  divProductContainer.appendChild(productActionsContainer);
  divProductContainer.appendChild(productPrice);

  return divProductContainer;
};
 


/* la variable quantityValue guarda el valor actual de la cantidad del producto,
 para obtener el valor es con quantityValue.textContent */

// estructura que se genera con la funcion createProductCard

//<div
// product-id="abc" // atributo personalizado <--------------------------

// class="product flex flex-col border rounded-sm w-fit p-4"
// >
// <span>Teclado mecanico cherry rgb</span>
// <span>El mejor teclado para league of legends</span>
// <div>
//   <button
//     type="button"
//     class="bg-blue-700 text-white font-semibold py-2 px-1 rounded-sm"
//   >
//     Agregar al carrito
//   </button>
// </div>
// </div>
