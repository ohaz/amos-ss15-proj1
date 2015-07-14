from logging.handlers import HTTPHandler
import json
import requests

class CustomHTTPHandler(HTTPHandler):
    """
    A class which sends records to a Web server, using either GET or
    POST semantics.
    """

    def emit(self, record):
        """
        Emit a record.
        Send the record to the Web server as a percent-encoded dictionary

        :param record record: A record containing content to send.
        """
        url = self.url
        d = self.mapLogRecord(record)
        headers = {'content-type': 'application/json'}
        requests.post(self.host+url, data=str(d['msg']), headers=headers)