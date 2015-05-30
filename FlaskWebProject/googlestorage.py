from oauth2client.client import SignedJwtAssertionCredentials  # localServer
from oauth2client.appengine import AppAssertionCredentials     # AppEngine
from httplib2 import Http
# For ClientLibrary-API-access
from apiclient.discovery import build

from apiclient.http import MediaIoBaseUpload, MediaFileUpload
from io import StringIO
import mimetypes

from config import _LOCAL_EXEC_, _PROJ_ID_, client_email_loc, client_email_glob, private_key_file

# import recoverable Exception
from oauth2client.client import AccessTokenRefreshError

# doing nasty reflection-stuff ~
# get All errors of apliclient and except them in all functions
import sys
import inspect
from apiclient.errors import *


#
# UTIL FUNCTIONS
#

def getExceptions():
    ex = []
    for name, obj in inspect.getmembers(sys.modules['apiclient.errors']):
        if inspect.isclass(obj) and issubclass(obj, Exception):
            ex += [obj]
    return ex

# Establish secure connection to Google-Storage-servers
def get_service(service_a, version_a, scope, local=False):
    def checkoutCredentials(scope, loc=False):
        credentials = None
        if local:
            with open(private_key_file) as f:
                private_key = f.read()
            credentials = SignedJwtAssertionCredentials(
                client_email_loc, private_key, scope)
        else:
            credentials = AppAssertionCredentials(scope)
        return credentials
    credentials = checkoutCredentials(scope, loc=local)
    http_auth = credentials.authorize(Http())
    return build(service_a, version_a, http=http_auth)


def get_container(Bucket):
    GS_storage = get_service(GS_service, GS_version, GS_scope, _LOCAL_EXEC_)
    req = GS_storage.buckets().get(bucket=Bucket)
    return req.execute()


def list_container():
    GS_storage = get_service(GS_service, GS_version, GS_scope, _LOCAL_EXEC_)
    req = GS_storage.buckets().list(project=_PROJ_ID_)
    resp = req.execute()
    if 'items' in resp:
        return [str(z['name']) for z in resp['items']]
    else:
        return []


#
# Connection to Google
#
GS_service = 'storage'
GS_version = 'v1'
GS_scope = 'https://www.googleapis.com/auth/devstorage.read_write'
GS_storage = get_service(GS_service, GS_version, GS_scope, _LOCAL_EXEC_)
GS_identifier = 'bnr-id-'
exceptions = tuple(getExceptions())


#
# Create a new container for files
#

def create_container(Bucket, public=True):
    Bucket = GS_identifier+str(Bucket)
    
    global GS_storage
    # Returns if bucket could be deleted,
    # throws Exception if creation of Bucket not possible [example something
    # is left in Bucket]

    def call_create_container(Bucket):
        body = {'kind': 'storage#bucket', 'name': Bucket,
                'storageClass': 'STANDARD', 'location': 'EU'}
        req = GS_storage.buckets().insert(project=_PROJ_ID_, body=body)
        req.execute()

    # try to use current-connection,
    # if not possible get a new connection,
    # if action causes error Return False
    try:
        call_create_container(Bucket)
        return True
    except AccessTokenRefreshError:
        try:
            GS_storage = get_service(
                GS_service, GS_version, GS_scope, _LOCAL_EXEC_)
            call_create_container(Bucket)
            return True
        except exceptions:
            return False
    except exceptions:
        return False


#
# CHECK FUNCTIONS
#

def container_exists(container):
    container = GS_identifier+str(container)
    return container in list_container()


def file_exists(container, filename):
    global GS_storage
    container = GS_identifier+str(container)
    return filename in list_files(container)


