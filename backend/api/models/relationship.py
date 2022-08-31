from api import db


events_saved_by_users = db.Table('saved_events', 
db.Column('user_id', db.Integer,db.ForeignKey('User.id')),
db.Column('event_id', db.Integer,db.ForeignKey('Event.id')))

