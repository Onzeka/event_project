from api import ma
from api.models.event import Event


class EventSchema(ma.SQLAlchemySchema):
    class Meta:
        model=Event
        ordered = True
    id = ma.auto_field()
    name = ma.auto_field()
