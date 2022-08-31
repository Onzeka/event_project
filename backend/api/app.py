from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_marshmallow import Marshmallow



db = SQLAlchemy()
migrate = Migrate()
ma = Marshmallow()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    db.init_app(app)
    migrate.init_app(app,db)
    ma.init_app(app)


    
    from api import models
    from api.blueprints.events import events
    app.register_blueprint(events)
    from api.blueprints.fake import fake
    app.register_blueprint(fake)
    from api.blueprints import tokens
    app.register_blueprint(tokens,url_prefix='/api/tokens')
    from api.blueprints import users
    app.register_blueprint(users,url_prefix='/api/users')

    @app.shell_context_processor
    def shell_context():
        ctx = {'db':db}
        for attr in dir(models):
            model = getattr(models,attr)
            if hasattr(model,'__bases__') and db.Model in getattr(model, '__bases__'):
                ctx[attr] = model
        return ctx
    
    return app

