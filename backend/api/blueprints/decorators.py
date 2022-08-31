from marshmallow import Schema
import functools


def response(schema:Schema):
    def decorator(f):
        @functools.wraps(f)
        def format_response(*args,**kwargs):
            return schema.dump(f(*args,**kwargs))
        return format_response
    return decorator