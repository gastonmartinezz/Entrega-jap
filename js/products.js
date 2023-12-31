
let categoriaID = localStorage.getItem("catID");

const categoriaURL = `https://japceibal.github.io/emercado-api/cats_products/${categoriaID}.json`;

const fichas = document.getElementsByClassName("contenedor")[0];
const titulo = document.getElementById("tituloCategoria");

function crearFichas(registro){
  titulo.innerHTML =
  `
    <div>
      <h2 class="tituloCategoria"> Venta de ${registro.catName}</h2>
    </div>
  `;

  for (const i of registro.products){
    fichas.innerHTML +=
      `
      <div class="articulo" onclick ="viajar(${i.id})">
        <div class="imagenDeArticulo">
            <img src= ${i.image}></img>
        </div>
        <div class="descDeArticulo">
          <p class="titulo buscador"> ${i.name} </p>
          <p class="dinero"> ${i.currency} ${i.cost} </p>
          <p class ="descripcion buscador"> ${i.description} </p>
          <p class ="sold"> Unidades vendidas: ${i.soldCount}</p>
          <button class="botonDeAgregar">Agregar a Carrito</button>
        </div>
      <div>
    `
  }
};

fetch(categoriaURL)
.then(response => response.json())
.then(data => crearFichas(data));

console.log(categoriaURL)

document.addEventListener("DOMContentLoaded", function () {
  const precioFiltrosBtn = document.getElementById("precioFiltros");

  precioFiltrosBtn.addEventListener("click", function () {
    const precioMinInput = parseFloat(document.getElementById("precioMin").value);
    const precioMaxInput = parseFloat(document.getElementById("precioMax").value);

    fetch(categoriaURL)
    .then(response => response.json())
    .then(data => {
      // Filtramos y ordenamos los productos según el rango de precios
      const productosFiltradosOrdenados = data.products.filter(producto => {
        const precioProducto = parseFloat(producto.cost);
        return precioProducto >= precioMinInput && precioProducto <= precioMaxInput;
      }).sort((a, b) => parseFloat(a.cost) - parseFloat(b.cost));

      // Limpiamos el contenedor de productos existente
      fichas.innerHTML ="";

      // Creamos las fichas de los productos filtrados y ordenados
      crearFichas({ catName: data.catName, products: productosFiltradosOrdenados });
    });
  });
});



document.addEventListener('keyup', e => {
  if (e.target.matches('#buscador')) {

    let searchText = e.target.value.toLowerCase();
    let fichasTexto = document.querySelectorAll("div.descDeArticulo");

    fichasTexto.forEach(producto => {
      let fichaTitulo = producto.getElementsByClassName("titulo")[0].innerHTML.toLowerCase();
      let fichaDesc = producto.getElementsByClassName("descripcion")[0].innerHTML.toLowerCase();
      
      const fichaEntera = producto.closest('.articulo');

      if (fichaTitulo.includes(searchText) || fichaDesc.includes(searchText)) {
        // Muestra el elemento si coincide con la búsqueda
        fichaEntera.style.display = 'block';
      } else {
        // Oculta el elemento si no coincide con la búsqueda
        fichaEntera.style.display = 'none';
      }
    })
  }
});

/* STICKY (testing) */

// When the user scrolls the page, execute myFunction
window.onscroll = function() {stickying()};

  let elemento = document.getElementsByClassName("posibleSticky")[0];
  // Get the offset position of the navbar
  var sticky = elemento.offsetTop;

function stickying() {
  if (window.scrollY >= sticky) {
    elemento.classList.add("sticky")
  } else {
    elemento.classList.remove("sticky");
  }
}

async function fetchProductos() {
  const response = await fetch(categoriaURL);
  const data = await response.json();
  return data;
}
  
async function mostrarProductos(orden) {
  const listaProductos = document.getElementById('contenedor1');
  listaProductos.innerHTML = '';
  
  const productos = await fetchProductos();
  
  if (orden === 'asc') {
    productos.products.sort((a, b) => a.cost - b.cost);
  } else if (orden === 'des') {
    productos.products.sort((a, b) => b.cost - a.cost);
  } else if (orden === 'rel'){
    productos.products.sort((a, b) => b.soldCount - a.soldCount )
  }

  crearFichas(productos); 
}

function filtrarProductos() {
  const ordenSelect = document.getElementById('ordenSelect');
  //console.log(ordenSelect.value)
  mostrarProductos(ordenSelect.value);
}

function viajar(x){

  localStorage.setItem('idproduct', x);
  window.location.href = 'product-info.html';
    
}
