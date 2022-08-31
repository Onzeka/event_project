

import sys
from api.blueprints.decorators import response
from flask import Blueprint
from webargs.flaskparser import use_kwargs,use_args

from api import db
from api.models import User, Event
from api.models.utils import CursorPaginator
from api.schemas import UserSchema
from api.auth import token_auth
from api.schemas.pagination import MODEL_PAGINATED_SCHEMA_MAPPER
from api.schemas import MODEL_SCHEMA_MAPPER


users = Blueprint('user',__name__)

user_schema = MODEL_SCHEMA_MAPPER[User]()
paginated_user_schema = MODEL_PAGINATED_SCHEMA_MAPPER[User]()
paginated_event_schema = MODEL_PAGINATED_SCHEMA_MAPPER[Event]()

@users.route('/new',methods=['POST'])
@use_kwargs(user_schema)
def new(username:str,password:str):
    user = User(username=username,password=password)
    db.session.add(user)
    db.session.commit(user)
    return user_schema.dump(user)

@users.route('/<int:id>', methods=['GET'])
def get_user_by_id(id:int):
    user = User.query.get(id)
    return user_schema.dump(user)


@users.route('/<username>',methods=['GET'])
def get_user_by_username(username:str):
    user = User.get_user_by_username(username)
    return user_schema.dump(user)

@users.route('/me',methods=['GET'])
@token_auth.login_required
def get_current_user():
    user = token_auth.current_user()
    return user_schema.dump(user)



@users.route('me/events_saved')
@token_auth.login_required
@use_kwargs(paginated_event_schema,location='query')
@response(paginated_event_schema)
def get_events_saved(cursor_paginator:CursorPaginator):
    user = token_auth.current_user()
    query = user.events_saved
    data = cursor_paginator.get_paginated_result(query)
    return {"data":data,"cursor_paginator":cursor_paginator}

    






