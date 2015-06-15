import threading
import os
from config import etcd_member
import etcd
from etcd import EtcdKeyNotFound
from etcd import EtcdException
from config import cloudplatform
from config import cloudCounter
from config import cloud_hoster


class EtcdDBListener(threading.Thread):

    def __init__(self, version_prefix):
        threading.Thread.__init__(self)
        self.version_prefix = version_prefix

    def run(self):
        client = init_etcd_connection()
        while 1:
            try:
                new_item = client.read(self.version_prefix, recursive=True, wait=True)
                #TODO: should be exported to new thread
                print "#######################"
                print "New Key: " + new_item.key
                if "/ack_"+cloudplatform in new_item.key:
                    continue
                ack_key = new_item.key+'/ack_'+cloudplatform
                print "ACK Key: " + ack_key
                print "#######################"
                client.write(ack_key, 1)
            except EtcdException:
                continue





def init_etcd_connection():
    etcd_client = etcd.Client(host=etcd_member[0], protocol='http', port=4001, allow_reconnect=True)
    #etcd_client.machines
    return etcd_client




"""
curl -L http://127.0.0.1:4001/v2/keys/dir -XPUT -d ttl=30 -d dir=true

"""



"""
def thread2(arg1, stop_event):
  while(not stop_event.is_set()):
      stop_event.wait(time)
      pass

https://stackoverflow.com/questions/6524459/stopping-a-thread-after-a-certain-amount-of-time

"""

"""
import etcd
from etcd import EtcdKeyNotFound

#connect to leader node
client = etcd.Client(host='54.173.141.200', protocol='http', port=4001)


#list nodes in cluster
print "etcd Cluster contains following machines: "
cluster_nodes = client.machines
for node in cluster_nodes:
    print node

#write value to key, overwrite existing key when option prevExists is not set
#Example for overwrite protection: client.write("/message", "test", prevExist = False)
client.write("/message", "Test Key Value")
print "> > Wrote: Test Key Value to key message"

#read from node
print "> > Read from key: message"
try:
    node_value = client.read("/message").value
    print "Value from key message: " + node_value
except EtcdKeyNotFound:
    print "Reading failed, key not found"

#delete key, throws exception when key not found
print "> > Delete key: message"
try:
    client.delete("/message")
except EtcdKeyNotFound:
    print "Key not found, deleting key failed"





"""