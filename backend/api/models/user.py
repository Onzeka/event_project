#typing
from __future__ import annotations
from datetime import datetime
import typing
if typing.TYPE_CHECKING:
    from api.models import Event,Token


from api import db
from api.models import events_saved_by_users

import os
from werkzeug.security import generate_password_hash, check_password_hash




class User(db.Model):
    __tablename__ = 'User'
    #key
    id = db.Column(db.Integer, primary_key=True)

    #to create
    username = db.Column(db.String(64),index=True,unique=True)
    password_hash = db.Column(db.String(128))


    picture_profile_link = db.Column(db.String(128))

    #relationships
    organized_events = db.relationship('Event', backref='organizer', lazy='dynamic')
    events_saved = db.relationship('Event', secondary=events_saved_by_users, backref = db.backref('users_interested',lazy='dynamic'), lazy='dynamic')
    tokens = db.relationship('Token',back_populates='user')


    def __repr__(self) -> str:
        return f'<User {self.username}>'

    @property
    def password(self) -> None:
        raise AttributeError('password attribute is not readable')

    @password.setter
    def password(self,password:str) -> None:
        self.password_hash = generate_password_hash(password)

    def verify_password(self,password:str) -> bool:
        return check_password_hash(self.password_hash,password)
    
    #relation modifiers
    ##events
    def has_saved(self,event:Event)-> True:
        return self.events_saved.filter(events_saved_by_users.c.event_id == event.id).count() > 0
        
    def save_event(self,event:Event) -> None:
        if not self.has_saved(event):
            self.events_saved.append(event)
    def unsave_event(self,event:Event) -> None:
        if self.has_saved(event):
            self.events_saved.remove(event)
    
    
    
    #views
    @staticmethod
    def get_user_by_username(username:str)->User:
        return User.query.filter(User.username == username).scalar()

    @staticmethod
    def get_user_by_id(id:int)->User:
        return User.query.get(id)

    @staticmethod
    def get_user_from_token(access_token:str)->User:
        token:Token = Token.query.filter(Token.access_token==access_token).scalar()
        if token:
            if token.access_expiration > datetime.utcnow():
                return token.user
    
    

