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
    """
    Method to create a new bucket

    :param string name: the name of the bucket
    :param boolean public: toggle to make container public or private
    :return boolean: true if success
    """
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
    """
    Method to determine if a bucket exists

    :param string container: the name of the bucket
    :return boolean: true if exists
    """
    container = prefix + str(container)
    return container in [x.name for x in blob_service.list_containers()]


def file_exists(container, filename):
    """
    Method to determine if a file exists in a bucket

    :param string bucket: the name of the bucket
    :param string filename: name of the file
    :return boolean: true if exists
    """
    container = prefix + str(container)
    return filename in [x.name for x in blob_service.list_blobs(container)]


def list_files(container):
    """
    Method to list all files in a bucket

    :param string container: the name of the bucket
    :return list: list of all files
    """
    container = prefix + str(container)
    return [x.name for x in blob_service.list_blobs(container).blobs]


def list_containers():
    return [x.name for x in blob_service.list_containers()]


#
# UPLOAD FILES
#

def upload_from_path(container, path):
    """
    Method to upload a file from a path

    :param string container: the name of the bucket
    :param string path: path of the file
    """
    container = prefix + str(container)
    filename = ntpath.basename(path)
    blob_service.put_block_blob_from_path(container, filename, path)


# Not sure if this is done correctly
def upload_from_file(container, filename):
    """
    Method to upload a file from a file

    :param string container: the name of the bucket
    :param string path: path of the file
    """
    container = prefix + str(container)
    blob_service.put_block_blob_from_file(container, filename, filename)


def upload_from_bytes(container, filename, bytes, start=0):
    """
    Method to upload a file from bytes

    :param string container: the name of the bucket
    :param string filename: path of the file
    :param bytes bytes: the bytes to upload
    :param int start: the start offset
    """
    container = prefix + str(container)
    blob_service.put_block_blob_from_bytes(container, filename, bytes, start)


def upload_from_text(container, filename, text, encoding='utf-8'):
    """
    Method to upload a file from text

    :param string container: the name of the bucket
    :param string filename: name of the file
    :param string text: the text to save in the file
    :param string encoding: the encoding to use
    :return boolean: true if success
    """
    container = prefix + str(container)
    blob_service.put_block_blob_from_text(container, filename, text, encoding)
    return True


#
# DOWNLOAD FILES
#

def download_file_to_path(container, filename, path):
    """
    Method to download a file to a path

    :param string container: the name of the bucket
    :param string filename: the name of the file
    :param string path: path of the file
    """
    container = prefix + str(container)
    blob_service.get_blob_to_path(container, filename, path)


def download_file_to_file(container, filename, filestream):
    """
    Method to download a file to a file

    :param string container: the name of the bucket
    :param string filename: the name of the bucket
    :param stream filestream: the stream to download to
    """
    container = prefix + str(container)
    blob_service.get_blob_to_file(container, filename, filestream)


def download_file_to_bytes(container, filename):
    """
    Method to download a file to bytes
    
    :param string container: the name of the bucket
    :param string filename: the name of the bucket
    :return bytes: the bytes downloaded
    """
    container = prefix + str(container)
    return blob_service.get_blob_to_bytes(container, filename)


def download_file_to_text(container, filename, encoding='utf-8'):
    """
    Method to download a file to text

    :param string bucket: the name of the bucket
    :param string filename: the name of the file
    :param string encoding: the encoding to use
    :return string: the content of the file
    """
    container = prefix + str(container)
    return blob_service.get_blob_to_text(container, filename, encoding)


def get_download_url(container, filename):
    """
    Method to get the download url of a file

    :param string container: the name of the bucket
    :param string filename: the name of the file
    :return string: URL of the file
    """
    container = prefix + str(container)
    url = [x.url for x in blob_service.list_blobs(container, filename)][0]
    return url


#
# DELETE FILES / CONTAINERS
#

def delete_file(container, filename):
    """
    Method to delete a file

    :param string container: the name of the bucket
    :param string filename: the name of the file
    :return boolean: true if success
    """
    container = prefix + str(container)
    try:
        blob_service.delete_blob(container, filename)
        return True
    except:
        return False


def delete_container(container):
    """
    Method to delete a container

    :param string container: the name of the bucket
    :return boolean: true if success
    """
    container = prefix + str(container)
    try:
        blob_service.delete_container(container)
        return True
    except:
        return False
