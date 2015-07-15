import threading
from config import etcd_member
import etcd
from etcd import EtcdException
from config import cloudplatform


class EtcdDBListener(threading.Thread):

    def __init__(self, version_prefix):
        threading.Thread.__init__(self)
        self.version_prefix = version_prefix

    def run(self):
        client = init_etcd_connection()
        while 1:
            try:
                new_item = client.read(self.version_prefix, recursive=True, wait=True)
                pattern = "/ack_"+cloudplatform
                key_level = new_item.key.split("/")
                if new_item.action == "delete":
                    continue
                if pattern in new_item.key:
                    continue
                elif "/commit" in new_item.key:
                    continue
                elif len(key_level) == 3:
                    ack_key = new_item.key+'/ack_'+cloudplatform
                    print "EtcdDBListener.run: ACK Key: " + ack_key
                    client.write(ack_key, 1)
            except EtcdException:
                continue


def init_etcd_connection():
    print "EtcdDBListener.init_etcd_connection: etcd member 0: " + etcd_member[0]
    etcd_client = etcd.Client(host=etcd_member[0], protocol='http', port=4001, allow_reconnect=True)
    # etcd_client.machines
    return etcd_client




"""
curl -L http://127.0.0.1:4001/v2/keys/dir -XPUT -d ttl=30 -d dir=true

"""


