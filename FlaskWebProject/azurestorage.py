from azure.storage import BlobService
from config import azure_storage_name, azure_storage_key
import ntpath

#
# Connection to Azure
#

blob_service = BlobService(account_name=azure_storage_name, account_key=azure_storage_key)
prefix = "amos-"


#
# Create a new container for files
#

def create_container(name, public=True):
    name = prefix + str(name)
    try:
        blob_service.create_container(name)
        if public:
            blob_service.set_container_acl(name, x_ms_blob_public_access='container')
    except:
        return False
    return True


#
# CHECK FUNCTIONS
#

def container_exists(container):
    container = prefix + str(container)
    return container in [x.name for x in blob_service.list_containers()]


def file_exists(container, filename):
    container = prefix + str(container)
    return filename in [x.name for x in blob_service.list_blobs(container)]


def list_files(container):
    container = prefix + str(container)
    return [x.name for x in blob_service.list_blobs(container).blobs]


def list_containers():
    return [x.name for x in blob_service.list_containers()]


#
# UPLOAD FILES
#

def upload_from_path(container, path):
    container = prefix + str(container)
    filename = ntpath.basename(path)
    blob_service.put_block_blob_from_path(container, filename, path)


# Not sure if this is done correctly
def upload_from_file(container, filename):
    container = prefix + str(container)
    blob_service.put_block_blob_from_file(container, filename, filename)


def upload_from_bytes(container, filename, bytes, start=0):
    container = prefix + str(container)
    blob_service.put_block_blob_from_bytes(container, filename, bytes, start)


def upload_from_text(container, filename, text, encoding='utf-8'):
    container = prefix + str(container)
    blob_service.put_block_blob_from_text(container, filename, text, encoding)
    return True


#
# DOWNLOAD FILES
#

def download_file_to_path(container, filename, path):
    container = prefix + str(container)
    blob_service.get_blob_to_path(container, filename, path)


def download_file_to_file(container, filename, filestream):
    container = prefix + str(container)
    blob_service.get_blob_to_file(container, filename, filestream)


def download_file_to_bytes(container, filename):
    container = prefix + str(container)
    return blob_service.get_blob_to_bytes(container, filename)


def download_file_to_text(container, filename, encoding='utf-8'):
    container = prefix + str(container)
    return blob_service.get_blob_to_text(container, filename, encoding)


def get_download_url(container, filename):
    container = prefix + str(container)
    url = [x.url for x in blob_service.list_blobs(container, filename)][0]
    return url


#
# DELETE FILES / CONTAINERS
#

def delete_file(container, filename):
    container = prefix + str(container)
    try:
        blob_service.delete_blob(container, filename)
        return True
    except:
        return False


def delete_container(container):
    container = prefix + str(container)
    try:
        blob_service.delete_container(container)
        return True
    except:
        return False
