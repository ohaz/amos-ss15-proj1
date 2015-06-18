import BaseHTTPServer
import cgi
import urlparse
import thread
import requests
from FlaskWebProject import auto_logger
from config import SLACK_HANDLER_HOST, cloudplatform
import sys
import json

if cloudplatform != "testing":
    print("I can't test without the testing config!")
    sys.exit(-1)

HOST_NAME = 'localhost'
PORT_NUMBER = int(SLACK_HANDLER_HOST.split(':')[2])

#
# Functions to test.
# To add a new function do the following:
# Write the function with the @auto_logger decorator
# Underneath, add a try/catch that does the same thing.
# In the catch part, call errors_append(<your_function>, str(e))
# 

search_for = []
error_functions = []

def errors_append(function, error):
    search_for.append({"username": "testing", "text": "Exception in ["+function.__name__+"]: "+error, "icon_emoji": "ghost", "icon": "ghost"})
    error_functions.append(function)

@auto_logger
def division_by_zero():
    """ Cause a division by zero to test logging """
    a = 5/0

try:
    a = 5/0
except Exception, e:
    errors_append(division_by_zero, str(e))

@auto_logger
def wrong_import():
    """ Cause a import error to test logging """
    import asuedahgwda

try:
    import asuedahgwda
except Exception, e:
    errors_append(wrong_import, str(e))

@auto_logger
def assert_error():
    """ Cause an assertion error to test logging """
    assert(True == False)

try:
    assert(True == False)
except Exception, e:
    errors_append(assert_error, str(e))

@auto_logger
def index_error():
    """ Cause an indexing error """
    a = ["hello"]
    b = a[2]

try:
    a = ["hello"]
    b = a[2]
except Exception, e:
    errors_append(index_error, str(e))

@auto_logger
def key_error():
    """ Cause a key error in a dictionary """
    a = {"hello": "no"}
    b = a['error']

try:
    a = {"hello": "no"}
    b = a['error']
except Exception, e:
    errors_append(key_error, str(e))

@auto_logger
def call_nonexisting_function_error():
    asdasdkawen()

def wrapper_nonexisting_function():
    asdasdkawen()

try:
    wrapper_nonexisting_function()
except Exception, e:
    errors_append(call_nonexisting_function_error, str(e))


#
# Server side Handling
#

my_errors = []

class MyHandler(BaseHTTPServer.BaseHTTPRequestHandler):
    """ Handler for incomming connections """
    def do_HEAD(s):
        s.send_response(200)
        s.send_header("Content-type", "text/html")
        s.end_headers()
    def do_GET(s):
        global my_errors, search_for
        """Respond to a GET request."""
        if s.path == "/init/":
            """ Initialize the server and make sure that connection worked """
            my_errors = []
            s.send_response(200)
            s.send_header("Content-type", "text/html")
            s.end_headers()
            s.wfile.write("")
        elif s.path == "/":
            """ Return 200 if the error we caused exists, else return 400 """
            if len(my_errors) > 0:
                for error in search_for:
                    if not error in my_errors:
                        print(" >>> Missing "+str(error))
                        s.send_response(400)
                        return
                s.send_response(200)
                s.send_header("Content-type", "text/html")
                s.end_headers()
                s.wfile.write(str(my_errors))
            else:
                s.send_response(400)
        else:
            """ Respond with 200 for all other requests (e.g. favicon) """
            s.send_response(200)
    def do_POST(s):
        """Respond to a POST request."""
        global my_errors
        form = cgi.FieldStorage(
            fp=s.rfile, 
            headers=s.headers,
            environ={'REQUEST_METHOD':'POST',
                     'CONTENT_TYPE':s.headers['Content-Type'],
                     })
        my_errors.append(json.loads(form.value))
        s.send_response(200)
        s.send_header("Content-type", "text/html")

def start_server():
    """ Starts a server in background that waits for the logging request and saves it """
    server_class = BaseHTTPServer.HTTPServer
    httpd = server_class((HOST_NAME, PORT_NUMBER), MyHandler)
    try:
            httpd.serve_forever()
    except Exception:
            pass
    httpd.server_close()

#
# Main part
#

if __name__ == '__main__':
    """ Start testing """

    # Testing logging
    print(" >>> Starting test server")
    thread.start_new_thread(start_server,())
    print(" >>> Trying to reach test server and initialize the test")
    i = 0
    while i < 1000:
        try:
            r = requests.get('http://'+':'.join([HOST_NAME,str(PORT_NUMBER)])+'/init/', data="")
            if r.status_code == 200:
                break
        except:
            pass
        i += 1
    else:
        print(" >>> Failed. Could not connect to test server")
        sys.exit(-1)

    print(" >>> Testing error logging")
    for bug in error_functions:
        try:
            bug()
        except:
            pass
    r = requests.get('http://'+':'.join([HOST_NAME,str(PORT_NUMBER)])+'', data="")
    print("")
    if r.status_code == 200:
        print(" >>> "+str(len(error_functions))+" Tests [Passed]")
    else:
        print(" >>> Tests [Failed]")
        sys.exit(-1)