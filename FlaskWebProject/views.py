"""
Routes and views for the flask application.
"""

from datetime import datetime
from flask import render_template, send_from_directory
from FlaskWebProject import app
from werkzeug.routing import BaseConverter
import os

# Global constants
APP_ROOT = os.path.dirname(os.path.abspath(__file__))
APP_STATIC = os.path.join(APP_ROOT, 'static')

# Regex Handling for URLs
class RegexConverter(BaseConverter):
    def __init__(self, url_map, *items):
        super(RegexConverter, self).__init__(url_map)
        self.regex = items[0]

app.url_map.converters['regex'] = RegexConverter

# Routes

@app.route('/')
def home():
    """Renders the home page."""
    return render_template(
        'index.html',
    )

@app.route('/<path:filepath1>/<path:filepath2>')
def static_files(filepath1, filepath2):
    return send_from_directory(os.path.join(APP_STATIC, 'scripts', filepath1, os.path.dirname(filepath2)),  os.path.basename(filepath2))
