
from api import ma
from api.models import Token

class TokenSchema(ma.SQLAlchemySchema):
    class Meta:
        model=Token
        ordered = True

    access_token = ma.auto_field(required=True)
    refresh_token = ma.auto_field()
