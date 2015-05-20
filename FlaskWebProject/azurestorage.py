from azure.storage import BlobService
from config import azure_storage_name, azure_storage_key, azure_storage_url 
import ntpath


blob_service = BlobService(account_name=azure_storage_name, account_key=azure_storage_key)
#
# Create a new container for files
#

def create_container(name, public=True):
    blob_service.create_container(name)
    if public:
        blob_service.set_container_acl(name, x_ms_blob_public_access='container')


#
# UPLOAD FILES
#

def upload_from_path(container, path):
    filename = ntpath.basename(path)
    blob_service.put_block_blob_from_path(container, filename, path)

# Not sure if this is done correctly
def upload_from_file(container, filename):
    blob_service.put_block_blob_from_file(container, filename, filename)

def upload_from_bytes(container, filename, bytes, start=0):
    blob_service.put_block_blob_from_bytes(container, filename, bytes, start)

def upload_from_text(container, filename, text, encoding='utf-8'):
    blob_service.put_block_blob_from_text(container, filename, text, encoding)


#
# DOWNLOAD FILES
#

def download_file_to_path(container, filename, path):
    blob_service.get_blob_to_path(container, filename, path)

def download_file_to_file(container, filename, filestream):
    blob_service.get_blob_to_file(container, filename, filestream)

def download_file_to_bytes(container, filename):
    return blob_service.get_blob_to_bytes(container, filename)

def download_file_to_text(container, filename, encoding='utf-8'):
    return blob_service.get_blob_to_text(container, filename, encoding)

def get_download_url(container, filename):
    url = [x.url for x in blob_service.list_blobs(container, filename)][0]
    return url

#
# DELETE FILES / CONTAINERS
#

def delete_file(container, filename):
    blob_service.delete_blob(container, filename)

def delete_container(container):
    blob_service.delete_container(container)

#
# UTIL
#

def container_exists(container):
    return container in [x.name for x in blob_service.list_containers()]

def file_exists(container, filename):
    return filename in [x.name for x in blob_service.list_blobs(container)]

def list_files(container):
    return blob_service.list_blobs(container)
