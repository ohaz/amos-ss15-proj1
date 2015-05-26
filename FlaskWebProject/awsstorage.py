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
def create_container(bucket):
    ret_val = False
    bucketname = AWS_S3_ACCESS_KEY + "_" + str(bucket)
    bucketname = bucketname.lower()
    bucket = s3_conn.create_bucket(bucketname)
    print "bucket successfully created..."
    return bucket

#
# CHECK FUNCTIONS
#
def container_exists(bucket):
    bucketname = AWS_S3_ACCESS_KEY + "_" + str(bucket)
    bucketname = bucketname.lower()
    return bucketname in [x.name for x in s3_conn.get_all_buckets()]

def list_files(bucket):
    bucketname = AWS_S3_ACCESS_KEY + "_" + str(bucket)
    bucketname = bucketname.lower()
    bucket_content = s3_conn.get_bucket(bucketname)
    print "File list from bucket " + bucketname + ":"
    for x in bucket_content:
        print x.name

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
    bucketname = AWS_S3_ACCESS_KEY + "_" + str(bucket)
    bucketname = bucketname.lower()
    bucket_content = s3_conn.get_bucket(bucketname)
    key = bucket_content.get_key(filename)
    key.set_canned_acl(permission)


#
# UPLOAD FILES
#

def upload_from_text(bucket, filename, text):
    bucketname = AWS_S3_ACCESS_KEY + "_" + str(bucket)
    bucketname = bucketname.lower()
    bucket_s3 = s3_conn.get_bucket(bucketname)
    k = Key(bucket_s3)
    k.key = filename
    k.set_contents_from_string(text)
    return True

def upload_from_path(bucket, path):
    bucketname = AWS_S3_ACCESS_KEY + "_" + str(bucket)
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
def download_file_to_path(bucket, filename, path):
    bucketname = AWS_S3_ACCESS_KEY + "_" + str(bucket)
    bucketname = bucketname.lower()
    bucket_s3 = s3_conn.get_bucket(bucketname)
    if file_exists(bucket, filename) is True:
        k = Key(bucket_s3)
        k.key = filename
        k.get_contents_to_filename(path)
        return True
    else:
        return False

def get_download_url(bucket, filename):
    bucketname = AWS_S3_ACCESS_KEY + "_" + str(bucket)
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

def delete_file(bucket, filename):
<<<<<<< HEAD
    bucketname = AWS_S3_ACCESS_KEY + "_" + bucket
=======
    ret_val = False
    bucketname = AWS_S3_ACCESS_KEY + "_" + str(bucket)
>>>>>>> origin/develop
    bucketname = bucketname.lower()
    bucket_content = s3_conn.get_bucket(bucketname)
    k = Key(bucket_content)
    k.key = filename
    bucket_content.delete_key(k)

def delete_container(bucket):
<<<<<<< HEAD
    print "Deleting bucket in process..."
    bucketname = AWS_S3_ACCESS_KEY + "_" + bucket
=======
    ret_val = False
    bucketname = AWS_S3_ACCESS_KEY + "_" + str(bucket)
>>>>>>> origin/develop
    bucketname = bucketname.lower()
    print "This bucket will be deleted: " + bucketname
    bucket_content = s3_conn.get_bucket(bucketname)
    print "getting bucket content..."
    #delete all files in bucket before delete bucket
    for key in bucket_content.list():
        key.delete()
    print "all keys successfully deleted..."
    s3_conn.delete_bucket(bucketname)
    print "deleting bucket successfully"
