#typing
from __future__ import annotations
import typing
from typing import Union
if typing.TYPE_CHECKING:
    from api.models.event import User

from api import db


from flask import current_app

import secrets
from datetime import datetime, timedelta

#OAuth2

class Token(db.Model):
    __tablename__ = 'Token'

    id = db.Column(db.Integer,primary_key = True)
    
    access_token = db.Column(db.String(64),nullable=False,index=True)
    access_expiration = db.Column(db.DateTime,nullable=False)

    refresh_token = db.Column(db.String(64),nullable=False, index=True)
    refresh_expiration = db.Column(db.DateTime,nullable=False)

    user_id = db.Column(db.Integer,db.ForeignKey('User.id'))

    #relationships
    user = db.relationship('User',back_populates = 'tokens')


    def generate(self):

        self.access_token = secrets.token_urlsafe()
        self.access_expiration = datetime.utcnow() + timedelta(minutes = current_app.config['ACCESS_TOKEN_MINUTES'])

        self.refresh_token = secrets.token_urlsafe()
        self.refresh_expiration = datetime.utcnow() + timedelta(days = current_app.config['REFRESH_TOKEN_DAYS'])

    def expire(self):
        self.access_expiration = datetime.utcnow()
        self.refresh_expiration = datetime.utcnow()
    
    @staticmethod
    def generate_token_for_user(user:User):
        token = Token(user=user)
        token.generate()
        return token

    @staticmethod
    def remove_expired():
        yesterday = datetime.utcnow() - timedelta(days=1)
        Token.filter(Token.refresh_expiration < yesterday).delete()

    @staticmethod
    def revoke_user_tokens(user:User)->None:
        Token.query.filter(Token.user == user).delete()
    
    @staticmethod
    def verify_refresh_token(access_token:str,refresh_token:str)->Union[Token,None]:
        token = Token.query.filter(Token.access_token == access_token,Token.refresh_token == refresh_token)
        if token:
            if token.refresh_expiration > datetime.utcnow():
                return token
            Token.revoke_user_tokens(token.user)
            db.session.commit()
    
    @staticmethod
    def get_token_by_access_token(access_token:str)->Token:
        return Token.query.filter(Token.access_token == access_token)



