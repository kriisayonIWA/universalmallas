document.addEventListener("DOMContentLoaded", function () {

    const relatedContainer = document.getElementById("related-products");

    if (!relatedContainer) return;

    // Producto actual
    const productoActualId = relatedContainer.dataset.productoId;

    // Categoría de productos relacionados
    const categoriaRelacionada = "mallas-metalicas";

    // Cantidad máxima de productos
    const limiteProductos = 4;

    // Buscar productos relacionados
    const productosRelacionados = productos
        .filter(producto =>
            producto.categoria === categoriaRelacionada &&
            producto.id !== productoActualId &&
            producto.proximamente !== true
        )
        .slice(0, limiteProductos);


    // Si no existen productos
    if (productosRelacionados.length === 0) {
        relatedContainer.innerHTML = `
            <div class="col-12">
                <p>No hay productos relacionados disponibles.</p>
            </div>
        `;

        return;
    }


    // Generar tarjetas
    productosRelacionados.forEach(producto => {

        const mensajeWhatsApp =
            `Hola Universal Mallas S.A.C., deseo cotizar ${producto.nombre}`;

        const urlWhatsApp =
            `https://wa.me/51927782207?text=${encodeURIComponent(mensajeWhatsApp)}`;


        const tarjeta = `
            <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6">

                <div class="rr-fea-product__item rr-pro-img mb-30">

                    <!-- Imagen -->
                    <div class="rr-fea-product__thumb fix p-relative">

                        <a href="../../../productos/${producto.id}/">

                            <img
                                src="../../../${producto.imagen}"
                                alt="${producto.alt}"
                                class="img-fluid"
                            >

                        </a>

                        

                    </div>


                    <!-- Información -->
                    <div class="rr-fea-product__content">

                        <h4 class="rr-fea-product__title-sm">

                            <a href="../../../productos/${producto.id}/">
                                ${producto.nombre}
                            </a>

                        </h4>


                      


                        <!-- Cotizar -->
                        <div class="rr-fea-product__link-box ">

                            <a
                                href="../../../productos/${producto.categoria}/${producto.id}/index.html"
                                class="cart-button icon-btn button rr-btn-cart mt-30"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                            

                                <span></span>

                                Ver producto

                            </a>

                        </div>

                    </div>

                </div>

            </div>
        `;


        relatedContainer.insertAdjacentHTML("beforeend", tarjeta);

    });

});


// Compartir producto
function compartirProducto(event, nombre, id) {

    event.preventDefault();

    const url =
        `${window.location.origin}/productos/${id}/`;

    if (navigator.share) {

        navigator.share({
            title: nombre,
            text: `Conoce ${nombre} en Universal Mallas S.A.C.`,
            url: url
        });

    } else {

        navigator.clipboard.writeText(url);

        alert("Enlace copiado al portapapeles");

    }

}