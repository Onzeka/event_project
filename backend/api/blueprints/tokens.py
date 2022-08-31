from os import access
from flask import Blueprint, request
from webargs.flaskparser import use_args,use_kwargs

from api import db
from api.auth import basic_auth
from api.schemas import TokenSchema
from api.models import Token

tokens = Blueprint('tokens',__name__)

token_schema = TokenSchema()

@tokens.route('/new',methods=['POST'])
@basic_auth.login_required
def new():
    user = basic_auth.current_user()
    token = Token.generate_token_for_user(user)
    db.session.add(token)
    db.session.commit()
    return token_schema.dump(token)

@tokens.route('/refresh',methods=['PUT'])
@use_kwargs(token_schema,location="json")
def refresh(access_token:str,refresh_token:str):
    token = Token.verify_refresh_token(access_token,refresh_token)
    token.expire()
    new_token = Token.generate_token_for_user(token.user)
    db.session.add_all([token,new_token])
    db.session.commit()
    return token_schema.dump(new_token)


@tokens.route('/revoke', methods=['DELETE'])
def revoke():
    access_token = request.headers['Authorization'].split()[1]
    token = Token.get_token_by_access_token(access_token)
    token.expire()
    db.session.commit()
    return {}

