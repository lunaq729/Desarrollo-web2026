document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("pedidoForm");
    const listaPedidos = document.getElementById("listaPedidos");
    const totalRegistros = document.getElementById("totalRegistros");
    const alertaMensaje = document.getElementById("alertaMensaje");

    let contador = 0;

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Evita que la página se recargue

        const nombre = document.getElementById("clienteNombre").value.trim();
        const categoria = document.getElementById("pedidoCategoria").value;
        const descripcion = document.getElementById("pedidoDescripcion").value.trim();

        if (nombre === "" || descripcion === "") {
            mostrarAlerta("Por favor, completa todos los campos obligatorios.", "danger");
            return;
        }

        mostrarAlerta("¡Pedido o solicitud registrada con éxito!", "success");

        contador++;
        actualizarContador();

        // Crear elementos usando createElement
        const colDiv = document.createElement("div");
        colDiv.className = "col-md-12 mb-2";

        const cardDiv = document.createElement("div");
        cardDiv.className = "card card-custom shadow-sm p-3 border-warning";

        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        const title = document.createElement("h5");
        title.className = "card-title fw-bold text-dark";
        title.textContent = `${contador}. ${nombre}`;

        const subtitle = document.createElement("h6");
        subtitle.className = "card-subtitle mb-2 text-muted";
        subtitle.textContent = `Categoría: ${categoria}`;

        const text = document.createElement("p");
        text.className = "card-text text-secondary mb-2";
        text.textContent = descripcion;

        const btnEliminar = document.createElement("button");
        btnEliminar.className = "btn btn-danger btn-sm";
        btnEliminar.textContent = "Eliminar Registro";

        // Usar addEventListener para el evento click de eliminación
        btnEliminar.addEventListener("click", () => {
            colDiv.remove();
            contador--;
            actualizarContador();
        });

        // Usar appendChild para ensamblar la estructura
        cardBody.appendChild(title);
        cardBody.appendChild(subtitle);
        cardBody.appendChild(text);
        cardBody.appendChild(btnEliminar);
        cardDiv.appendChild(cardBody);
        colDiv.appendChild(cardDiv);

        listaPedidos.appendChild(colDiv);

        form.reset();
    });

    function actualizarContador() {
        totalRegistros.textContent = `Total de registros actuales: ${contador}`;
    }

    function mostrarAlerta(mensaje, tipo) {
        alertaMensaje.innerHTML = `<div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
            ${mensaje}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
        
        setTimeout(() => {
            alertaMensaje.innerHTML = "";
        }, 3000);
    }
});