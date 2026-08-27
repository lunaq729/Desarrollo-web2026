from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, BooleanField, SubmitField, TextAreaField
from wtforms.validators import DataRequired, Length, NumberRange

class ProductoForm(FlaskForm):
    nombre = StringField('Nombre del Producto', validators=[DataRequired(message="El nombre es obligatorio."), Length(min=3, max=50)])
    descripcion = TextAreaField('Descripción', validators=[DataRequired(message="Agrega una descripción."), Length(min=10, max=200)])
    precio = FloatField('Precio ($)', validators=[DataRequired(message="Ingresa un precio válido."), NumberRange(min=0.1)])
    disponible = BooleanField('¿Está disponible?')
    submit = SubmitField('Guardar Producto')