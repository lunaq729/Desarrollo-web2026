from flask import Flask, render_template, redirect, url_for
from forms.producto_form import ProductoForm
from forms.cliente_form import ClienteForm
from forms.proveedor_form import ProveedorForm
from forms.facturacion_form import FacturacionForm

app = Flask(__name__)
# CLAVE SECRETA PARA PROTECCIÓN CSRF (SEMANA 11)
app.config['SECRET_KEY'] = 'mi_clave_secreta_super_segura_2026'

# --- DATOS SIMULADOS ---
datos_productos = [
    {"id": 1, "nombre": "Café Americano", "descripcion": "Café negro tradicional, ideal para despertar.", "precio": 1.50, "disponible": True}
]
datos_clientes = [
    {"nombre": "Juan Pérez", "correo": "juan@email.com", "frecuente": True}
]
datos_proveedores = [
    {"empresa": "CaféEcuador S.A.", "insumo": "Granos de café tostado"}
]
datos_facturas = [
    {"numero": "FAC-001", "cliente": "Juan Pérez", "total": 4.50}
]

# --- RUTAS DE LISTADOS (SEMANA 10) ---
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/productos')
def productos():
    return render_template('productos.html', productos=datos_productos)

@app.route('/clientes')
def clientes():
    return render_template('clientes.html', clientes=datos_clientes)

@app.route('/proveedores')
def proveedores():
    return render_template('proveedores.html', proveedores=datos_proveedores)

@app.route('/facturacion')
def facturacion():
    return render_template('facturacion.html', facturas=datos_facturas)

# --- RUTAS DE FORMULARIOS (SEMANA 11) ---
@app.route('/productos/nuevo', methods=['GET', 'POST'])
def nuevo_producto():
    form = ProductoForm()
    if form.validate_on_submit():
        nuevo_id = len(datos_productos) + 1
        datos_productos.append({
            "id": nuevo_id,
            "nombre": form.nombre.data,
            "descripcion": form.descripcion.data,
            "precio": form.precio.data,
            "disponible": form.disponible.data
        })
        return redirect(url_for('productos'))
    return render_template('formulario_producto.html', form=form)

@app.route('/clientes/nuevo', methods=['GET', 'POST'])
def nuevo_cliente():
    form = ClienteForm()
    if form.validate_on_submit():
        datos_clientes.append({
            "nombre": form.nombre.data,
            "correo": form.correo.data,
            "frecuente": form.frecuente.data
        })
        return redirect(url_for('clientes'))
    return render_template('formulario_cliente.html', form=form)

@app.route('/proveedores/nuevo', methods=['GET', 'POST'])
def nuevo_proveedor():
    form = ProveedorForm()
    if form.validate_on_submit():
        datos_proveedores.append({
            "empresa": form.empresa.data,
            "insumo": form.insumo.data
        })
        return redirect(url_for('proveedores'))
    return render_template('formulario_proveedor.html', form=form)

@app.route('/facturacion/nueva', methods=['GET', 'POST'])
def nueva_facturacion():
    form = FacturacionForm()
    if form.validate_on_submit():
        datos_facturas.append({
            "numero": form.numero.data,
            "cliente": form.cliente.data,
            "total": form.total.data
        })
        return redirect(url_for('facturacion'))
    return render_template('formulario_facturacion.html', form=form)

if __name__ == '__main__':
    app.run(debug=True)