// Lista de variables
const productos = [
    {
        nombre: "Tijera Maped",
        precio: 350,
        imagen: "./img/diseno-sin-titulo-581-b803379d1d79667d8e15919846777269-640-0.png"
    },
    {
        nombre: "Mouse Genius",
        precio: 2500,
        imagen: "./img/GENIUS SPEAR.jpg"
    },
    {
        nombre: "Marcadores Sharpie",
        precio: 1500,
        imagen: "./img/D_NQ_NP_664846-MLA48712334049_122021-W.jpg"
    },
    {
        nombre: "Colores Faber Castell aqua x12",
        precio: 2000,
        imagen: "./img/caja-12-lapices-acuarelables-faber-castell.jpg"
    },
    {
        nombre: "Lapicera trazo grueso",
        precio: 200,
        imagen: "./img/boligrafo-bic-azul-trazo-grueso-1mm-opaco-x50-unid-D_NQ_NP_897138-MLA31037651428_062019-F-min.jpg"
    },
    {
        nombre: "Lapicera trazo fino",
        precio: 250,
        imagen: "./img/lapicera-bic-trazo-fino1-71ebc33f028281085915864477484945-640-0-min.jpg"
    },
    {
        nombre: "Colores Maped x12",
        precio: 3000,
        imagen: "./img/LAPIMAPX12L_Lápices-Lagos-Maped-Colorpeps-x-12-unidades.jpg"
    },
    {
        nombre: "Fibras Faber Castell",
        precio: 3600,
        imagen: "./img/SKU000829.jpg"
    },
    {
        nombre: "Marcadores Sharpie Ultra",
        precio: 7500,
        imagen: "./img/33368.jpg"
    },
    {
        nombre: "Colores Faber Castell x24",
        precio: 5700,
        imagen: "./img/7f41ef83-b998-445e-bad1-77108607764c1-64b63113154e5c487e15956973524155-640-0.jpeg"
    }
];
let Carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const botonProductos = document.querySelector('#botonProductos');
const botonCarrito = document.querySelector('#botonCarrito');
const divCarrito = document.querySelector('.containerCarrito');
const divItems = document.querySelector('.containerProductos');

// asincronia para saber los utiles
setTimeout (()=>{
    Swal.fire({
        icon: 'question',
        title: 'Dudas?',
        text: 'Hechate un viztaso a la lista de utiles',
        footer: '<a href="https://alfonsinastorni.edu.ar/primaria/lista-de-utiles-y-materiales-de-primaria/">Llevame</a>'
      })
}, 4500)
// Carga de productos en el index
productos.forEach ((e)=>{
    divItems.innerHTML += `
                    
                    <div class="cardProducto">
                    <h2> ${e.nombre}</h2>
                    <img src="${e.imagen}" alt="">
                    <h3>$ ${e.precio}</h3>
                    <button class="agregarAlCarrito">Comprar</button>
                    </div>
            `;
    const botones = document.querySelectorAll(".agregarAlCarrito");
    botones.forEach((boton, index) => {
    boton.addEventListener('click', () => {
        Carrito.push(productos[index]);
        localStorage.setItem("carrito", JSON.stringify(Carrito));
    })
})
})
// evento para el boton del carrito
botonCarrito.addEventListener('click', ()=>{
 // muestra el total
    divItems.innerHTML = "";
    let totalCarrito = 0;
    Carrito.forEach((e) => {
        totalCarrito += e.precio;
    })
    // muestro el total en el div
    divItems.innerHTML += `<div class="divTotalCarrito">
    <h2 id="totalCarrito">Su total es de: $${totalCarrito}</h2>
    </div>`
    // crea las cards de los productos en el carrito
    Carrito.forEach((e) => {
        divItems.innerHTML += ` 
        <section class="carritoDeCompras"> 
        <div class="cardProducto" >
        <h2> ${e.nombre}</h2>
        <img src="${e.imagen}" alt="">
        <h3>$ ${e.precio}</h3>
        <button class="eliminarDelCarrito">Eliminar</button>
        </div>
        </section>`

    })
    // creo el formulario
    divItems.innerHTML +=
    `
    <div class="formulario">
    <form id="form1">
        <h2>Datos de quien retira</h2>
            <div>
                <label for="nombre">Nombre:</label>
                <input type="text" name="nombre"
                id="nombre" 
                placeholder="Escribe tu nombre">
            </div>
            <div>
                <label for="apellido">Apellido:</label>
                <input type="text" name="apellido" id="apellido" placeholder="Escribe tu apellido">
            </div>
            <div>

            </div>
            <div>
                <label for="email">Email:</label>
                <input type="email" name="email" id="email" placeholder="Escribe tu correo">
            </div>
            <div>
                <label for="numero">Telefono:</label>
                <input type="number" name="numero" id="numero">
            </div>
            <div class="botonRealizarCompra">
            <button id="botonSubmit">Realizar Compra</button>
            </div>
            
        </form>
    </div>
    </section>
`


    // boton para realizar compra y borrar todos los datos
    const botonComprar = document.querySelector("#botonSubmit");
    botonComprar.addEventListener('click', ()=>{
        // si quiere comprar con el carrito vacio tira un error
        if(totalCarrito==0){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El carrito se encuentra vacio',
                timer:2000
              })
        }else{
            Swal.fire({
                title: 'Genial!',
                text: 'Mandanos un mensaje a nuestras redes sociales para el retiro!',
                icon: 'success',
                confirmButtonText: 'Cool',
                timer:3500
        })
        divItems.innerHTML = "";
            Carrito = [];
            localStorage.setItem("carrito", JSON.stringify(Carrito));
        }  
})
   // boton eliminar producto del carrito
    const botonEliminar = document.querySelectorAll(".eliminarDelCarrito");
    botonEliminar.forEach((boton, index) => {
        boton.addEventListener('click', () => { 
        Swal.fire({
            title: 'Estas seguro?',
            text: "Tendras que elegirlo nuevamente en la tienda",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminalo'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Borrado!',
                'Tu producto ha sido eliminado',
                'success'
              )

              // borramos el articulo del carrito y del local storage
              Carrito.splice(index, 1);
              localStorage.setItem("carrito", JSON.stringify(Carrito));
              Carrito.forEach((e) => {
                divItems.innerHTML += ` 
                <section class="carritoDeCompras"> 
                <div class="cardProducto" >
                <h2> ${e.nombre}</h2>
                <img src="${e.imagen}" alt="">
                <h3>$ ${e.precio}</h3>
                <button class="eliminarDelCarrito">Eliminar</button>
                </div>
                </section>`
        
            })
            }
          })
        })
    })
})
// boton para reaparecer las cards de los productos en el index
botonProductos.addEventListener('click', ()=>{
    divItems.innerHTML = "";
    productos.forEach ((e)=>{
        divItems.innerHTML += `
                        
                        <div class="cardProducto">
                        <h2> ${e.nombre}</h2>
                        <img src="${e.imagen}" alt="">
                        <h3>$ ${e.precio}</h3>
                        <button class="agregarAlCarrito">Comprar</button>
                        </div>
                `;
        const botones = document.querySelectorAll(".agregarAlCarrito");
        botones.forEach((boton, index) => {
        boton.addEventListener('click', () => {
            Carrito.push(productos[index]);
            localStorage.setItem("carrito", JSON.stringify(Carrito));
        })
    })
})
})







