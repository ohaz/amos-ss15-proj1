"""
The flask application package.
"""

from flask import Flask
from flask.ext.login import LoginManager
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.bcrypt import Bcrypt
from flask_oauth import OAuth
from config import sso_fb_consumer_key
from config import sso_fb_consumer_secret

app = Flask(__name__)
app.config.from_object('config')
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
lm = LoginManager()
lm.init_app(app)
lm.login_view = 'login'
oauth = OAuth()

facebook = oauth.remote_app('facebook',
    base_url='https://graph.facebook.com/',
    request_token_url=None,
    access_token_url='/oauth/access_token',
    authorize_url='https://www.facebook.com/dialog/oauth',
    consumer_key=sso_fb_consumer_key,
    consumer_secret=sso_fb_consumer_secret,
    request_token_params={'scope': 'email'}
)

import FlaskWebProject.views
import FlaskWebProject.models
