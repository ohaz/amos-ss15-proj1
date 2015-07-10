"""
Routes and views for the flask application.
"""
import hashlib
import json
import uuid
import unirest
import threading
from flask import render_template, send_from_directory, redirect, url_for, session, g, request
from FlaskWebProject import app, lm, facebook, google, dbSession, auto_logger, dbEngine
from flask.ext.login import login_user, logout_user, current_user, login_required
from sqlalchemy import or_
from werkzeug.routing import BaseConverter
import os
from .forms import LoginForm, RegisterForm
from .models import User, Userfile, UserUserfile
from FlaskWebProject import storageinterface
import etcd
from etcd import EtcdNotFile
from config import etcd_member
from config import cloud_hoster
# from etcd import EtcdException
from config import cloudplatform
from sqlalchemy.orm import sessionmaker, scoped_session
from multiprocessing import Queue


# Global constants
APP_ROOT = os.path.dirname(os.path.abspath(__file__))
APP_STATIC = os.path.join(APP_ROOT, 'static')


class FuncThread(threading.Thread):
    def __init__(self, target, *args):
        self._target = target
        self._args = args
        threading.Thread.__init__(self)

    def run(self):
        self._target(*self._args)


# Regex Handling for URLs
class RegexConverter(BaseConverter):

    """
    An URL Converter for Flask to allow regex in URL paths
    """

    def __init__(self, url_map, *items):
        """
        Creates a new RegexConverter
        :param string url_map: The url to map
        :param list items: items
        """
        super(RegexConverter, self).__init__(url_map)
        self.regex = items[0]


app.url_map.converters['regex'] = RegexConverter


@auto_logger
def db_cloud_sync(key_path, rest_url, data):
    etcd_client = init_etcd_connection()

    async_ready_queue = Queue()
    thread_listen_ready_list = []
    thread_counter_clouds = 0
    for hoster in cloud_hoster:
        if cloud_hoster[hoster][1] is not None:
            hoster_string_ready = "/" + key_path + "ack_" + hoster
            # pros = Process(target=listen_ready_ack, args=(etcd_client, hoster_string_ready, hoster, async_ready_queue))
            print "db_cloud_sync: for hoster: " + hoster + " hoster_string_ready: " + hoster_string_ready
            pros = FuncThread(listen_ready_ack, etcd_client, hoster_string_ready, hoster, async_ready_queue)
            pros.daemon = True
            pros.start()
            thread_listen_ready_list.append(pros)
            thread_counter_clouds = thread_counter_clouds + 1
    try:
        print "db_cloud_sync: try write path: " + key_path
        etcd_client.write(key_path, "", dir=True)
    except EtcdNotFile:
        # TODO Threads muessen noch beendet werden
        print "db_cloud_sync: except EtcdNotFile!"
        res_written_data = -1
        return res_written_data
    else:
        print "db_cloud_sync: wait for all listen_ack processes...."
        # wait for all listen_ack processes
        for p in thread_listen_ready_list:
            p.join()

        etcd_cloud_hoster = cloud_hoster
        # evaluate results from queue
        for i in range(0, thread_counter_clouds):
            result = async_ready_queue.get()
            for r in result:
                if result[r][0]:
                    etcd_cloud_hoster[r][0] = True

        print "db_cloud_sync: ack listener finished..."

        async_receive_queue = Queue()
        thread_listen_receive_list = []
        thread_counter_clouds = 0
        for hoster in etcd_cloud_hoster:
            print " db_cloud_sync: for hoster: " + hoster
            if etcd_cloud_hoster[hoster][1]:  # what does this?
                hoster_string_ready = "/" + key_path + "ack_" + hoster
                print "  db_cloud_sync: for hoster: hoster_string_ready:" + hoster_string_ready
                pros = FuncThread(listen_ack_etcd, etcd_client, hoster_string_ready, hoster,
                                  async_receive_queue, "2")
                pros.daemon = True
                pros.start()
                thread_listen_receive_list.append(pros)
                thread_counter_clouds = thread_counter_clouds + 1

        async_send_data = FuncThread(send_sync_data, etcd_cloud_hoster, data, rest_url)
        async_send_data.daemon = True
        async_send_data.start()
        print "db_cloud_sync: send registration data to clouds"

        # wait for all listen_ack processes
        for p in thread_listen_receive_list:
            p.join()

        # evaluate results from queue
        res_receive_data = 1
        for i in range(0, thread_counter_clouds):
            result = async_receive_queue.get()
            for r in result:
                if not result[r][0]:
                    res_receive_data = -1

        print "db_cloud_sync: result receiving data: " + str(res_receive_data)

        commit_string = key_path + 'commit'
        if res_receive_data == -1:
            etcd_client.write(commit_string, 0)
            # return that writting was not successfull
            res_written_data = -1
        else:

            async_written_queue = Queue()
            thread_listen_written_list = []
            thread_counter_clouds = 0
            for hoster in etcd_cloud_hoster:
                if etcd_cloud_hoster[hoster][1]:
                    hoster_string_ready = "/" + key_path + "ack_" + hoster
                    pros = FuncThread(listen_ack_etcd, etcd_client, hoster_string_ready, hoster,
                                      async_written_queue, "3")
                    pros.daemon = True
                    pros.start()
                    thread_listen_written_list.append(pros)
                    thread_counter_clouds = thread_counter_clouds + 1

            etcd_client.write(commit_string, 1)
            # wait for all listen_ack processes
            for p in thread_listen_written_list:
                p.join()

            # evaluate results from queue
            res_written_data = 1
            for i in range(0, thread_counter_clouds):
                result = async_written_queue.get()
                for r in result:
                    if not result[r][0]:
                        res_written_data = -1

            print "db_cloud_sync: result of written data to db: " + str(res_written_data)
    return res_written_data


