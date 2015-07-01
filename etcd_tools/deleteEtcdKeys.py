import sys
sys.path.append("..")
import etcd
from config import etcd_member

client = etcd.Client(host=etcd_member[0], protocol='http', port=4001, allow_reconnect=True)

directory = client.get("/registerUser")




def deleteChildren(client, directory, base_directory):
    print "BASE DIRECTORY: " + base_directory
    for child in directory.children:
        if child.dir:
            print "child is a directory with key: " + child.key
            next_dir = client.get(child.key)
            if not next_dir._children and next_dir.key != base_directory:
                client.delete(next_dir.key, dir=True)
                continue
            else:
                deleteChildren(client, next_dir, base_directory)
        else:
            client.delete(child.key)
            print "deleted child with key: " + child.key
    #aktualisiere childrens
    directory = client.get(directory.key)
    if not directory._children and directory.key != base_directory :
        print "dir with key is empty: " + directory.key
        client.delete(directory.key, dir=True)
        print "deleted directory with key: " + directory.key


if directory._children == []:
    print "Tree is empty"
else:
    deleteChildren(client, directory, directory.key)
