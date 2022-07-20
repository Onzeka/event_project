from api.schemas.pagination.page_schema import build_PageSchema
from api.models import User,Event

MODEL_PAGINATED_SCHEMA_MAPPER = {
    Event : build_PageSchema(Event),
    User : build_PageSchema(User)
}