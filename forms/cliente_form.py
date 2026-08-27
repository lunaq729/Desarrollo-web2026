from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, SubmitField
from wtforms.validators import DataRequired, Length, Email

class ClienteForm(FlaskForm):
    nombre = StringField('Nombre del Cliente', validators=[DataRequired(message="El nombre es obligatorio."), Length(min=3, max=50)])
    correo = StringField('Correo Electrónico', validators=[DataRequired(message="El correo es obligatorio."), Email(message="Ingresa un correo válido.")])
    frecuente = BooleanField('¿Es cliente frecuente?')
    submit = SubmitField('Registrar Cliente')