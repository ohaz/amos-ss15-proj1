from config import cloudplatform
#import azurestorage
#import googlestorage
#import awsstorage

storage_adapter = None

if cloudplatform == "google":
    import googlestorage
    storage_adapter = googlestorage
elif cloudplatform == "aws":
    import awsstorage
    storage_adapter = awsstorage
elif cloudplatform == "azure":
    from FlaskWebProject import azurestorage
    storage_adapter = azurestorage

#def get_storage_adapter():
#    if cloudplatform == "google":
#        return googlestorage
#    elif cloudplatform == "aws":
#        return awsstorage
#    elif cloudplatform == "azure":
#        return azurestorage

#
# Create a new container for files
#
def create_container(userID):
    return storage_adapter.create_container(userID)

def container_exists(container):
    return storage_adapter.container_exists(container)

def file_exists(container, filename):
    return storage_adapter.file_exists(container, filename)

def list_files(container):
    return storage_adapter.list_files(container)

def delete_file(container, filename):
    storage_adapter.delete_file(container, filename)

def delete_container(container):
    storage_adapter.delete_container(container)

def upload_from_path(container, path):
    storage_adapter.upload_from_path(container, path)

def upload_from_text(container, filename, text):
    storage_adapter.upload_from_text(container, filename, text)
