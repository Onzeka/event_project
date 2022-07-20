#typing
from __future__ import annotations
import typing
if typing.TYPE_CHECKING:
    from api.models.user import User


import os

from api import db
from api.models.relationship import events_saved_by_users




class Event(db.Model):
    __tablename__ = 'Event'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64),index=True,unique=True) #modifier unique=False
    begin_date = db.Column(db.DateTime,index=True)
    user_id = db.Column(db.Integer, db.ForeignKey('User.id'))
    picture_cover = db.Column(db.String(128))

    def __init__(self,*args,**kwargs) -> None:
        super().__init__(*args,**kwargs)
        self.images_dir = f'../images/events/{self.name}'
        os.mkdir(self.images_dir)
        
    def __repr__(self) -> str:
        return f'<Event {self.name}>'

    def to_dict(self)-> dict:
        data = {
            'id': self.id,
            'begin_date': self.begin_date,
            'user_id': self.user_id,
            'name': self.name,
            'cover_picture': self.cover_picture
        }
        return data
    
    #views
    @staticmethod
    def get_events_saved_by_user(user:User)-> list[Event]:
        return Event.query.join(
            events_saved_by_users, (events_saved_by_users.c.event_id == Event.id)
        ).filter(
            events_saved_by_users.c.user_id == user.id
        ).order_by(
            Event.begin_date.desc()
        ).all()

    @staticmethod
    def get_events(offset:int=0,limit:int=10):
        query_results = Event.query.offset(offset).limit(limit).all()
        return [query_result.to_dict() for query_result in query_results]