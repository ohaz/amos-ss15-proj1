from config import cloudplatform

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


def create_container(bucketID):
    """ Creates Container with given bucketID

    :param string bucketID: container name
    :return boolean: true if succeed
    """
    return storage_adapter.create_container(bucketID)


def container_exists(bucketID):
    """ Check if container with ID exists

    :param string bucketID: container name
    :return boolean: true if exists
    """
    return storage_adapter.container_exists(bucketID)


def file_exists(bucketID, filename):
    """ Checks if file in container exists

    :param string bucketID: container name
    :param string filename: file to search
    :return boolean: true if exists
    """
    return storage_adapter.file_exists(bucketID, filename)


def list_files(bucketID):
    """ Lists files in specified bucket

    :param string bucketID: container name
    :return list: list of FileIDs
    """
    return storage_adapter.list_files(bucketID)


def delete_file(bucketID, filename):
    """ delete file from container

    :param string bucketID: container name
    :param string filename: file to delete
    :return boolean: true if succeed
    """
    return storage_adapter.delete_file(bucketID, filename)


def delete_container(bucketID):
    """ delete container

    :param string bucketID: container name
    :return boolean: true if succeed
    """
    return storage_adapter.delete_container(bucketID)


def upload_from_path(bucketID, path):
    """ Uploads a local file from client to the cloud

    :param string bucketID: container name
    :param string path: local filepath
    :return boolean: true if succeed
    """
    return storage_adapter.upload_from_path(bucketID, path)


def upload_from_text(bucketID, filename, text):
    """ Uploads text to container in specified file

    :param string bucketID: container name
    :param string filename: destination file
    :param string text: text to upload
    :return boolean: true if succeed
    """
    return storage_adapter.upload_from_text(bucketID, filename, text)


def download_file_to_path(bucketID, filename, path):
    """ Downloads file from container to local path
    
    :param string bucketID: container name
    :param string filename: file to download
    :param string path: destination local filepath
    :return boolean: true if succeed
    """
    return storage_adapter.download_file_to_path(bucketID, filename, path)


def download_file_to_text(bucketID, filename):
    """ Downloads file from container to text

    :param string bucketID: container name
    :param string filename: file to download
    :return string: text that got downloaded
    """
    return storage_adapter.download_file_to_text(bucketID, filename)


def get_download_url(bucketID, filename):
    """ Returns a download for specified file in container

    :param string bucketID: container name
    :param string filename: file to download
    :return string: the url to download the file from
    """
    return storage_adapter.get_download_url(bucketID, filename)
