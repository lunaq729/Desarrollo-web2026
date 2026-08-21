document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("pedidoForm");
    const nombreInput = document.getElementById("clienteNombre");
    const descInput = document.getElementById("pedidoDescripcion");
    const categoriaSelect = document.getElementById("pedidoCategoria");
    const listaPedidos = document.getElementById("listaPedidos");
    const totalRegistros = document.getElementById("totalRegistros");
    const alertaMensaje = document.getElementById("alertaMensaje");

    let contador = 0;

    // Validación Nombre: Debe iniciar con MAYÚSCULA y mínimo 3 letras
    const validarNombre = () => {
        const valor = nombreInput.value.trim();
        const esValido = /^[A-ZÁÉÍÓÚÑ][a-zA-ZáéíóúñÁÉÍÓÚÑ\s]{2,}$/.test(valor);
        
        if (esValido) {
            nombreInput.classList.remove("is-invalid");
            nombreInput.classList.add("is-valid");
        } else {
            nombreInput.classList.remove("is-valid");
            nombreInput.classList.add("is-invalid");
        }
        return esValido;
    };

    // Validación Categoría: Debe seleccionar una opción
    const validarCategoria = () => {
        const esValido = categoriaSelect.value !== "";
        if (esValido) {
            categoriaSelect.classList.remove("is-invalid");
            categoriaSelect.classList.add("is-valid");
        } else {
            categoriaSelect.classList.remove("is-valid");
            categoriaSelect.classList.add("is-invalid");
        }
        return esValido;
    };

    // Validación Descripción: Mínimo 10 caracteres
    const validarDescripcion = () => {
        const valor = descInput.value.trim();
        const esValido = valor.length >= 10;
        if (esValido) {
            descInput.classList.remove("is-invalid");
            descInput.classList.add("is-valid");
        } else {
            descInput.classList.remove("is-valid");
            descInput.classList.add("is-invalid");
        }
        return esValido;
    };

    // Eventos de validación inmediata mientras el usuario escribe o cambia la opción
    nombreInput.addEventListener("input", validarNombre);
    categoriaSelect.addEventListener("change", validarCategoria);
    descInput.addEventListener("input", validarDescripcion);

    // Evento Submit del Formulario
    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Evita que la página se recargue

        const isNombreOk = validarNombre();
        const isCategoriaOk = validarCategoria();
        const isDescOk = validarDescripcion();

        // Si algún campo no pasa la validación, muestra alerta de error y detiene el proceso
        if (!isNombreOk || !isCategoriaOk || !isDescOk) {
            alertaMensaje.innerHTML = `
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    Revisa los campos marcados en rojo. Recuerda usar mayúscula inicial en el nombre y mínimo 10 caracteres en la descripción.
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                </div>`;
            return;
        }

        // Si pasa todas las validaciones, registra el ítem
        contador++;
        totalRegistros.textContent = `Total de registros actuales: ${contador}`;

        const col = document.createElement("div");
        col.className = "col-12 mb-2";
        col.innerHTML = `
            <div class="card shadow-sm border-warning p-3">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <h5 class="card-title fw-bold text-dark m-0">${contador}. ${nombreInput.value.trim()}</h5>
                    <span class="badge bg-warning text-dark">${categoriaSelect.value}</span>
                </div>
                <p class="card-text text-secondary mb-3">${descInput.value.trim()}</p>
                <div>
                    <button class="btn btn-danger btn-sm btn-eliminar">Eliminar</button>
                </div>
            </div>
        `;

        // Evento para eliminar registro dinámicamente
        col.querySelector(".btn-eliminar").addEventListener("click", () => {
            col.remove();
            contador--;
            totalRegistros.textContent = `Total de registros actuales: ${contador}`;
        });

        listaPedidos.appendChild(col);

        // Mensaje de éxito
        alertaMensaje.innerHTML = `
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                ¡Registro guardado correctamente!
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>`;

        // Limpieza de campos y estados de Bootstrap
        form.reset();
        nombreInput.classList.remove("is-valid", "is-invalid");
        categoriaSelect.classList.remove("is-valid", "is-invalid");
        descInput.classList.remove("is-valid", "is-invalid");

        setTimeout(() => { alertaMensaje.innerHTML = ""; }, 3000);
    });
});