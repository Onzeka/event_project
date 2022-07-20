from api.models.utils import CursorPaginator
from api import ma,db
from api.schemas import MODEL_SCHEMA_MAPPER

from flask import current_app


from marshmallow import fields, post_dump, post_load, pre_load,validate
import jwt


class CursorPaginatorSchemaMeta(ma.Schema):     
    @pre_load
    def decode_cursor(self, page_params, **kwargs):
        
        if page_params["cursor"]:
            page_params["cursor"] = jwt.decode(page_params["cursor"],current_app.config["SECRET_KEY"],algorithms="HS256")
        return page_params
    
    @post_load
    def create_cursor_page_params(self,page_params,**kwargs):
        return CursorPaginator(**page_params,model=self.model)

    @post_dump
    def encode_cursor(self,data:dict,**kwargs):
        if data.pop("reached_end"):
            return None
        data['cursor'] = jwt.encode(data["cursor"],current_app.config["SECRET_KEY"],algorithm="HS256")  
        return data


    
def build_CursorPaginatorSchema(model):
    data_schema = MODEL_SCHEMA_MAPPER[model]
    class_attributes = {
        "page_size" : fields.Integer(validate=validate.Range(min=1,max=10),load_default=5),
        "direction" : fields.String(validate=validate.OneOf(["desc","asc"]),load_default="asc"),
        "reached_end" : fields.Boolean(dump_only=True),
        'order_by': fields.String(validate=validate.OneOf(model.__table__.columns),load_default='id'), #NOT SAFEEEEEEE !!!!!!!!!!!!!! Use the schema instead
        'cursor': fields.Nested(data_schema(partial=True),load_default=None),
        'model' : model
    }
    return type("CursorPaginator",(CursorPaginatorSchemaMeta,),class_attributes)