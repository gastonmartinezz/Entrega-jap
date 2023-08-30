
let categoriaID = localStorage.getItem("catID");

const categoriaURL = `https://japceibal.github.io/emercado-api/cats_products/${categoriaID}.json`;

const fichas = document.getElementsByClassName("contenedor")[0];
const titulo = document.getElementById("tituloCategoria");

function crearFichas(registro){

    titulo.innerHTML =
        `
            <div>
                <h2> Venta de ${registro.catName}</h2>
            </div>
        `;
    

    for (const i of registro.products){
        fichas.innerHTML +=
            `
            
            <div class="articulo">
                <div class="imagenDeArticulo">
                    <img src= ${i.image}></img>
                </div>
                <div class="descDeArticulo">
                    <p class="titulo"> ${i.name} </p>
                    <p class="dinero"> ${i.currency} ${i.cost} </p>
                    <p class ="descripcion"> ${i.description} </p>
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
    //Aquí estamos seleccionando el botón de filtrado con el id "precioFiltros" y añadiendo un evento de clic. El bloque de código dentro de esta función se ejecutará cuando el usuario haga clic en ese botón.

  precioFiltrosBtn.addEventListener("click", function () {
    const precioMinInput = parseFloat(document.getElementById("precioMin").value);
    const precioMaxInput = parseFloat(document.getElementById("precioMax").value);
      // Filtra y ordena los productos según el rango de precios

    fetch(categoriaURL)
      .then(response => response.json())
      .then(data => {
          //utilizamos fetch para cargar los datos del JSON
        
        const productosFiltradosOrdenados = data.products.filter(producto => {
          const precioProducto = parseFloat(producto.cost);
          return precioProducto >= precioMinInput && precioProducto <= precioMaxInput;
        }).sort((a, b) => parseFloat(a.cost) - parseFloat(b.cost));

        // Limpiamos el contenedor de productos existente
        fichas.innerHTML = "";

        // Creamos las fichas de los productos filtrados y ordenados
        crearFichas({ catName: data.catName, products: productosFiltradosOrdenados });
      });
  });
});

  
 
