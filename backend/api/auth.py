from faulthandler import disable
from typing import Union
from flask_httpauth import HTTPBasicAuth,HTTPTokenAuth
from flask import current_app


from api.models import User


basic_auth = HTTPBasicAuth()
token_auth = HTTPTokenAuth()


@basic_auth.verify_password
def verify_password(username:str,password:str) -> Union[User,None]:
    if username and password:
        user = User.query.filter_by(username=username).scalar()
        if user and user.verify_password(password):
            return user
            
@token_auth.verify_token
def verify_token(access_token:str):
    if current_app.config["DISABLE_AUTH"]:
        return User.get_user_by_id(1)
    if access_token:
        return User.get_user_from_token(access_token)