import BaseHTTPServer
import cgi
import urlparse
import thread
import requests
from FlaskWebProject import auto_logger
from config import SLACK_HANDLER_HOST
import sys
import json

HOST_NAME = 'localhost'
PORT_NUMBER = int(SLACK_HANDLER_HOST.split(':')[2])

search_for = {"username": "testing", "text": "Exception in [bug]: integer division or modulo by zero", "icon_emoji": "ghost", "icon": "ghost"}

my_errors = []

class MyHandler(BaseHTTPServer.BaseHTTPRequestHandler):
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
            if len(my_errors) > 0 and search_for in my_errors:
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

@auto_logger
def bug():
    """ Cause a bug to test logging """
    a = 5/0

def start_server():
    """ Starts a server in background that waits for the logging request and saves it """
    server_class = BaseHTTPServer.HTTPServer
    httpd = server_class((HOST_NAME, PORT_NUMBER), MyHandler)
    try:
            httpd.serve_forever()
    except Exception:
            pass
    httpd.server_close()

if __name__ == '__main__':
    """ Start testing """

    # Testing logging
    thread.start_new_thread(start_server,())
    print(" >>> Trying to reach test server and initialize the test")
    i = 0
    while i < 1000:
        try:
            r = requests.get('http://'+':'.join([HOST_NAME,str(PORT_NUMBER)])+'/init/', data="")
            if r.status_code == 200:
                break
        except Exception, e:
            pass
        i += 1
    else:
        print(" >>> Failed. Could not connect to test server")
        sys.exit(-1)

    print(" >>> Testing error logging")
    try:
        bug()
    except:
        pass
    r = requests.get('http://'+':'.join([HOST_NAME,str(PORT_NUMBER)])+'', data="")
    print("")
    if r.status_code == 200:
        print(" >>> Test [Passed]")
    else:
        print(" >>> Test [Failed]")
        sys.exit(-1)