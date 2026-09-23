document.addEventListener("DOMContentLoaded", function () {

    const container = document.getElementById("productos-container");

    if (!container) {
        return;
    }

    const rutaActual = window.location.pathname;

    let categoria = "";

    if (rutaActual.includes("mallas-metalicas")) {
        categoria = "mallas-metalicas";
    }

    if (rutaActual.includes("mallas-electrosoldadas")) {
        categoria = "mallas-electrosoldadas";
    }

    if (rutaActual.includes("planchas-metalicas")) {
        categoria = "planchas-metalicas";
    }

    if (rutaActual.includes("alambres-puas")) {
        categoria = "alambres-puas";
    }

    if (rutaActual.includes("gaviones")) {
        categoria = "gaviones";
    }

    if (rutaActual.includes("plasticos-accesorios")) {
        categoria = "plasticos-accesorios";
    }

    const productosCategoria = productos.filter(
        producto => producto.categoria === categoria
    );

    container.innerHTML = productosCategoria.map(producto => {

        return `

            <div class="col-xl-4 col-lg-4 col-md-6">

                <div class="rr-fea-product__item rr-pro-img">

                    <div class="rr-fea-product__thumb fix p-relative">

                        <img
                            src="../../${producto.imagen}"
                            alt="${producto.alt}"
                        >

                        <div class="rr-fea-product__icon-box rr-product-action">

                            <div class="product-action-btn">

                                <a
                                    href="#"
                                    class="icon-btn"
                                    aria-label="Solicitar cotización de ${producto.nombre}"
                                >
                                    <i class="fa-solid fa-plus"></i>
                                </a>

                            </div>

                        </div>

                    </div>

                    <div class="rr-fea-product__content">

                        <h2 class="rr-fea-product__title-sm">

                            <a href="#">
                                ${producto.nombre}
                            </a>

                        </h2>

                        <p>
                            ${producto.descripcion}
                        </p>

                        <div class="rr-fea-product__link-box">

                            <a
                                href="https://wa.me/51927782207?text=Hola%20Universal%20Mallas%20S.A.C.%20,%20deseo%20cotizar%20${encodeURIComponent(producto.nombre)}"
                                class="cart-button icon-btn button rr-btn-cart"
                                target="_blank"
                            >
                                <span></span>
                                Cotizar
                            </a>

                        </div>

                    </div>

                </div>

            </div>

        `;

    }).join("");

});