def init_etcd_connection():
    etcd_client = etcd.Client(host=etcd_member[0], protocol='http', port=4001, allow_reconnect=True)
    # etcd_client.machines
    return etcd_client


def listen_ready_ack(client, user_key, platform, queue):
    cloud_hoster_local = cloud_hoster
    try:
        url = "http://" + etcd_member[0] + ":4001/v2/keys" + user_key + "?wait=true"
        print "listen_ready_ack: wait url: " + url
        unirest.timeout(10)
        etcd_response = unirest.get(url)
        new_item = etcd_response.body['node']
        # TODO: should be exported to new thread
        print "listen_ready_ack: platform: " + platform + " New Key: " + new_item['key']
        cloud_hoster_local[platform][0] = True
    # To catch the timeout Exception form unirest when cloud does not answer
    except Exception, e:
        print "listen_ready_ack: Timeout exception platform: " + platform
        cloud_hoster_local[platform][0] = False
    finally:
        queue.put(cloud_hoster_local)


# call back function for unirest to send request async
def unirest_callback(response):
    pass


def send_sync_data(host_list, data, rest_interface):
    print "send_sync_data: start sync data.."
    data_json = json.dumps(data)
    header = {'Content-Type': 'application/json'}
    for cloud in host_list:
        if host_list[cloud][0]:
            host_url = "http://" + host_list[cloud][1] + rest_interface
            print "send_sync_data: host URL: " + host_url + " "
            unirest.post(host_url, headers=header, params=data_json, callback=unirest_callback)


def listen_ack_receiving_data(client, user_key, platform, queue):
    # counter = 0
    receive_result = {platform: [False]}
    try:
        url = "http://" + etcd_member[0] + ":4001/v2/keys" + user_key + "?wait=true"
        print "listen_ack_receiving_data: wait url: " + url
        unirest.timeout(10)
        etcd_response = unirest.get(url)
        new_item = etcd_response.body['node']
        # TODO: should be exported to new thread
        print "listen_ack_receiving_data: platorm: " + platform + " New Key: " + new_item['key'] + " New Value: " + new_item['value']
        if new_item['value'] == "2":
            receive_result[platform][0] = True
        else:
            receive_result[platform][0] = False
    # To catch the timeout Exception form unirest when cloud does not answer
    except Exception, e:
        print "listen_ack_receiving_data: Timeout exception platform: " + platform
        receive_result[platform][0] = False
    finally:
        queue.put(receive_result)


def listen_ack_written_data(client, user_key, platform, queue):
    # counter = 0
    receive_result = {platform: [False]}
    try:
        url = "http://" + etcd_member[0] + ":4001/v2/keys" + user_key + "?wait=true"
        print "listen_ack_written_data: wait url: " + url
        unirest.timeout(10)
        etcd_response = unirest.get(url)
        new_item = etcd_response.body['node']
        # TODO: should be exported to new thread
        print "listen_ack_written_data: platorm: " + platform + " New Key: " + new_item['key'] + " New Value: " + new_item['value']
        if new_item['value'] == "3":
            receive_result[platform][0] = True
        else:
            receive_result[platform][0] = False
    # To catch the timeout Exception form unirest when cloud does not answer
    except Exception, e:
        print "listen_ack_written_data: Timeout exception platform: " + platform
        receive_result[platform][0] = False
    finally:
        queue.put(receive_result)


def listen_ack_etcd(client, user_key, platform, queue, ack_num):
    print "listen_ack_etcd: listen for ack_num: " + ack_num + " from platform: " + platform
    # counter = 0
    receive_result = {platform: [False]}
    try:
        url = "http://" + etcd_member[0] + ":4001/v2/keys" + user_key + "?wait=true"
        print "listen_ack_etcd: wait url: " + url
        unirest.timeout(10)
        etcd_response = unirest.get(url)
        new_item = etcd_response.body['node']
        # TODO: should be exported to new thread
        print "listen_ack_etcd: platorm: " + platform + " New Key: " + new_item['key'] + " New Value: " + new_item['value']
        if new_item['value'] == ack_num:
            receive_result[platform][0] = True
        else:
            receive_result[platform][0] = False
    # To catch the timeout Exception form unirest when cloud does not answer
    except Exception, e:
        print "listen_ack_etcd: Timeout exception platform: " + platform
        receive_result[platform][0] = False
    finally:
        queue.put(receive_result)


