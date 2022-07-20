from flask import Blueprint
from api.models.event import Event

page_size = 3
events = Blueprint('events',__name__)


@events.route('/explore',methods=['GET'])
def explore_events(page:int=1):
    offset = (page-1)*page_size
    limit = page*page_size
    return {'data':Event.get_events(offset,limit)}