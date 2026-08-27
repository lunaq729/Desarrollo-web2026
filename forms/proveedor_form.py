from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, Length

class ProveedorForm(FlaskForm):
    empresa = StringField('Nombre de la Empresa', validators=[DataRequired(message="La empresa es obligatoria."), Length(min=2, max=50)])
    insumo = StringField('Insumo Principal', validators=[DataRequired(message="Debes especificar el insumo."), Length(min=3, max=100)])
    submit = SubmitField('Añadir Proveedor')