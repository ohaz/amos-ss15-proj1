from config import cloudplatform
import azurestorage
import googlestorage
import awsstorage


def get_storage_adapter():
    if cloudplatform == "google":
        return googlestorage
    elif cloudplatform == "aws":
        return awsstorage
    elif cloudplatform == "azure":
        return azurestorage

#
# Create a new container for files
#
def create_container(userID):
    return get_storage_adapter().create_container(userID)

def container_exists(container):
    return get_storage_adapter().container_exists(container)

def file_exists(container, filename):
    return get_storage_adapter().file_exists(container, filename)

def list_files(container):
    return get_storage_adapter().list_files(container)

def delete_file(container, filename):
    get_storage_adapter().delete_file(container, filename)

def delete_container(container):
    get_storage_adapter().delete_container(container)

def upload_from_path(container, path):
    get_storage_adapter().upload_from_path(container, path)

def upload_from_text(container, filename, text):
    get_storage_adapter().upload_from_text(container, filename, text)