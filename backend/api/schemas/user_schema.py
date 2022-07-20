from api import ma

from api.models import User
from marshmallow import validate, ValidationError,fields




def validate_username(username:str)-> None:
    if User.get_user_by_username(username) != None:
        raise ValidationError('This username already exist')

    

class UserSchema(ma.SQLAlchemySchema):
    class Meta:
        model = User
        ordered = True

    id  = ma.auto_field(dump_only=True)
    username = fields.String(
        required=True,
        validate=[
            validate.Length(min=3,max=64,error="username must contain between 3 and 64 characters"),
            validate_username
        ]
        )
    password = fields.String(required=True,load_only=True, validate = validate.Length(min=3))

