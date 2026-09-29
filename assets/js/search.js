document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("popup-search");
    const searchForm = document.getElementById("search-form");
    const searchResults = document.getElementById("search-results");

    if (!searchInput || !searchResults) {
        return;
    }

    // =========================================================
    // RESOLVER RUTA
    // Convierte las rutas del search-data.js en rutas correctas
    // desde la raíz del proyecto "universalmallas"
    // =========================================================
    function resolverRuta(url) {

        const rutaActual = window.location.pathname;

        const indiceProyecto = rutaActual.indexOf("/universalmallas/");

        if (indiceProyecto === -1) {
            return url;
        }

        const raizProyecto = rutaActual.substring(
            0,
            indiceProyecto + "/universalmallas/".length
        );

        return raizProyecto + url;
    }


    // =========================================================
    // NORMALIZAR TEXTO
    // Permite buscar con o sin tildes
    // =========================================================
    function normalizeText(text) {

        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

    }


    // =========================================================
    // BUSCAR PRODUCTOS
    // =========================================================
    function searchProducts(query) {

        const normalizedQuery = normalizeText(query.trim());

        if (!normalizedQuery) {

            searchResults.innerHTML = "";
            searchResults.style.display = "none";

            return [];

        }

        const results = searchData.filter(item => {

            const title = normalizeText(item.titulo);
            const description = normalizeText(item.descripcion);

            const keywords = item.keywords
                .map(keyword => normalizeText(keyword))
                .join(" ");

            return (
                title.includes(normalizedQuery) ||
                description.includes(normalizedQuery) ||
                keywords.includes(normalizedQuery)
            );

        });

        return results;

    }


    // =========================================================
    // MOSTRAR RESULTADOS
    // =========================================================
    function showResults(results) {

        searchResults.innerHTML = "";

        if (results.length === 0) {

            searchResults.innerHTML = `
                <div class="search-no-results">
                    No encontramos resultados para tu búsqueda.
                </div>
            `;

            searchResults.style.display = "block";

            return;

        }


        results.forEach(item => {

            const result = document.createElement("a");

            // AQUÍ ESTÁ EL CAMBIO IMPORTANTE
            result.href = resolverRuta(item.url);

            result.className = "search-result-item";

            result.innerHTML = `
                <div class="search-result-content">
                    <h4>${item.titulo}</h4>
                    <p>${item.descripcion}</p>
                </div>
            `;

            searchResults.appendChild(result);

        });

        searchResults.style.display = "block";

    }


    // =========================================================
    // BUSCAR MIENTRAS ESCRIBE
    // =========================================================
    searchInput.addEventListener("input", function () {

        const results = searchProducts(this.value);

        showResults(results);

    });


    // =========================================================
    // ENVIAR FORMULARIO
    // =========================================================
    searchForm?.addEventListener("submit", function (event) {

        event.preventDefault();

        const results = searchProducts(searchInput.value);

        if (results.length > 0) {

            // AQUÍ TAMBIÉN ESTÁ EL CAMBIO IMPORTANTE
            window.location.href = resolverRuta(results[0].url);

        }

    });

});