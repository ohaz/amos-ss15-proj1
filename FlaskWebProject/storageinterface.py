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
    Args:
        bucketID: container name
    Returns:
        true if succeed
    """
    return storage_adapter.create_container(bucketID)


def container_exists(bucketID):
    """ Check if container with ID exists
    Args:
        bucketID: container name
    Returns:
        true if exists
    """
    return storage_adapter.container_exists(bucketID)


def file_exists(bucketID, filename):
    """ Checks if file in container exists
    Args:
        bucketID: container name
        filename: file to search
    Returns:
        true if exists
    """
    return storage_adapter.file_exists(bucketID, filename)


def list_files(bucketID):
    """ Lists files in specified bucket
    Args:
        bucketID
    Returns:
        List of FileIDs
    """
    return storage_adapter.list_files(bucketID)


def delete_file(bucketID, filename):
    """ delete file from container
    Args:
        bucketID: container name
        filename: file to delete
    Returns:
        true if succeed
    """
    return storage_adapter.delete_file(bucketID, filename)


def delete_container(bucketID):
    """ delete container
    Args:
        bucketID: container name
    Returns:
        true if succeed
    """
    return storage_adapter.delete_container(bucketID)


def upload_from_path(bucketID, path):
    """ Uploads a local file from client to the cloud
    Args:
        bucketID: destination container name
        path: local filepath
    Returns:
        true if succeed
    """
    return storage_adapter.upload_from_path(bucketID, path)


def upload_from_text(bucketID, filename, text):
    """ Uploads text to container in specified file
    Args:
        bucketID: destination container name
        filename: destination file
        text: text to upload
    Returns:
        true if succeed
    """
    return storage_adapter.upload_from_text(bucketID, filename, text)


def download_file_to_path(bucketID, filename, path):
    """ Downloads file from container to local path
    Args:
        bucketID: container name
        filename: file to download
        path: destination local filepath
    Returns:
        true if succeed
    """
    return storage_adapter.download_file_to_path(bucketID, filename, path)


def download_file_to_text(bucketID, filename):
    """ Downloads file from container to text
    Args:
        bucketID: container name
        filename: file to download
    Returns:
        text string
    """
    return storage_adapter.download_file_to_text(bucketID, filename)


def get_download_url(bucketID, filename):
    """ Returns a download for specified file in container
    Args:
        bucketID: container name
        filename: file to download
    Returns:
        text string url
    """
    return storage_adapter.get_download_url(bucketID, filename)