def listen_commit_status(client, user_key, queue):
    try:
        url = "http://" + etcd_member[0] + ":4001/v2/keys" + user_key + "?wait=true"
        unirest.timeout(40)
        etcd_response = unirest.get(url)
        new_item = etcd_response.body['node']
        # TODO: should be exported to new thread
        print "listen_commit_status: url: " + url + " New Key: " + new_item['key'] + " New Value: " + new_item['value']
        ret_val = new_item['value']
    # To catch the timeout Exception form unirest when cloud does not answer
    except Exception, e:
        print "listen_commit_status: Timeout exception: " + url
        ret_val = "0"
    finally:
        queue.put(ret_val)


# Function for LoginManager to get a user with specific id

@lm.user_loader
def load_user(id):
    """
    Function for LoginManager to get a user with specific id

    :param string/int id: the id of the user to load
    """
    user = dbSession.query(User).filter(User.id == int(id)).first()
    return user


@app.before_request
def before_request():
    """
    This function gets called before each request is handled
    """
    g.user = current_user


# If Request is finished/exception was raised,
# at least do this
@app.teardown_appcontext
def shutdown_session(exception=None):
    """
    Shuts down the database session

    :param Exception exception: Won't get used here
    """
    dbSession.remove()


@app.route('/')
@app.route('/index')
@login_required
@auto_logger
def home():
    """
    Renders the home page

    :return file: the rendered template of the index page
    """
    return render_template(
        'index.html', user_id=current_user.get_id()
    )


@app.route('/login', methods=['GET', 'POST'])
@auto_logger
def login():
    """
    UserName Password Login

    :return file: Either the homepage or the loginpage
    """
    if g.user is not None and g.user.is_authenticated():
        return redirect(url_for('home'))
    error = None
    form = LoginForm(request.form)
    if request.method == 'POST':
        if form.validate_on_submit():
            user = dbSession.query(User).filter(User.username == request.form['username']).first()
            if user is not None and user.sso == "none":
                password, salt = user.password.split(':')
                if password == hashlib.sha256(salt.encode() + request.form['password'].encode()).hexdigest():
                    session['remember_me'] = form.remember_me.data
                    login_user(user)
                    return redirect(request.args.get('next') or url_for('home'))
                else:
                    error = 'Invalid password'
            else:
                error = 'Invalid username'
    return render_template('login.html', form=form, error=error)


@app.route('/register', methods=['GET', 'POST'])
@auto_logger
def register():
    """
    UserName Password Register

    :return file: either the register page or the homepage
    """
    if g.user is not None and g.user.is_authenticated():
        return redirect(url_for('home'))
    form = RegisterForm()
    error = None
    if form.validate_on_submit():
        # generate randomness
        salt = uuid.uuid4().hex
        # hashing password
        user = dbSession.query(User).filter(User.username == request.form['username']).first()
        email = dbSession.query(User).filter(User.email == request.form['email']).first()
        if user is not None:
            error = 'username is already taken'
        elif email is not None:
            error = 'email was already used'
        else:
            user_string = "registerUser/" + form.username.data + '/'
            password = hashlib.sha256(
                    salt.encode() + form.password.data.encode()).hexdigest() + ':' + salt
            data = {
                    'username': form.username.data,
                    'email': form.email.data,
                    'password': password,
                    'sso': 'none'
            }
            rest_url = '/storage/api/v1.0/syncdb/registeruser'

            # call synchronization between cloud dbs
            res_db_sync = db_cloud_sync(user_string, rest_url, data)
            print "register: res_db_sync: " + str(res_db_sync)

            if res_db_sync == -1:
                error == '+++++ registration fails, please try it again'
            else:
                print "+++++ sending was successfull"

                # login new user
                dbSession_new = scoped_session(sessionmaker(autocommit=False, bind=dbEngine))
                user = dbSession_new.query(User).filter(User.username == request.form['username']).first()

                login_user(user)
                return redirect(url_for('home'))

    return render_template('register.html', form=form, error=error)


@login_required
@app.route('/<path:filepath1>/<path:filepath2>')
def static_files(filepath1, filepath2):
    """
    Method to work with static files.
    
    :param string filepath1: the first part of the URL path
    :param string filepath2: the second part of the URL path
    :return file: The static file wanted
    """
    return send_from_directory(os.path.join(APP_STATIC, 'scripts', filepath1, os.path.dirname(filepath2)),  os.path.basename(filepath2))


@app.route('/logout')
@auto_logger
def logout():
    """
    Logout for user

    :return file: homepage
    """
    logout_user()
    return redirect(url_for('home'))


'''
OAuth2 Facebook Login
'''


@app.route('/login_fb', methods=['GET', 'POST'])
@auto_logger
def login_fb():
    """
    Login via Facebook

    :return: Facebook authorization
    """
    callback_url = url_for('facebook_authorized', _external=True)
    return facebook.authorize(callback=callback_url)


