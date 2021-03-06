"""
The FlaskWebProject.
Handles all incomming connections.

.. module:: FlaskWebProject
    :platform: Unix, Windows
    :synopsis: Module containing everything needed for the flaskweb application to request_token_url

"""
import json

from flask import Flask
from flask.ext.login import LoginManager
from flask.ext.sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
from flask_oauthlib.client import OAuth

from functools import wraps

from config import cloudplatform
from config import sso_fb_consumer_key, sso_fb_consumer_secret
from config import sso_google_consumer_key, sso_google_consumer_secret
from config import SQLALCHEMY_DATABASE_URI
# Logging
import sys
from config import SLACK_HANDLER_HOST, SLACK_HANDLER_URL, MAIL_USERNAME, MAIL_PASSWORD, MAIL_SERVER, MAIL_PORT, ADMINS
try:
    from config import LOG_LINE_NO
except:
    LOG_LINE_NO = True

from flask import g
from threading import Thread
from FlaskWebProject.threads import EtcdDBListener

app = Flask(__name__)
app.config.from_object('config')
db = SQLAlchemy(app)
lm = LoginManager()
lm.init_app(app)
lm.login_view = 'login'
oauth = OAuth()

# session for connection to database
dbEngine = create_engine(SQLALCHEMY_DATABASE_URI, pool_recycle=3600)

# ATT TODO everywhere in code, try to replace autoflush, with manual one?
# --good approach?
dbSession = scoped_session(sessionmaker(autocommit=False, bind=dbEngine))
# dbSession = Session()  # check if it is good to create the session with init

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


def log_format(text, icon='ghost', attachment=None, username=None, channel='#logging'):
    """
    Method to format a log string in the correct way, so that slack can read it.

    :param string text: The text to send in the log message.
    :param string icon: The slack icon to use.
    :param string attachment: A slack attachment
    :param string username: The username to send the message as.
    :param string channel: The channel to log to.
    :return string: json string containing a full slack message
    """
    if username is None:
        username = cloudplatform
    # Attachment has to be a tuple of level and text (e.g. ("danger",
    # "Critical Error: Import not found"))
    if attachment:
        return json.dumps({"icon_emoji": icon, "icon": icon, "username": username,
                           "attachments": [
                               {
                                   "fallback": text,
                                   "pretext": text,
                                   "color": attachment[0],
                                   "fields": [
                                       {
                                           "title": "Attachment",
                                           "value": attachment[1],
                                           "short": False
                                       }
                                   ]
                               }
                           ]})
    else:
        return json.dumps({"icon_emoji": icon, "text": text,
                           "icon": icon, "username": username})


def auto_logger(f):
    """
    Decorator that adds auto-logging features to functions.
    Automatically catches any exceptions and sends them to defined endpoints.

    :param function f: The function to decorate
    :return function: the function that decorates
    """
    # Works as a decorator for functions. Automatically sends log messages on
    # exceptions
    @wraps(f)
    def decorated(*args, **kwargs):
        try:
            return f(*args, **kwargs)
        except Exception as e:
            # Log the error to all attached handlers and then raise the error again
            # for flask to further handle it (this way we can still add custom
            # 500 pages)
            if LOG_LINE_NO:
                logger.error(log_format("Exception in [" + str(f.__name__) + " l: "
                                        + str(sys.exc_info()[2].tb_next.tb_lineno) + "]: " + str(e)))
            else:
                logger.error(
                    log_format("Exception in [" + str(f.__name__) + "]: " + str(e)))
            raise e
    return decorated


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
                                   MAIL_USERNAME + '@' + MAIL_SERVER, ADMINS,
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

db_listener = EtcdDBListener("/registerUser")
db_listener.daemon = True
db_listener.start()

file_listener = EtcdDBListener("/saveFile")
file_listener.daemon = True
file_listener.start()

permisson_listener = EtcdDBListener("/setPermission")
permisson_listener.daemon = True
permisson_listener.start()


import FlaskWebProject.views
import FlaskWebProject.models
