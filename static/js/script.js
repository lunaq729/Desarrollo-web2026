document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("pedidoForm");
    const nombreInput = document.getElementById("clienteNombre");
    const descInput = document.getElementById("pedidoDescripcion");
    const categoriaSelect = document.getElementById("pedidoCategoria");
    const listaPedidos = document.getElementById("listaPedidos");
    const totalRegistros = document.getElementById("totalRegistros");
    const alertaMensaje = document.getElementById("alertaMensaje");

    // Inicializar Modal de Bootstrap (SEMANA 8)
    const modalEliminar = new bootstrap.Modal(document.getElementById('modalEliminar'));
    let idAEliminar = null; 

    // Base de datos simulada (SEMANA 7)
    let baseDeDatosPedidos = [
        { id: 1, nombre: "Café Americano", categoria: "Bebida", descripcion: "Para llevar, sin azúcar." },
        { id: 2, nombre: "Tiramisú", categoria: "Repostería", descripcion: "Porción grande para consumir en el local." }
    ];
    let contadorId = 2; 

    const renderizarPedidos = () => {
        listaPedidos.innerHTML = "";
        
        if (baseDeDatosPedidos.length === 0) {
            listaPedidos.innerHTML = `<div class="col-12"><div class="alert alert-info text-center shadow-sm">No hay registros activos en este momento.</div></div>`;
            totalRegistros.textContent = `Total: 0`;
            return;
        }

        baseDeDatosPedidos.forEach((pedido) => {
            let badgeClass = "bg-secondary";
            if (pedido.categoria === "Bebida") badgeClass = "bg-primary";
            else if (pedido.categoria === "Repostería") badgeClass = "bg-warning text-dark";
            else if (pedido.categoria === "Desayuno") badgeClass = "bg-success";

            const col = document.createElement("div");
            col.className = "col-md-12 mb-2";
            col.innerHTML = `
                <div class="card shadow-sm border-0 border-start border-4 border-primary">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <h5 class="card-title fw-bold text-dark mb-0">${pedido.nombre}</h5>
                            <span class="badge ${badgeClass} rounded-pill">${pedido.categoria}</span>
                        </div>
                        <p class="card-text text-secondary mt-2 mb-3">${pedido.descripcion}</p>
                        <!-- Botón btn-outline-danger de Bootstrap -->
                        <button class="btn btn-outline-danger btn-sm fw-semibold shadow-sm" onclick="prepararEliminacion(${pedido.id})">
                            Eliminar Registro
                        </button>
                    </div>
                </div>
            `;
            listaPedidos.appendChild(col);
        });

        totalRegistros.textContent = `Total: ${baseDeDatosPedidos.length}`;
    };

    // LÓGICA DE MODAL Y SPINNER (SEMANA 8)
    window.prepararEliminacion = (id) => {
        idAEliminar = id;
        modalEliminar.show(); 
    };

    document.getElementById('btnConfirmarEliminacion').addEventListener('click', () => {
        const btnDelete = document.getElementById('btnConfirmarEliminacion');
        const spinner = document.getElementById('deleteSpinner');
        
        spinner.classList.remove('d-none');
        btnDelete.disabled = true;

        setTimeout(() => {
            baseDeDatosPedidos = baseDeDatosPedidos.filter(pedido => pedido.id !== idAEliminar);
            renderizarPedidos();
            modalEliminar.hide(); 
            
            spinner.classList.add('d-none');
            btnDelete.disabled = false;
        }, 1000); 
    });

    // VALIDACIONES DINÁMICAS (SEMANA 6)
    const validarNombre = () => {
        const valor = nombreInput.value.trim();
        if (/^[A-ZÁÉÍÓÚÑ][a-zA-ZáéíóúñÁÉÍÓÚÑ\s]{2,}$/.test(valor)) {
            nombreInput.classList.remove("is-invalid");
            nombreInput.classList.add("is-valid");
            return true;
        } else {
            nombreInput.classList.remove("is-valid");
            nombreInput.classList.add("is-invalid");
            return false;
        }
    };

    const validarCategoria = () => {
        if (categoriaSelect.value !== "") {
            categoriaSelect.classList.remove("is-invalid");
            categoriaSelect.classList.add("is-valid");
            return true;
        } else {
            categoriaSelect.classList.remove("is-valid");
            categoriaSelect.classList.add("is-invalid");
            return false;
        }
    };

    const validarDescripcion = () => {
        if (descInput.value.trim().length >= 10) {
            descInput.classList.remove("is-invalid");
            descInput.classList.add("is-valid");
            return true;
        } else {
            descInput.classList.remove("is-valid");
            descInput.classList.add("is-invalid");
            return false;
        }
    };

    nombreInput.addEventListener("input", validarNombre);
    nombreInput.addEventListener("blur", validarNombre);
    categoriaSelect.addEventListener("change", validarCategoria);
    categoriaSelect.addEventListener("blur", validarCategoria);
    descInput.addEventListener("input", validarDescripcion);
    descInput.addEventListener("blur", validarDescripcion);

    // LÓGICA DE SPINNER Y ALERTAS AL AGREGAR (SEMANA 8)
    form.addEventListener("submit", (e) => {
        e.preventDefault(); 

        const isNombreOk = validarNombre();
        const isCategoriaOk = validarCategoria();
        const isDescOk = validarDescripcion();

        if (isNombreOk && isCategoriaOk && isDescOk) {
            
            const btnSubmit = document.getElementById('btnSubmitForm');
            const submitSpinner = document.getElementById('submitSpinner');
            const btnSubmitText = document.getElementById('btnSubmitText');

            submitSpinner.classList.remove('d-none');
            btnSubmit.disabled = true;
            btnSubmitText.textContent = "Procesando...";

            setTimeout(() => {
                contadorId++;
                const nuevoPedido = {
                    id: contadorId,
                    nombre: nombreInput.value.trim(),
                    categoria: categoriaSelect.value,
                    descripcion: descInput.value.trim()
                };
                
                baseDeDatosPedidos.push(nuevoPedido); 
                renderizarPedidos(); 

                alertaMensaje.innerHTML = `<div class="alert alert-success alert-dismissible fade show shadow-sm"><strong>¡Perfecto!</strong> El registro fue agregado al sistema.</div>`;
                setTimeout(() => { alertaMensaje.innerHTML = ""; }, 3000);

                form.reset();
                nombreInput.classList.remove("is-valid", "is-invalid");
                categoriaSelect.classList.remove("is-valid", "is-invalid");
                descInput.classList.remove("is-valid", "is-invalid");

                submitSpinner.classList.add('d-none');
                btnSubmit.disabled = false;
                btnSubmitText.textContent = "Agregar al Sistema";

            }, 1200); 

        } else {
            alertaMensaje.innerHTML = `<div class="alert alert-danger alert-dismissible fade show shadow-sm"><strong>¡Atención!</strong> Verifique los errores en rojo antes de continuar.</div>`;
            setTimeout(() => { alertaMensaje.innerHTML = ""; }, 3000);
        }
    });

    renderizarPedidos();
});