@facebook.tokengetter
def get_facebook_oauth_token():
    """
    Gets the facebook oauth token

    :return: the oauth token
    """
    return session.get('oauth_token')


@app.route('/login_fb/authorized')
@facebook.authorized_handler
@auto_logger
def facebook_authorized(resp):
    """
    Function that gets called by Facebook oauth after a login

    :param resp: the response by facebook
    :return file: Homepage or fail page
    """
    next_url = request.args.get('next') or url_for('home')
    if resp is None:
        # The user likely denied the request
        # TODO: excalate error to user: 'There was a problem logging in with
        # Google.'
        return redirect(next_url)
    session['oauth_token'] = (resp['access_token'], '')
    user_data = facebook.get('/me').data
    user = dbSession.query(User).filter(User.email == user_data['email']).first()

    if user is None:

        user_string = "registerUser/" + user_data['id'] + '/'

        data = {
            'username': user_data['id'],
            'email': user_data['email'],
            'password': " ",
            'sso': 'facebook'
        }

        rest_url = '/storage/api/v1.0/syncdb/registeruser'

        res_db_sync = db_cloud_sync(user_string, rest_url, data)

        if res_db_sync == -1:
            error = '+++++ registration fails, please try it again'
            print error
        else:
            print "+++++ sending was successfull"
            # login new user
            dbSession_new = scoped_session(sessionmaker(autocommit=False, bind=dbEngine))
            user = dbSession_new.query(User).filter(User.username == user_data['id']).first()
            print user
            login_user(user)

    else:
        login_user(user)
    return redirect(next_url)



'''
OAuth2 Google Login
'''


@app.route('/login_google', methods=['GET', 'POST'])
@auto_logger
def login_google():
    """
    Google login

    :return: Google authorization
    """
    # next_url = request.args.get('next') or url_for('home')
    callback_url = url_for('google_authorized', _external=True)
    return google.authorize(callback=callback_url)


@google.tokengetter
def get_google_oauth_token():
    """
    Get the google oauth token

    :return: the oauth token
    """
    return session.get('oauth_token')


@app.route('/login_google/authorized')
@google.authorized_handler
@auto_logger
def google_authorized(resp):
    """
    Function that gets called by Google oauth after a login

    :param resp: the response by google
    :return file: Homepage or fail page
    """
    next_url = request.args.get('next') or url_for('home')
    if resp is None:
        # The user likely denied the request
        # TODO: excalate error to user: 'There was a problem logging in with
        # Google.'
        return redirect(next_url)
    session['oauth_token'] = (resp['access_token'], '')
    user_data = google.get('/userinfo/v2/me').data
    user = dbSession.query(User).filter(User.email == user_data['email']).first()

    if user is None:

        user_string = "registerUser/" + user_data['id'] + '/'

        rest_url = '/storage/api/v1.0/syncdb/registeruser'

        data = {
            'username': user_data['id'],
            'email': user_data['email'],
            'password': " ",
            'sso': 'google'
        }

        res_db_sync = db_cloud_sync(user_string, rest_url, data)

        if res_db_sync == -1:
            error = '+++++ registration fails, please try it again'
            print error
        else:
            print "+++++ sending was successfull"

            # login new user
            dbSession_new = scoped_session(sessionmaker(autocommit=False, bind=dbEngine))
            user = dbSession_new.query(User).filter(User.email == user_data['email']).first()
            login_user(user)

    else:
        login_user(user)
    return redirect(next_url)


'''
REST API
'''


@app.route('/storage/api/v1.0/<int:bucket_id>', methods=['GET'])
@auto_logger
def rest_list_files(bucket_id):
    """
    Lists files in container

    :param int bucket_id: The bucket to list
    :return string: Json object containing the list of files
    """
    if g.user is None or not g.user.is_authenticated():
        return "401"  # Unauthorized

    if int(g.user.get_id()) != bucket_id:
        return "403"

    # gets every file of g.user
    files = dbSession.query(Userfile.name).filter(Userfile.folder == g.user.get_id()).order_by(Userfile.name)
    data = []
    for _iter_ in files:
        data.append(_iter_[0])
    json_string = json.dumps(data)
    # print(json_string)
    return json_string


@app.route('/storage/api/v1.0/<int:bucket_id>', methods=['DELETE'])
@auto_logger
def rest_delete_container(bucket_id):
    """
    Deletes specified container

    :param int bucket_id: The bucket to delete
    :return file: 200 Page
    """
    # 1. check if logged in user is owner of bucket
    if g.user is None or not g.user.is_authenticated():
        return "401"  # Unauthorized
    if int(g.user.get_id()) != bucket_id:
        return "403"  # Forbidden
    # ATT: all files in bucket must be deleted in db # can be replaced via bulkrequest, but this needs more attention, because errors are made easily and db could be out of synch [foreign keys and so on]!

    files_in_bucket = dbSession.query(Userfile).filter(Userfile.folder == bucket_id)
    for content in files_in_bucket:
        connectors = dbSession.query(UserUserfile).filter(UserUserfile.userfile_id == content.id)
        for connect in connectors:
            dbSession.delete(connect)
        dbSession.delete(content)
    user = dbSession.query(User).filter(User.id == bucket_id).first()
    dbSession.delete(user)
    dbSession.commit()
    storageinterface.delete_container(bucket_id)
    return "200"


