# Dummyconfig for config.py

import os
WTF_CSRF_ENABLED = True
SECRET_KEY = 'db_secret'

basedir = os.path.abspath(os.path.dirname(__file__))

SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'app.db')
SQLALCHEMY_MIGRATE_REPO = os.path.join(basedir, 'db_repository')

sso_fb_consumer_key = "fb_id"
sso_fb_consumer_secret = "fb_secret"

sso_google_consumer_key = "google_id"
sso_google_consumer_secret = "google_secret"