def list_files(Bucket):  # list/list_next
    global GS_storage
    Bucket = GS_identifier+str(Bucket)

    def call_list_files(Bucket):
        value = []
        fields_to_return = 'nextPageToken,items(name)'
        req = GS_storage.objects().list(bucket=Bucket, fields=fields_to_return)
        while req is not None:
            resp = req.execute()
            value += [resp]
            req = GS_storage.objects().list_next(req, resp)
        items = []
        if 'items' in value[0]:
            items = [str(k['name']) for k in value[0]['items']]
        return items

    # try to use current-connection,
    # if not possible get a new connection,
    # if action causes error Return False
    try:
        return call_list_files(Bucket)
    except AccessTokenRefreshError:
        try:
            GS_storage = get_service(
                GS_service, GS_version, GS_scope, _LOCAL_EXEC_)
            return call_list_files(Bucket)
        except exceptions:
            return None
    except exceptions:
        return None


#
# UPLOAD FILES
#

def upload_from_text(Bucket, Filename, File):
    global GS_storage
    Bucket = GS_identifier+str(Bucket)

    def call_upload_file(Bucket, Filename, File):  # get MEDIA
        FileObject = StringIO(File)
        media_body = MediaIoBaseUpload(
            FileObject, mimetype='text/plain', resumable=True)
        req = GS_storage.objects().insert(
            bucket=Bucket, name=Filename, media_body=media_body)
        resp = None
        while resp is None:
            resp = req.next_chunk()
        return resp

    # try to use current-connection,
    # if not possible get a new connection,
    # if action causes error Return False
    try:
        call_upload_file(Bucket, Filename, File)
        return True
    except AccessTokenRefreshError:
        try:
            GS_storage = get_service(
                GS_service, GS_version, GS_scope, _LOCAL_EXEC_)
            call_upload_file(Bucket, Filename, File)
            return True
        except exceptions:
            return False
    except exceptions:
        return False


def upload_from_path(Bucket, path):
    global GS_storage
    Bucket = GS_identifier+str(Bucket)

    def call_upload_file(Bucket, Filename):  # get MEDIA
        (_type_, encoding) = mimetypes.guess_type(Filename)
        if _type_ is None:
            _type_ = 'text/plain'
        GS_storage = get_service(
            GS_service, GS_version, GS_scope, _LOCAL_EXEC_)
        media_body = MediaFileUpload(path, mimetype=_type_, resumable=True)
        req = GS_storage.objects().insert(
            bucket=Bucket, name=path, media_body=media_body)
        resp = None
        while resp is None:
            resp = req.next_chunk()
        return resp

    # try to use current-connection,
    # if not possible get a new connection,
    # if action causes error Return False
    try:
        call_upload_file(Bucket, path)
        return True
    except AccessTokenRefreshError:
        try:
            GS_storage = get_service(
                GS_service, GS_version, GS_scope, _LOCAL_EXEC_)
            call_upload_file(Bucket, path)
            return True
        except exceptions:
            return False
    except exceptions:
        return False


#
# DOWNLOAD FILES
#

def download_file_to_text(Bucket, Filename):
    global GS_storage
    Bucket = GS_identifier+str(Bucket)

    def call_get_file(Bucket, Filename):  # get MEDIA
        storage = get_service(GS_service, GS_version, GS_scope, _LOCAL_EXEC_)
        req = storage.objects().get_media(bucket=Bucket, object=Filename)
        return req.execute()  # returns a string

    # try to use current-connection,
    # if not possible get a new connection,
    # if action causes error Return False
    try:
        return call_get_file(Bucket, Filename)
    except AccessTokenRefreshError:
        try:
            GS_storage = get_service(
                GS_service, GS_version, GS_scope, _LOCAL_EXEC_)
            return call_get_file(Bucket, Filename)
        except exceptions:
            return None
    except exceptions:
        return None