@app.route('/storage/api/v1.0/<int:bucket_id>/<string:file_name>', methods=['GET'])
@auto_logger
def rest_download_file_to_text(bucket_id, file_name):
    """
    Returns specified file in container as text

    :param int bucket_id: The bucket in which the file is in
    :param string file_name: The name of the file
    :return string: The file as a string
    """
    # 1 check if user is auth
    if g.user is None or not g.user.is_authenticated():
        return "401"  # Unauthorized

    userfile = dbSession.query(UserUserfile, Userfile).filter(UserUserfile.userfile_id == Userfile.id,
                                                              Userfile.name == file_name,
                                                              UserUserfile.user_id == g.user.get_id(),
                                                              Userfile.folder == bucket_id).first()

    if userfile is None:
        return "404"  # Not found
    if int(userfile.UserUserfile.permission) < 4:
        return "403"

    value = storageinterface.download_file_to_text(bucket_id, file_name)

    if value is None:  # FIXME wat do in this case?
        print('Database out of synch with storage!')
        value = ""
    return value


@app.route('/storage/api/v1.0/<int:bucket_id>/<string:file_name>', methods=['POST'])
@auto_logger
def rest_upload_from_text(bucket_id, file_name):
    """
    Uploads text to new file in container

    :param int bucket_id: The bucket in which the file is in
    :param string file_name: The name of the file
    :return file: a status response
    """
    if g.user is None or not g.user.is_authenticated():
        return "401"  # Unauthorized

    # if file doesnt exists -> logged in user must be bucket_id -> add permission to UserUserfiles
    userfile = dbSession.query(Userfile).filter(Userfile.name == file_name).first()
    user = dbSession.query(User).filter(User.id == bucket_id).first()
    if userfile is None:
        if user is None:
            return "403"  # Forbidden
            # userfile = Userfile(bucket_id, file_name)
            # useruserfile = UserUserfile(userfile, user, 6)
            # dbSession.add(userfile)
            # dbSession.add(useruserfile)
            # dbSession.commit()

    # if file exists -> check if file_name, user_id is found with right permission in UserUserfiles
    else:
        useruserfile = dbSession.query(UserUserfile).filter(UserUserfile.user_id == user.id,
                                                            UserUserfile.userfile_id == userfile.id).first()
        if useruserfile is None or useruserfile.permission < 6:
            return '403'  # redirect(url_for('403'))  # No permission found or permission not sufficient

    content = request.json['content']
    etcd_client = init_etcd_connection()
    file_string = "saveFile/" + str(user.id) + '_' + file_name + '/'
    # file_string = "saveFile/" + file_name + '/' # 150706 lars - zur besseren Unterscheidung der Dateien.

    async_ready_queue = Queue()
    thread_listen_ready_list = []
    thread_counter_clouds = 0
    for hoster in cloud_hoster:
        if cloud_hoster[hoster][1] is not None:
            hoster_string_ready = "/" + file_string + "ack_" + hoster
            pros = FuncThread(listen_ready_ack, etcd_client, hoster_string_ready, hoster, async_ready_queue)
            pros.daemon = True
            pros.start()
            thread_listen_ready_list.append(pros)
            thread_counter_clouds += 1
    try:
        etcd_client.write(file_string, "", dir=True)
    except EtcdNotFile:
        for p in thread_listen_ready_list:
            p.terminate()
            print("terminate")
    else:
        # wait for all listen_ack processes
        for p in thread_listen_ready_list:
            p.join()

        etcd_cloud_hoster = cloud_hoster
        # evaluate results from queue
        for i in range(0, thread_counter_clouds):
            result = async_ready_queue.get()
            for r in result:
                if result[r][0]:
                    etcd_cloud_hoster[r][0] = True

        print "+++++ saveFile: ack listener finished..."

        data = {
            'content': content
        }

        async_receive_queue = Queue()
        thread_listen_receive_list = []
        thread_counter_clouds = 0
        for hoster in etcd_cloud_hoster:
            if etcd_cloud_hoster[hoster][1]:
                hoster_string_ready = "/" + file_string + "ack_" + hoster
                pros = FuncThread(listen_ack_etcd, etcd_client, hoster_string_ready, hoster,
                                  async_receive_queue, "2")
                pros.daemon = True
                pros.start()
                thread_listen_receive_list.append(pros)
                thread_counter_clouds = thread_counter_clouds + 1

        async_send_data = FuncThread(send_sync_data, etcd_cloud_hoster, data,
                                     '/storage/api/v1.0/syncfile/savefile/' + current_user.email + '/' + file_name)
        async_send_data.daemon = True
        async_send_data.start()
        print "+++++ send save file data to clouds"
        # wait for all listen_ack processes
        for p in thread_listen_ready_list:
            p.join()

        etcd_cloud_hoster = cloud_hoster
        # evaluate results from queue
        for i in range(0, thread_counter_clouds):
            result = async_ready_queue.get()
            for r in result:
                if result[r][0]:
                    etcd_cloud_hoster[r][0] = True
        print"++++++++ all clouds have saved the file"

        #
        # Start listen to ACK wether commit was successfull (copy temporary file to actual file)
        # send out the commit message via etcd
        # wait for all acks to come in -> join all listen threads
        # ---> all clouds have sucessfully copied the temp file to the actual file
        # ---> return 200

    response = "200"
    # if not storageinterface.upload_from_text(bucket_id, file_name, content):
    # response = "500"
    return response


