
from api.models.event import Event
from api.models.token import Token
from api.models.user import User
from api.schemas.event_schema import EventSchema

from api.schemas.user_schema import UserSchema
from api.schemas.token_schema import TokenSchema

MODEL_SCHEMA_MAPPER={
    User: UserSchema,
    Token: TokenSchema,
    Event: EventSchema
}