def get_download_url(Bucket, FileName):
    global GS_storage
    Bucket = GS_identifier+str(Bucket)

    def call_get_file_meta(Bucket, Filename):  # get MEDIA
        storage = get_service(GS_service, GS_version, GS_scope, _LOCAL_EXEC_)
        req = storage.objects().get(bucket=Bucket, object=Filename)
        return req.execute()

    # try to use current-connection,
    # if not possible get a new connection,
    # if action causes error Return False
    try:
        meta = call_get_file_meta(Bucket, Filename)
        if 'destination' in meta and 'mediaLink' in meta['destination']:
            return meta['destination']['mediaLink']
        return None
    except AccessTokenRefreshError:
        try:
            GS_storage = get_service(
                GS_service, GS_version, GS_scope, _LOCAL_EXEC_)
            meta = call_get_file_meta(Bucket, Filename)
            if 'destination' in meta and 'mediaLink' in meta['destination']:
                return meta['destination']['mediaLink']
            return None
        except exceptions:
            return None
    except exceptions:
        return None


def download_file_to_path(Bucket, Filename):
    Bucket = GS_identifier+str(Bucket)
    return False

    # TODO This code may be adapted to work like anticipated, but for
    # commit-reasons it stays in the code until further notice

    # global GS_storage
    # def call_get_file(Bucket, Filename): #get MEDIA
    #    storage = get_service(GS_service,GS_version,GS_scope,_LOCAL_EXEC_)
    #    req = storage.objects().get_media(bucket=Bucket,object=Filename)
    # content = req.execute() # returns a string
    #    with open(Filename,'w') as hdl:
    #        hdl.write(content)

    # try to use current-connection,
    # if not possible get a new connection,
    # if action causes error Return False
    # try:
    #    call_get_file(Bucket,Filename)
    #    return True
    # except AccessTokenRefreshError:
    #    try:
    #        GS_storage = get_service(GS_service,GS_version,GS_scope,_LOCAL_EXEC_)
    #        call_get_file(Bucket,Filename)
    #        return True
    #    except exceptions:
    #        return False
    # except exceptions:
    #    return False


#
# DELETE FILES / CONTAINERS
#

def delete_container(Bucket):
    global GS_storage
    Bucket = GS_identifier+str(Bucket)

    # Returns if bucket could be deleted,
    # throws Exception if deletion of Bucket not possible [example something
    # is left in Bucket]

    def call_delete_container(Bucket):
        req = GS_storage.buckets().delete(bucket=Bucket)
        for k in list_files(Bucket):
            if not delete_file(Bucket, k):
                raise exceptions[0]
        req.execute()

    # try to use current-connection,
    # if not possible get a new connection,
    # if action causes error Return False
    try:
        call_delete_container(Bucket)
        return True
    except AccessTokenRefreshError:
        try:
            GS_storage = get_service(
                GS_service, GS_version, GS_scope, _LOCAL_EXEC_)
            call_delete_container(Bucket)
            return True
        except exceptions:
            return False
    except exceptions:
        return False


def delete_file(Bucket, Filename):
    global GS_storage
    Bucket = GS_identifier+str(Bucket)
    # Returns if bucket could be deleted,
    # throws Exception if deletion of Bucket not possible [example something
    # is left in Bucket]

    def call_delete_file(Bucket, Filename):
        req = GS_storage.objects().delete(bucket=Bucket, object=Filename)
        req.execute()

    # try to use current-connection,
    # if not possible get a new connection,
    # if action causes error Return False
    try:
        call_delete_file(Bucket, Filename)
        return True
    except AccessTokenRefreshError:
        try:
            GS_storage = get_service(
                GS_service, GS_version, GS_scope, _LOCAL_EXEC_)
            call_delete_file(Bucket, Filename)
            return True
        except exceptions:
            return False
    except exceptions:
        return False


#
# Unimplemented FUNCTIONS
#

def patch_container(Bucket):
    raise NotImplementedError


def update_container(Bucket):
    raise NotImplementedError


def compose_file():  # compose META/MEDIA
    raise NotImplementedError


def copy_file():  # copy META/MEDIA
    raise NotImplementedError


def patch_file():
    raise NotImplementedError


def rewrite_file():  # rewrite META/MEDIA
    raise NotImplementedError


def update_file():  # update META/MEDIA
    raise NotImplementedError


def watchAll_file():
    raise NotImplementedError