@app.route('/storage/api/v1.0/<int:bucket_id>/<string:file_name>', methods=['PUT'])
@auto_logger
def rest_overwrite_file_from_text(bucket_id, file_name):
    """
    Uploads text to file in container

    :param int bucket_id: The bucket in which the file is in
    :param string file_name: The name of the file
    :return file: a status response
    """
    # 1 check auth.
    if g.user is None or not g.user.is_authenticated():
        return "401"  # Unauthorized
    # 2 check if this file really exists
    element = dbSession.query(Userfile).filter((Userfile.folder == bucket_id), (Userfile.name == file_name)).first()
    if element is None:
        return "404"
    print(element.name)
    # 3 get this file again, just to check with right permissions
    file_ = dbSession.query(UserUserfile, Userfile).filter(UserUserfile.userfile_id == Userfile.id,
                                                           UserUserfile.user_id == g.user.get_id(),
                                                           or_(UserUserfile.permission == 2,
                                                               UserUserfile.permission == 6),
                                                           Userfile.folder == bucket_id,
                                                           Userfile.name == file_name).first()
    if file_ is None:
        return '403'  # because file exists, this means user has no right to manipulate
    print(file_.Userfile.name)
    # 4 send new element
    content = request.json['content']
    response = "200"
    if not storageinterface.upload_from_text(bucket_id, file_name, content):
        response = "500"
    print(response)
    return response


@app.route('/storage/api/v1.0/<int:bucket_id>/<string:file_name>', methods=['DELETE'])
@auto_logger
def rest_delete_file(bucket_id, file_name):
    """
    Deletes file in container

    :param int bucket_id: The bucket in which the file is in
    :param string file_name: The name of the file
    :return file: a status response
    """
    # 1 check auth.
    if g.user is None or not g.user.is_authenticated():
        return "401"  # Unauthorized
    # 2 only owner is allowed to delete
    if int(g.user.get_id()) != bucket_id:
        return "403"
    # 3 check if this combination really exists
    elements = dbSession.query(Userfile).filter((Userfile.folder == bucket_id), (Userfile.name == file_name)).first()
    if elements is None:
        return "404"
    # 4 try a delete-atempt
    # ATT [here an exception can lead to desynchronized states]
    if storageinterface.file_exists(bucket_id, file_name):
        storageinterface.delete_file(bucket_id, file_name)
        # no cascade possible, therfore we must remove the foreign-key there manually
        references = dbSession.query(UserUserfile).filter(UserUserfile.userfile_id == elements.id)
        for ref in references:
            dbSession.delete(ref)
        dbSession.delete(elements)
        dbSession.commit()
        return "200"
    return "500"  # something went wrong


# Get Shared files, with at least read-permission, includeing username and id
@app.route('/storage/api/v1.0/share/read', methods=['GET'])
@auto_logger
def rest_share_list_files_read():
    """
    Lists files with permission >0

    :return string: json with all files with permission > 0
    """
    if g.user is None or not g.user.is_authenticated():
        return "401"  # Unauthorized
        # 1: gets every file with permission > 4 for g.user
        # Sample-SQL-command
        # SELECT user.username, user_userfile.permission,userfile.id,userfile.folder,userfile.name FROM user_userfile,userfile JOIN user ON user.id = userfile.folder WHERE user_userfile.userfile_id = userfile.id AND user_userfile.user_id = g.user.get_id() ;
    files = dbSession.query(UserUserfile, Userfile, User).filter(User.id == Userfile.folder,
                                                                 UserUserfile.userfile_id == Userfile.id,
                                                                 UserUserfile.user_id == g.user.get_id(),
                                                                 UserUserfile.permission >= 4)
    # 2 create json with data
    data = []
    for _iter_ in files:
        data.append([_iter_.User.username, _iter_.Userfile.name, _iter_.User.id])
    json_string = json.dumps(data)
    return json_string


