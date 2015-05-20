from oauth2client.client import SignedJwtAssertionCredentials #localServer
from oauth2client.appengine import AppAssertionCredentials    #AppEngine
from httplib2 import Http
from apiclient.discovery import build                         #For ClientLibrary-API-access

from apiclient.http import MediaIoBaseUpload, MediaFileUpload
from io import BytesIO

from config import _LOCAL_EXEC_, _PROJ_ID_, client_email_loc, client_email_glob, private_key_file


# TODO 
#   - handle Exceptions! [try: XXX except: client.AccessTokenRefreshError]
#   - specifi calls, such that API-calls can be taken with full arguments
#   - only create a storage_device if old one is expired, therfore more actions can be done with one device
#   - Authentification! -- public modifiers etc.!

def get_service(service_a,version_a,scope,local=False):
    def checkoutCredentials(scope,loc=False) :
        credentials = None
        if local :
            with open(private_key_file) as f:
                private_key = f.read()
            credentials = SignedJwtAssertionCredentials(client_email_loc, private_key,scope)
        else:
            credentials = AppAssertionCredentials(scope)
        return credentials
    credentials = checkoutCredentials(scope,loc=local)
    http_auth = credentials.authorize(Http()) 
    return build(service_a, version_a, http=http_auth)


# Variables
GS_service = 'storage'
GS_version = 'v1'
GS_scope = 'https://www.googleapis.com/auth/devstorage.read_write'

#
# BUCKET - schnittstelle [NoAccess]
#
def create_container(Bucket, public=True):
    storage = get_service(GS_service,GS_version,GS_scope,_LOCAL_EXEC_)
    body = {'kind':'storage#bucket','name': Bucket,'storageClass':'STANDARD','location':'EU'}
    req = storage.buckets().insert(project=_PROJ_ID_,body=body)
    return req.execute()

def delete_container(Bucket):
    storage = get_service(GS_service,GS_version,GS_scope,_LOCAL_EXEC_)
    req = storage.buckets().delete(bucket=Bucket)
    for k in list_files(Bucket):
        delete_file(Bucket,k)
    return req.execute()

def get_container(Bucket):
    storage = get_service(GS_service,GS_version,GS_scope,_LOCAL_EXEC_)
    req = storage.buckets().get(bucket=Bucket)
    return req.execute()

def container_exists(container): #C-C-C COMBO BREAKER!
    return container in list_container()

def list_container():
    storage = get_service(GS_service,GS_version,GS_scope,_LOCAL_EXEC_)
    req = storage.buckets().list(project=_PROJ_ID_)
    resp = req.execute()
    return [str(z['name']) for z in resp['items']]

def patch_container(Bucket):
    raise NotImplementedError

def update_container(Bucket):
    raise NotImplementedError

#
#OBJECTS - schnittstelle [NoAccess]
#

def compose_file(): #compose META/MEDIA
    raise NotImplementedError
def copy_file(): #copy META/MEDIA
    raise NotImplementedError

def delete_file(Bucket,Filename):
    storage = get_service(GS_service,GS_version,GS_scope,_LOCAL_EXEC_)    
    req = storage.objects().delete(bucket=Bucket,object=Filename)
    return req.execute()

def get_file(Bucket, Filename, media=True): #get META/MEDIA
    storage = get_service(GS_service,GS_version,GS_scope,_LOCAL_EXEC_)    
    req = None
    if media :
        req = storage.objects().get_media(bucket=Bucket,object=Filename)
    else :
        req = storage.objects().get(bucket=Bucket,object=Filename)
    return req.execute() 

def file_exists(container, filename):
    return filename in list_files(container)

def insert_file(Bucket, Filename, File, FileMime='text/plain'): #insert META/MEDIA
    storage = get_service(GS_service,GS_version,GS_scope,_LOCAL_EXEC_)    
    
    FileObject = BytesIO(File)
    media_body = MediaIoBaseUpload(FileObject, mimetype=FileMime, resumable=True)  
    req = storage.objects().insert(bucket=Bucket,name=Filename,media_body=media_body)
    resp = None
    while resp is None :
        resp = req.next_chunk()
    return resp

