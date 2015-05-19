from boto.s3.connection import S3Connection
from boto.s3.key import Key
from config import AWS_S3_ACCESS_KEY, AWS_S3_ACCESS_SECRET
import ntpath

#
# Connection to AWS S3
#
s3_conn = S3Connection(AWS_S3_ACCESS_KEY, AWS_S3_ACCESS_SECRET)

#
# Create a new container for files
#
def create_container(userID):
    bucketname = AWS_S3_ACCESS_KEY + "_" + userID
    bucketname = bucketname.lower()
    bucket = s3_conn.create_bucket(bucketname)
    print "bucket successfully created..."
    return bucket

#
# CHECK FUNCTIONS
#
def container_exists(bucket):
    return bucket in [x.name for x in s3_conn.get_all_buckets()]

def list_files(bucket):
    bucket_content = s3_conn.get_bucket(bucket)
    print "File list from bucket " + bucket + ":"
    for x in bucket_content:
        print x.name

def file_exists(bucket, filename):
    bucket_content = s3_conn.get_bucket(bucket)
    possible_key = bucket_content.get_key(filename)
    if possible_key is not None:
        return True
    else:
        return False

def file_change_permissions(bucket, filename, permission):
    bucket_content = s3_conn.get_bucket(bucket)
    key = bucket_content.get_key(filename)
    key.set_canned_acl(permission)


#
# UPLOAD FILES
#

def upload_from_text(bucket, filename, text):
    bucket_s3 = s3_conn.get_bucket(bucket)
    k = Key(bucket_s3)
    k.key = filename
    k.set_contents_from_string(text)
    return True

def upload_from_path(bucket, path):
    filename = ntpath.basename(path)
    bucket_s3 = s3_conn.get_bucket(bucket)
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
def download_file_to_path(bucket, filename, path):
    bucket_s3 = s3_conn.get_bucket(bucket)
    if file_exists(bucket, filename) is True:
        k = Key(bucket_s3)
        k.key = filename
        k.get_contents_to_filename(path)
        return True
    else:
        return False

def get_download_url(bucket, filename):
    bucket_content = s3_conn.get_bucket(bucket)
    key = bucket_content.get_key(filename)
    if key is not None:
        file_url = key.generate_url(0, query_auth=False, force_http=True)
        return file_url
    else:
        return None


#
# DELETE FILES / CONTAINERS
#

def delete_file(bucket, filename):
    bucket_content = s3_conn.get_bucket(bucket)
    k = Key(bucket_content)
    k.key = filename
    bucket_content.delete_key(k)

def delete_container(bucket):
    bucket_content = s3_conn.get_bucket(bucket)

    #delete all files in bucket before delete bucket
    for key in full_bucket.list():
        key.delete()

    conn.delete_bucket(bucket)
