"""
The flask application package.
"""

from flask import Flask
from flask.ext.login import LoginManager
from flask.ext.sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
from flask_oauthlib.client import OAuth
from config import sso_fb_consumer_key
from config import sso_fb_consumer_secret
from config import sso_google_consumer_key
from config import sso_google_consumer_secret
from config import SQLALCHEMY_DATABASE_URI

app = Flask(__name__)
app.config.from_object('config')
db = SQLAlchemy(app)
lm = LoginManager()
lm.init_app(app)
lm.login_view = 'login'
oauth = OAuth()

# session for connection to database
dbEngine = create_engine(SQLALCHEMY_DATABASE_URI,pool_recycle=3600)

# ATT TODO everywhere in code, try to replace autoflush, with manual one? --good approach?
dbSession = scoped_session(sessionmaker(autocommit=False, bind=dbEngine)) 
#dbSession = Session()  # check if it is good to create the session with init

# Facebook OAuth2 Login Credentials
facebook = oauth.remote_app(
    'facebook',
    base_url='https://graph.facebook.com/',
    request_token_url=None,
    access_token_url='/oauth/access_token',
    authorize_url='https://www.facebook.com/dialog/oauth',
    consumer_key=sso_fb_consumer_key,
    consumer_secret=sso_fb_consumer_secret,
    request_token_params={'scope': 'email'}
)


# Google OAuth2 Login Credentials
google = oauth.remote_app(
    'google',
    request_token_params={
        'scope': 'https://www.googleapis.com/auth/userinfo.email'
    },
    base_url='https://www.googleapis.com/oauth2/v1/',
    request_token_url=None,
    access_token_method='POST',
    access_token_url='https://accounts.google.com/o/oauth2/token',
    authorize_url='https://accounts.google.com/o/oauth2/auth',
    consumer_key=sso_google_consumer_key,
    consumer_secret=sso_google_consumer_secret,
)


import FlaskWebProject.views
import FlaskWebProject.models