def upload_from_path(Bucket, path):
    FileMime='text/plain' #HACK XXX FIXME TODO
    storage = get_service(GS_service,GS_version,GS_scope,_LOCAL_EXEC_) 
    media_body = MediaFileUpload(path, mimetype=FileMime, resumable=True)  
    req = storage.objects().insert(bucket=Bucket,name=path,media_body=media_body)
    resp = None
    while resp is None :
        resp = req.next_chunk()
    return resp

def upload_from_text(container, filename, text):
    insert_file(container,filename,text)

def list_files(Bucket): # list/list_next
    storage = get_service(GS_service,GS_version,GS_scope,_LOCAL_EXEC_)    
    value = []
    fields_to_return = 'nextPageToken,items(name)'
    req = storage.objects().list(bucket=Bucket,fields=fields_to_return)
    while req is not None :
        resp = req.execute()
        value += [resp]
        req = storage.objects().list_next(req, resp)
    items = []
    if 'items' in value[0]:
        items = [str(k['name']) for k in value[0]['items']]
    return items

def patch_file():  
    raise NotImplementedError
def rewrite_file():#rewrite META/MEDIA
    raise NotImplementedError
def update_file(): #update META/MEDIA
    raise NotImplementedError
def watchAll_file():
    raise NotImplementedError


#
# DEBUGG - functions
#
def test_google_storage_handler() :
    test_bucket = 'id_debugg'
    delete, create = True, True

    value = ""
    
    #CREATE Container
    if create:
        value += "<br/>################### CONTAINER ##################<br/>"
        value += str(list_container())
        value += "<br/>################################################<br/>"
        
        value += "<br/>################### CONTAINER ##################<br/>"
        value += str(container_exists(test_bucket))
        value += "<br/>################################################<br/>"
        


        value += "<br/>################### CONTAINER ##################<br/>"
        value += str(create_container(test_bucket))
        value += "<br/>################################################<br/>"
        
        value += "<br/>################### CONTAINER ##################<br/>"
        value += str(list_container())
        value += "<br/>################################################<br/>"
        
        value += "<br/>################### CONTAINER ##################<br/>"
        value += str(container_exists(test_bucket))
        value += "<br/>################################################<br/>"
    
   
    #CREATE FILES
    value += "<br/>###################    id-0   ##################<br/>"
    value += str(get_container(test_bucket))
    value += "<br/>################################################<br/>"
    
    value += "<br/>################### id-0 tmp.txt ###############<br/>"
    value += str(list_files(test_bucket))
    value += "<br/>################################################<br/>"
    
    
    value += "<br/>############# id-0 insert_test.txt #############<br/>"
    value += str(upload_from_path(test_bucket,'tmp_media.txt'))
    value += "<br/>################################################<br/>"
    
    value += "<br/>############# id-0 replace_test.txt #############<br/>"
    value += str(upload_from_text(test_bucket,'tmp_media_duplo.txt','This is a Ludicrious Test, this should hopefully work. [This is new Text by the Way]'))
    value += "<br/>################################################<br/>" 

    value += "<br/>################### id-0 tmp.txt ###############<br/>"
    value += str(list_files(test_bucket))
    value += "<br/>################################################<br/>"

    value += "<br/>###################    id-0   ##################<br/>"
    value += str(get_file(test_bucket,'tmp_media.txt'))
    value += "<br/>################################################<br/>"
    
    value += "<br/>###################    id-0   ##################<br/>"
    value += str(get_file(test_bucket, 'tmp_media_duplo.txt'))
    value += "<br/>################################################<br/>"
    
    value += "<br/>############# id-0 remove_test.txt #############<br/>"
    value += str(delete_file(test_bucket,'tmp_media.txt'))
    value += "<br/>################################################<br/>"
    
    value += "<br/>################### id-0 tmp.txt ###############<br/>"
    value += str(list_files(test_bucket))
    value += "<br/>################################################<br/>"
    
    if delete: 
        ## DELETE CONTAINER
        value += "<br/>###################    id-0   ##################<br/>"
        value += str(get_container(test_bucket))
        value += "<br/>################################################<br/>"

        value += "<br/>################### CONTAINER ##################<br/>"
        value += str(delete_container(test_bucket))
        value += "<br/>################################################<br/>"
         
        value += "<br/>################### CONTAINER ##################<br/>"
        value += str(list_container())
        value += "<br/>################################################<br/>"

        value += "<br/>################### CONTAINER ##################<br/>"
        value += str(container_exists(test_bucket))
        value += "<br/>################################################<br/>"
     
    return value

