const contenido = document.getElementById("contenido");
const enlace = document.querySelectorAll("nav a");
enlace.forEach(enlace => {
    enlace.addEventListener("click", function(event){
        event.preventDefault();
        const pagina =this.dataset.pagina;
        cargarPagina(pagina);
    });
});
async function cargarPagina(pagina) {
    try {
        const respuesta= await fetch(`paginas/${pagina}.html`);
        if (!respuesta.ok){
            throw new Error("No se pudo cargar la pagina")           
        }
        const html = await respuesta.text();
        contenido.innerHTML=html;
        if(pagina == "inicio"){
            cargarEmpresa();
        }
        if (pagina == "productos"){
            cargarProductos();
        }
    } catch (error) {
        contenido.innerHTML=`<section class="error">
            <h2>Error al carga la pagina</h2>
        </section>`;
    }
}
async function cargarEmpresa() {
    try {
        const respuesta = await fetch("datos/empresa.json");
        const empresa = await respuesta.json();
        document.getElementById("nombreEmpresa").textContent =
            empresa.nombre;
        document.getElementById("descripcionEmpresa").textContent =
            empresa.descripcion;
        document.getElementById("mision").textContent =
            empresa.mision;
        document.getElementById("vision").textContent =
            empresa.vision;
        const listaObjetivos =
            document.getElementById("objetivos");
        listaObjetivos.innerHTML = "";
        empresa.objetivos.forEach(objetivo => {
            const li = document.createElement("li");
            li.textContent = objetivo;
            listaObjetivos.appendChild(li);
        });
    } catch (error) {
        console.error("Error cargando empresa:", error);
    }
}
async function cargarProductos() {

    try {

        const respuesta = await fetch("datos/productos.json");

        if (!respuesta.ok) {
            throw new Error("No se pudo cargar el archivo productos.json");
        }

        const productos = await respuesta.json();

        const contenedor =
            document.getElementById("listaProducto");

        contenedor.innerHTML = "";

        // Mostrar máximo 6 productos
        productos.slice(0, 10).forEach(producto => {

            const tarjeta =
                document.createElement("article");

            tarjeta.classList.add("tarjeta-producto");

            tarjeta.innerHTML = `
                <div class="imagen-producto">
                    <img 
                        src="${producto.imagen}" 
                        alt="${producto.nombre}"
                    >
                </div>

                <div class="contenido-producto">

                    <h2>${producto.nombre}</h2>

                    <p>
                        ${producto.descripcion}
                    </p>

                    <div class="producto-pie">

                        <strong>
                            $${Number(producto.precio).toFixed(2)}
                        </strong>

                        <button>
                            Ver producto
                        </button>

                    </div>

                </div>
            `;

            contenedor.appendChild(tarjeta);
        });

    } catch (error) {

        console.error(
            "Error cargando productos:",
            error
        );

    }
}