# Get Shared files, with at least write-permission, includeing username and id
@app.route('/storage/api/v1.0/share/write', methods=['GET'])
@auto_logger
def rest_share_list_files_write():
    """
    Lists files with permission == 2 or 6

    :return string: json with all files with permission 2 or 6
    """
    if g.user is None or not g.user.is_authenticated():
        return "401"  # Unauthorized
        # 1: gets every file with permission > 4 for g.user
        # Sample-SQL-command
        # SELECT user.username, user_userfile.permission,userfile.id,userfile.folder,userfile.name FROM user_userfile,userfile JOIN user ON user.id = userfile.folder WHERE user_userfile.userfile_id = userfile.id AND user_userfile.user_id = g.user.get_id() ;
    files = dbSession.query(UserUserfile, Userfile, User).filter(User.id == Userfile.folder,
                                                                 UserUserfile.userfile_id == Userfile.id,
                                                                 UserUserfile.user_id == g.user.get_id(),
                                                                 or_(UserUserfile.permission == 6,
                                                                     UserUserfile.permission == 2))
    # 2 create json with data
    data = []
    for _iter_ in files:
        data.append([_iter_.User.username, _iter_.Userfile.name, _iter_.User.id])
    json_string = json.dumps(data)
    return json_string


@app.route('/storage/api/v1.0/share/<int:bucket_id>/<string:file_name>', methods=['POST'])
@auto_logger
def rest_share_file(bucket_id, file_name):
    """
    Sets permission for file in db

    :param int bucket_id: The bucket in which the file is in
    :param string file_name: The name of the file
    :return file: a status response
    """
    print "rest_share_file: ..."
    username = request.json['username']
    permission = request.json['permission']

    # 1. check if logged in user is owner of file_name
    if g.user is None or not g.user.is_authenticated():
        return "401"  # Unauthorized
    # 2. check if Owner of bucket is changing permissions
    if int(g.user.get_id()) != bucket_id:
        return "403"  # Forbidden
    # 3. check if file in table Userfile exists
    userfile = dbSession.query(Userfile).filter(Userfile.folder == bucket_id, Userfile.name == file_name).first()
    if userfile is None:
        return "404"  # Not found
    # 4. check if user_id in table User exists
    print("check user")
    user = dbSession.query(User).filter(User.username == username).first()
    if user is None:
        return "404"  # Not found
    # 5. check if permission allready exists in table UserUserfile

    #user_file_owner
    user_file_owner = dbSession.query(User).filter(User.id == bucket_id).first()

    data = {
        'name_file_owner': user_file_owner.username,
        'permission': permission,
        'bucket_id': bucket_id,
        'file_name': file_name,
        'username': username
    }

    print "Username Owner: " + user_file_owner.username
    print "file_name: " + file_name
    print "username: " + username

    rest_url = '/storage/api/v1.0/syncdb/sharefilepermission'

    etcd_string = 'setPermission/'+ username + '_' + file_name + '/'

    res_db_sync = db_cloud_sync(etcd_string, rest_url, data)

    etcd_client = init_etcd_connection()
   
    if res_db_sync == 1: 
        permission_dir = etcd_client.get(etcd_string)
        for child in permission_dir.children:
            etcd_client.delete(child.key)
        permission_dir = etcd_client.get(permission_dir.key)
        etcd_client.delete(permission_dir.key, dir=True)
    """
    else:
        try:
            permission_dir = etcd_client.get(etcd_string)
            for child in permission_dir.children:
                etcd_client.delete(child.key)
            permission_dir = etcd_client.get(permission_dir.key)
            etcd_client.delete(permission_dir.key, dir=True)
        except EtcdNotFile:
            print "Failure while sync permissions, no etcd key available"
        except EtcdKeyNotFound:
            print "Failure while sync permissions, no etcd key available"
    """

    
    """
    #delete permission etcd key
    etcd_client = init_etcd_connection()
    permission_dir = etcd_client.get(etcd_string)
    if not permission_dir._children:
        etcd_client.delete(permission_dir.key, dir=True)
    else:
        for child in permission_dir.children:
            etcd_client.delete(child.key)
        permission_dir = etcd_client.get(permission_dir.key)
        etcd_client.delete(permission_dir.key, dir=True)
    return "200"
    """


'''
    REST API FOR SYNC DATABASES BETWEEN DIFFERENT CLOUDS
'''


