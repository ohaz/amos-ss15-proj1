from boto.s3.connection import S3Connection
from boto.s3.key import Key
from boto.exception import S3CreateError, S3ResponseError
from config import AWS_S3_ACCESS_KEY, AWS_S3_ACCESS_SECRET
import ntpath

#
# Connection to AWS S3
# Create a connection to S3 with user credentials
# Default Storage point is in the US. It`s possible to change it
#
s3_conn = S3Connection(AWS_S3_ACCESS_KEY, AWS_S3_ACCESS_SECRET)

#
# Create a new container for files
# Overwrite existing bucket with the same name in own namespace
#
def create_container(bucket):
    ret_val = False
    bucketname = AWS_S3_ACCESS_KEY + "_" + bucket
    bucketname = bucketname.lower()
    try:
        bucket = s3_conn.create_bucket(bucketname)
    except S3CreateError:
        print "error by creating bucket..."
        return ret_val
    if bucket is not None:
        ret_val = True
        print "bucket successfully created..."
    return ret_val

#
# CHECK FUNCTIONS
#
def container_exists(bucket):
    bucketname = AWS_S3_ACCESS_KEY + "_" + bucket
    bucketname = bucketname.lower()
    return bucketname in [x.name for x in s3_conn.get_all_buckets()]

# return a list with the names of all files in the bucket 
def list_files(bucket):
    bucketname = AWS_S3_ACCESS_KEY + "_" + bucket
    bucketname = bucketname.lower()
    bucket_content = s3_conn.get_bucket(bucketname)
    bucket_files = [x.name for x in bucket_content]    
    return bucket_files

def file_exists(bucket, filename):
    bucketname = AWS_S3_ACCESS_KEY + "_" + bucket
    bucketname = bucketname.lower()
    bucket_content = s3_conn.get_bucket(bucketname)
    possible_key = bucket_content.get_key(filename)
    if possible_key is not None:
        return True
    else:
        return False

def file_change_permissions(bucket, filename, permission):
    bucketname = AWS_S3_ACCESS_KEY + "_" + bucket
    bucketname = bucketname.lower()
    bucket_content = s3_conn.get_bucket(bucketname)
    key = bucket_content.get_key(filename)
    key.set_canned_acl(permission)


#
# UPLOAD FILES
#

# create a file with the specific filename and upload the string into
def upload_from_text(bucket, filename, text):
    bucketname = AWS_S3_ACCESS_KEY + "_" + bucket
    bucketname = bucketname.lower()
    bucket_s3 = s3_conn.get_bucket(bucketname)
    k = Key(bucket_s3)
    k.key = filename
    k.set_contents_from_string(text)
    return True

# upload a file from specific path into a bucket
# before uploading the data, it will be checked if the file exists
# if the file exists the upload will fail
def upload_from_path(bucket, path):
    bucketname = AWS_S3_ACCESS_KEY + "_" + bucket
    bucketname = bucketname.lower()
    filename = ntpath.basename(path)
    bucket_s3 = s3_conn.get_bucket(bucketname)
    if file_exists(bucket, filename) is False:
        k = Key(bucket_s3)
        k.key = filename
        k.set_contents_from_filename(path)
        return True
    else:
        return False


#
# DOWNLOAD FILES
#

# download file to path from S3
def download_file_to_path(bucket, filename, path):
    bucketname = AWS_S3_ACCESS_KEY + "_" + bucket
    bucketname = bucketname.lower()
    bucket_s3 = s3_conn.get_bucket(bucketname)
    if file_exists(bucket, filename) is True:
        k = Key(bucket_s3)
        k.key = filename
        k.get_contents_to_filename(path)
        return True
    else:
        return False

# get the download link from specific file
# it`s only accessable when the permissons are set to public.
# default permissions are only to the user not public
def get_download_url(bucket, filename):
    bucketname = AWS_S3_ACCESS_KEY + "_" + bucket
    bucketname = bucketname.lower()
    bucket_content = s3_conn.get_bucket(bucketname)
    key = bucket_content.get_key(filename)
    if key is not None:
        file_url = key.generate_url(0, query_auth=False, force_http=True)
        return file_url
    else:
        return None


#
# DELETE FILES / CONTAINERS
#

# delete file from bucket, existing from file will be checked
def delete_file(bucket, filename):
    ret_val = False
    bucketname = AWS_S3_ACCESS_KEY + "_" + bucket
    bucketname = bucketname.lower()
    bucket_content = s3_conn.get_bucket(bucketname)
    k = Key(bucket_content)
    k.key = filename
    bucket_content.delete_key(k)
    if not file_exists(bucket, filename):
        ret_val = True
    else:
        ret_val = False
    return ret_val


def delete_container(bucket):
    ret_val = False
    bucketname = AWS_S3_ACCESS_KEY + "_" + bucket
    bucketname = bucketname.lower()
    try:
        bucket_content = s3_conn.get_bucket(bucketname)
    except S3ResponseError:
        return True
    # Container must be empty before it can be delete --> delete all containing files
    for key in bucket_content.list():
        key.delete()
    s3_conn.delete_bucket(bucketname)
    if not container_exists(bucket):
        ret_val = True
    else:
        ret_val = False
    return ret_val
