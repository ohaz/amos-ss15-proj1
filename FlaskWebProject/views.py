"""
Routes and views for the flask application.
"""

from flask import render_template, send_from_directory, redirect, url_for, session, g, request
from FlaskWebProject import app, db, lm
from flask.ext.login import login_user, logout_user, current_user, login_required
from werkzeug.routing import BaseConverter
import os
from .forms import LoginForm, RegisterForm
from .models import User, bcrypt

# Global constants
APP_ROOT = os.path.dirname(os.path.abspath(__file__))
APP_STATIC = os.path.join(APP_ROOT, 'static')

# Regex Handling for URLs
class RegexConverter(BaseConverter):
    def __init__(self, url_map, *items):
        super(RegexConverter, self).__init__(url_map)
        self.regex = items[0]

app.url_map.converters['regex'] = RegexConverter

# Function for LoginManager to get a user with specific id
@lm.user_loader
def load_user(id):
    return User.query.get(int(id))

@app.before_request
def before_request():
    g.user = current_user

# Routes

@app.route('/')
@app.route('/index')
@login_required
def home():
    """Renders the home page."""
    return render_template(
        'index.html',
    )

@app.route('/login', methods=['GET', 'POST'])
def login():
    if g.user is not None and g.user.is_authenticated():
        return redirect(url_for('home'))
    error = None
    form = LoginForm(request.form)
    if request.method == 'POST':
        if form.validate_on_submit():
            user = User.query.filter_by(username=request.form['username']).first()
            if user is not None and bcrypt.check_password_hash(
                    user.password, request.form['password']
            ):
                session['remember_me'] = form.remember_me.data
                login_user(user)
                return redirect(request.args.get('next') or url_for('home'))
            else:
                error = 'Invalid username or password.'
    return render_template('login.html', form=form, error=error)


@app.route('/register', methods=['GET', 'POST'])
def register():
    if g.user is not None and g.user.is_authenticated():
        return redirect(url_for('home'))
    form = RegisterForm()
    if form.validate_on_submit():
        user = User(
            username=form.username.data,
            email=form.email.data,
            password=form.password.data
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return redirect(url_for('home'))
    return render_template('register.html', form=form)



@login_required
@app.route('/<path:filepath1>/<path:filepath2>')
def static_files(filepath1, filepath2):
    return send_from_directory(os.path.join(APP_STATIC, 'scripts', filepath1, os.path.dirname(filepath2)),  os.path.basename(filepath2))

@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('home'))