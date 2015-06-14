"""
The flask application package.
"""
import json

from flask import Flask
from flask.ext.login import LoginManager
from flask.ext.sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
from flask_oauthlib.client import OAuth

from config import cloudplatform
from config import sso_fb_consumer_key, sso_fb_consumer_secret
from config import sso_google_consumer_key, sso_google_consumer_secret
from config import SQLALCHEMY_DATABASE_URI
from config import SLACK_HANDLER_HOST, SLACK_HANDLER_URL, MAIL_USERNAME, MAIL_PASSWORD, MAIL_SERVER, MAIL_PORT, ADMINS

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

def log_format(text, icon='ghost', username=None, channel='#logging'):
    if username is None:
        username = cloudplatform
    return json.dumps({"icon_emoji": icon, "text": text, 
         "icon": icon, "username": username})


# Add Logging Errors if the app is not in debug mode
if not app.debug:
    import logging

    # Add SMTP Handler
    mail_handler = None

    from logging.handlers import SMTPHandler
    credentials = None
    if MAIL_SERVER and MAIL_SERVER != '':
        if MAIL_USERNAME and MAIL_PASSWORD:
            credentials = (MAIL_USERNAME, MAIL_PASSWORD)
        mail_handler = SMTPHandler((MAIL_SERVER, MAIL_PORT),
                                   MAIL_USERNAME+'@' + MAIL_SERVER, ADMINS,
                                   cloudplatform + ' failure', credentials)
        mail_handler.setLevel(logging.ERROR)

    # Add Slack Handler
    slack_handler = None

    from FlaskWebProject.httphandler import CustomHTTPHandler
    if SLACK_HANDLER_HOST and SLACK_HANDLER_HOST is not '':
        slack_handler = CustomHTTPHandler(
            SLACK_HANDLER_HOST, SLACK_HANDLER_URL
        )
        slack_handler.setLevel(logging.ERROR)

    # Add handlers to modules
    from logging import getLogger
    loggers = [app.logger, getLogger('sqlalchemy')]
    for logger in loggers:
        if mail_handler:
            logger.addHandler(mail_handler)
        if slack_handler:
            logger.addHandler(slack_handler)

import FlaskWebProject.views
import FlaskWebProject.models
