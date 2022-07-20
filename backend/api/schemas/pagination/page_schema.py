from api.schemas import MODEL_SCHEMA_MAPPER
from api.schemas.pagination.cursor_paginator_schema import build_CursorPaginatorSchema
from api import ma

from marshmallow import fields, post_dump, pre_load
from urllib.parse import urlencode
from flask import request
import sys




class PageSchemaMeta(ma.Schema):
    @pre_load
    def preprocess(self,data,**kwargs):
        cursor_paginator_keys = self.load_fields['cursor_paginator'].schema.load_fields.keys()
        return {'cursor_paginator': {key : data.get(key) for key in cursor_paginator_keys}}
    @post_dump
    def format(self,paginated_data,**kwargs):
        data,page_params = paginated_data['data'],paginated_data["cursor_paginator"]
        next_page = None if page_params == None else request.base_url +'?'+urlencode(page_params)
        return {'data':data, 'next_page': next_page}

def build_PageSchema(model):
    data_schema = MODEL_SCHEMA_MAPPER[model]
    class_attributes = {
        "cursor_paginator" : fields.Nested(build_CursorPaginatorSchema(model)()),
        "data" : fields.Nested(data_schema(many=True),dump_only=True)
    }
    return type("PageSchema",(PageSchemaMeta,), class_attributes)
    

