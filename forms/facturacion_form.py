from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, SubmitField
from wtforms.validators import DataRequired, NumberRange

class FacturacionForm(FlaskForm):
    numero = StringField('Número de Factura (Ej. FAC-003)', validators=[DataRequired(message="El número es obligatorio.")])
    cliente = StringField('Nombre del Cliente', validators=[DataRequired(message="El nombre del cliente es obligatorio.")])
    total = FloatField('Total a Pagar ($)', validators=[DataRequired(message="Ingresa el total."), NumberRange(min=0.1)])
    submit = SubmitField('Generar Factura')