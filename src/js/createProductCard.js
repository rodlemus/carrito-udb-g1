export const createProductCard = (product) => {
  const divProductContainer = document.createElement("div");
  divProductContainer.classList.add("product");
  divProductContainer.className = "flex flex-col border rounded-sm w-fit p-4";

  // a cualquir etiqueta html se le puede agregar un atributo personalizado
  // en este caso le agregamos un atributo product-id con el id del producto

  // <div product-id="abc" class="product flex flex-col border rounded-sm w-fit p-4">
  // esto puede ser util cuando se quiera obtener el id del producto
  // para hacer una peticion a la base de datos o para eliminar el producto del carrito
  divProductContainer.setAttribute("product-id", product.id);

  const productImg = document.createElement("img");
  productImg.classList.className = "w-48 h-48 object-cover";
  productImg.src = product.url;

  const productName = document.createElement("span");
  productName.classList.add("font-bold");
  productName.textContent = product.name;

  const productDescription = document.createElement("p");
  productDescription.classList.add("text-sm");
  productDescription.textContent = product.description;

  const productPrice = document.createElement("span");
  productPrice.className = "font-semibold text-red-700 text-xl";
  productPrice.textContent = `$${product.price}`;

  const addProductToShoppingCartButton = document.createElement("button");
  addProductToShoppingCartButton.type = "button";
  addProductToShoppingCartButton.className =
    "bg-blue-500 text-white rounded-sm p-2 mt-2 cursor-pointer";

  addProductToShoppingCartButton.textContent = "Agregar al carrito";

  divProductContainer.appendChild(productImg);
  divProductContainer.appendChild(productName);
  divProductContainer.appendChild(productDescription);
  divProductContainer.appendChild(productPrice);

  const cardContentMaxGrow = document.createElement("div");
  cardContentMaxGrow.classList.add("flex-grow");

  cardContentMaxGrow.appendChild(productImg);
  cardContentMaxGrow.appendChild(productName);
  cardContentMaxGrow.appendChild(productDescription);

  divProductContainer.appendChild(cardContentMaxGrow);
  divProductContainer.appendChild(addProductToShoppingCartButton);
  divProductContainer.appendChild(productPrice);

  return divProductContainer;
};

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
