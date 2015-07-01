"""
This script runs the FlaskWebProject application using a development server.
"""

from os import environ
from FlaskWebProject import app

if __name__ == '__main__':
    HOST = environ.get('SERVER_HOST', 'localhost')
    try:
        PORT = int(environ.get('SERVER_PORT', '5555'))
    except ValueError:
        PORT = 5555

    app.run(HOST, PORT, debug=True, threaded=True)
    #app.run(HOST, PORT, debug=True)

"""
from tornado.wsgi import WSGIContainer
from tornado.httpserver import HTTPServer
from tornado.ioloop import IOLoop
from FlaskWebProject import app

http_server = HTTPServer(WSGIContainer(app))
http_server.listen(5555)
IOLoop.instance().start()

"""
"""
from gevent.wsgi import WSGIServer
from FlaskWebProject import app

http_server = WSGIServer(('', 5555), app)
http_server.serve_forever()
"""