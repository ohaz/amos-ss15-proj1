"""
The flask application package.
"""
import json

from flask import Flask
from flask.ext.login import LoginManager
from flask.ext.sqlalchemy import SQLAlchemy
import requests
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
from flask_oauthlib.client import OAuth
from config import sso_fb_consumer_key, MAIL_USERNAME, MAIL_PASSWORD, MAIL_SERVER, MAIL_PORT, ADMINS, cloudplatform
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

# Add SMTPHandler for Logging Errors if the app is not in debug mode
if not app.debug:
    import logging
    from logging.handlers import SMTPHandler
    credentials = None
    if MAIL_USERNAME or MAIL_PASSWORD:
        credentials = (MAIL_USERNAME, MAIL_PASSWORD)
    mail_handler = SMTPHandler((MAIL_SERVER, MAIL_PORT),
                               'no-reply@' + MAIL_SERVER, ADMINS,
                               cloudplatform + ' failure', credentials)
    mail_handler.setLevel(logging.ERROR)
    app.logger.addHandler(mail_handler)

class StructuredMessage(object):
    def __init__(self, **kwargs):
        self.kwargs = kwargs

    def __str__(self):
        return 'payload=%s' % (json.dumps(self.kwargs))

_ = StructuredMessage   # optional, to improve readability

# Add HTTPHandler for Logging Errors to Slack via POST request if the app is not in debug mode
if not app.debug:
    import logging
    from logging.handlers import HTTPHandler
    http_handler = logging.handlers.HTTPHandler(
        'https://hooks.slack.com/services/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',
        '',
        method='POST',
    )
    http_handler.setLevel(logging.INFO)
    app.logger.addHandler(http_handler)

    #send test log to slack now
    print("send log now to slack")
    print(_(text='this is a log', channel='#logging', username=cloudplatform, icon_emoji='ghost'))
    app.logger.info(_(text='this is a log', channel='#logging', username=cloudplatform, icon_emoji='ghost'))

    #manually making a post request works
    url = 'https://hooks.slack.com/services/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'
    payload = {'channel': '#logging', 'text': 'this is a second log', 'username': cloudplatform, 'icon_emoji': 'ghost'}
    headers = {'content-type': 'application/json'}
    r = requests.post(url, data=json.dumps(payload), headers=headers)

import FlaskWebProject.views
import FlaskWebProject.models
