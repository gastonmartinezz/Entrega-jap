const isLoggedIn = true;
     
if (isLoggedIn) {
       const username = localStorage.getItem("Email");
    const usernameElement = document.getElementById("logged-in-username");
 
    usernameElement.textContent = username;
} 




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
        fichas.innerHTML =
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
  
  
  /*productos.products.forEach(producto => {
    const li = document.createElement('li');
    li.textContent = `${producto.name} - precio: ${producto.cost}`;
    listaProductos.appendChild(li);
  });
}
*/


function filtrarProductos() {
  const ordenSelect = document.getElementById('ordenSelect');
  console.log(ordenSelect.value)
  mostrarProductos(ordenSelect.value);
   
}