@app.route('/storage/api/v1.0/syncdb/registeruser', methods=['POST'])
def rest_syncdb_register_user():
    new_username = request.json['username']
    new_email = request.json['email']
    new_password = request.json['password']
    new_sso = request.json['sso']

    user = dbSession.query(User).filter(User.username == new_username).first()
    email = dbSession.query(User).filter(User.email == new_email).first()

    etcd_client = init_etcd_connection()
    commit_key = "/registerUser/" + new_username + '/' + 'commit'

    async_commit_queue = Queue()
    async_commit_data = FuncThread(listen_commit_status, etcd_client, commit_key, async_commit_queue)
    async_commit_data.daemon = True
    async_commit_data.start()

    if user is not None:
        user_key = "registerUser/" + new_username + '/' + 'ack_' + cloudplatform
        etcd_client.write(user_key, 1)
    elif email is not None:
        user_key = "registerUser/" + new_username + '/' + 'ack_' + cloudplatform
        etcd_client.write(user_key, 1)
    else:
        user_key = "registerUser/" + new_username + '/' + 'ack_' + cloudplatform

        print ">>>>>>>>> REST API >>>>>>>>>>>>>>"
        print "user_key: " + user_key
        etcd_client.write(user_key, 2)
        print ">>>>> REST API: wrote to etcd..."
        print ">>>>>>>>> REST API >>>>>>>>>>>>>>"

    async_commit_data.join()
    commit_res = async_commit_queue.get()
    print ">>>> commit result: " + commit_res

    if commit_res == "1":
        user = User(
            username=new_username,
            email=new_email,
            password=new_password,
            sso=new_sso
        )
        # save new user in database
        dbSession.add(user)
        dbSession.commit()
        # create container/bucket for the new registered user
        storageinterface.create_container(user.get_id())
        etcd_client.write(user_key, 3)
    return "200"


@app.route('/storage/api/v1.0/syncdb/sharefilepermission', methods=['POST'])
def rest_syncdb_share_file_permission():
    name_file_owner = request.json['name_file_owner']
    share_username = request.json['username']
    permission = request.json['permission']
    file_name = request.json['file_name']

    etcd_client = init_etcd_connection()
    commit_key = '/setPermission/' + share_username + '_' + file_name + '/' + 'commit'

    async_commit_queue = Queue()
    async_commit_data = FuncThread(listen_commit_status, etcd_client, commit_key, async_commit_queue)
    async_commit_data.daemon = True
    async_commit_data.start()


    key_path = 'setPermission/' + share_username + '_' + file_name + '/' + 'ack_' + cloudplatform

    print ">>>>>>>>> REST API >>>>>>>>>>>>>>"
    print "key: " + key_path
    etcd_client.write(key_path, 2)
    print ">>>>> REST API: wrote to etcd..."
    print ">>>>>>>>> REST API >>>>>>>>>>>>>>"

    async_commit_data.join()
    commit_res = async_commit_queue.get()
    print ">>>> commit result: " + commit_res



    if commit_res == "1":

        user_file_owner = dbSession.query(User).filter(User.username == name_file_owner).first()
        print "got owner: " + str(user_file_owner.id)
        user = dbSession.query(User).filter(User.username == share_username).first()
        print "shared user: " + str(user.id)
        userfile = dbSession.query(Userfile).filter(Userfile.folder == user_file_owner.id, Userfile.name == file_name).first()
        print "userfile" + str(userfile.id)
        
        useruserfile = dbSession.query(UserUserfile).filter(UserUserfile.user_id == user.id,
                                                        UserUserfile.userfile_id == userfile.id).first()
        print "useruserfile"
        if useruserfile is not None:
            print "entry available"
            useruserfile.permission = permission
            dbSession.commit()
        else:
            print("set useruserfile")
            useruserfile = UserUserfile(userfile, user, permission)
            dbSession.add(useruserfile)
            dbSession.commit()
    
        etcd_client.write(key_path, 3)
        
    return "200"


@app.route('/storage/api/v1.0/syncfile/savefile/<string:user_email>/<string:file_name>', methods=['POST'])
def rest_syncfile_save_file(user_email, file_name):
    print "rest_syncfile_save_file: ..."
    if request.method == 'POST':
        # if file doesnt exists -> logged in user must be bucket_id -> add permission to UserUserfiles
        userfile = dbSession.query(Userfile).filter(Userfile.name == file_name).first()
        user = dbSession.query(User).filter(User.email == user_email).first()
        print("-------------> found user with email : " + user_email + " and bucket id : " + user.get_id())
        if userfile is None:
            if user is None:
                return "403"  # Forbidden
            userfile = Userfile(user.get_id(), file_name)
            useruserfile = UserUserfile(userfile, user, 6)
            dbSession.add(userfile)
            dbSession.add(useruserfile)
            dbSession.commit()

        # if file exists -> check if file_name, user_id is found with right permission in UserUserfiles
        else:
            useruserfile = dbSession.query(UserUserfile).filter(UserUserfile.user_id == user.id,
                                                                UserUserfile.userfile_id == userfile.id).first()
            if useruserfile is None or useruserfile.permission < 6:
                print("return 403")
                return '403'  # redirect(url_for('403'))  # No permission found or permission not sufficient

        content = request.json['content']
        print("-------------------------------------------------------------")
        print("Received an external POST in order to save following file")
        print("content: " + content)
        print("user email: " + user_email)
        print("bucketid: " + str(user.get_id()))
        print("file_name: " + file_name)
        print("-------------------------------------------------------------")

        # TODO Only save this file in a temp file
        # TODO send ACK back

        response = "500"
        if storageinterface.upload_from_text(user.id, file_name, content):
            response = "200"
            file_string = "saveFile/" + str(user.id) + '_' + file_name + '/' + 'ack_' + cloudplatform
            etcd_client = init_etcd_connection()
            etcd_client.write(file_string, 1)

    return response
