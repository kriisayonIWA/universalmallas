document.addEventListener("DOMContentLoaded", function () {

    const relatedContainer = document.getElementById("related-products");

    if (!relatedContainer) return;


    // ==========================================
    // PRODUCTO ACTUAL
    // ==========================================

    const productoActualId = relatedContainer.dataset.productoId;


    // ==========================================
    // BUSCAR PRODUCTO ACTUAL EN productos.js
    // ==========================================

    const productoActual = productos.find(
        producto => producto.id === productoActualId
    );


    // Si no se encuentra el producto
    if (!productoActual) {

        relatedContainer.innerHTML = `
            <div class="col-12">
                <p>No se encontró el producto actual.</p>
            </div>
        `;

        return;
    }


    // ==========================================
    // CATEGORÍA DINÁMICA
    // ==========================================

    const categoriaRelacionada = productoActual.categoria;


    // ==========================================
    // CANTIDAD MÁXIMA DE PRODUCTOS
    // ==========================================

    const limiteProductos = 4;


    // ==========================================
    // BUSCAR PRODUCTOS RELACIONADOS
    // ==========================================

    const productosRelacionados = productos
        .filter(producto =>
            producto.categoria === categoriaRelacionada &&
            producto.id !== productoActualId &&
            producto.proximamente !== true
        )
        .slice(0, limiteProductos);


    // ==========================================
    // SI NO EXISTEN PRODUCTOS
    // ==========================================

    if (productosRelacionados.length === 0) {

        relatedContainer.innerHTML = `
            <div class="col-12">
                <p>No hay productos relacionados disponibles.</p>
            </div>
        `;

        return;
    }


    // ==========================================
    // GENERAR TARJETAS
    // ==========================================

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

                        <a href="../../../productos/${producto.categoria}/${producto.id}/index.html">

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

                            <a href="../../../productos/${producto.categoria}/${producto.id}/index.html">
                                ${producto.nombre}
                            </a>

                        </h4>


                        <!-- Cotizar / Ver producto -->
                        <div class="rr-fea-product__link-box">

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


        relatedContainer.insertAdjacentHTML(
            "beforeend",
            tarjeta
        );

    });

});


// ==========================================
// COMPARTIR PRODUCTO
// ==========================================

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