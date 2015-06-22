import requests
import sys

class Etcd_Http_Exceptions(Exception):
    """
    This Module Exceptions
    """
    def __init__(self, message=None):
        super(exception,self).__init__(message)

class InvalidResponse(Etcd_Http_Exceptions):
    """
    Response is eiter 4** or 5**
    """
    def __init__(self, message=None):
        super(exception,self).__init__(message)

class InvalidParameter(Etcd_Http_Exceptions):
    """
    Calling a function with wrong parameters
    """
    def __init__(self, message="Parameter is Invalid"):
        super(exception,self).__init__(message)


class Client(object) :
    
    def __init__(self, host='127.0.0.1', port = 4001, protocol='HTTP' , ver = 'v2', reconnect=False) :
        """
        Constructor for Connection-object
        
            host (string): IP-adress of etcd-master
            port (int): Port for connection [usally 4001]
            protocol(string): only HTTP supported [maybe HTTPS?]
            ver(string): current version of api, should be 'v2'
            reconnect(bool): flag, should be attempted to reconnect to other servers in cluster?
        """

        #save init values
        self._host = host
        self._port = port
        self._protocol = protocol
        
        # values later indeed needed
        self.ver = ver
        self.url = "%s://%s:%d" % (self._protocol, self._host, self._port)
        self.index = 0

        if reconnect :
            self.cluster_cache = self.cluster
        else:
            self.cluster_cache = [self.url]
        print(self.cluster_cache)

    @property
    def cluster(self):
        uri = "%s/%s/%s" % (self.url, self.ver, 'machines')
        resp = requests.get(uri)
        return [x.encode("utf-8") for x in resp.text.split(',')]
    
    def write(self, key, value, **kwargs) :
        print ("write")
        key = self._clean_key(key)
        
        if value is not None:
            kwargs['value'] = value
        
        if "dir" in kwargs and kwargs["dir"] :
            if value :
                raise InvalidParameter("Icompatibale Parameters: dir=True with Parameter value != None or """)
        
        # Work to bedone before _requestFunction
        key = self._clean_key(key)
        
        payload = {}
        for (x, y) in kwargs.items():
            if type(y) == bool :
                payload[x] = "true" if y else "false"
            else:
                payload[x] = y
        
        # RequestFunction
        def _request():
            uri = "%s/%s/keys%s" % (self.url, self.ver, key)
            resp = requests.put(uri,params=payload, allow_redirects=True)
            print ("put:: " + resp.url)
            return resp

        # send request, with check on other clusters
        resp = self._connect_to_cluster(_request)
        return resp.json()

    def read(self, key, **kwargs):
        """
        Listen to the key on the etcd-server
        
        Args:
            key (string): string, which specifies key
            "key" = "value" : all etcd params

        Returns:
            json-object, response-format for etcd-query with GET

        Raises:
            InvalidResponse
        
        """
        print ("read")    
        
        # Work to bedone before _requestFunction
        key = self._clean_key(key)
        
        payload = {}
        for (x, y) in kwargs.items():
            if type(y) == bool :
                payload[x] = "true" if y else "false"
            else:
                payload[x] = y
        
        # RequestFunction
        def _request() :
            uri = "%s/%s/keys%s" % (self.url, self.ver, key)
            resp = requests.get(uri, params=payload, allow_redirects=True) 
            print (resp.url)
            return resp

        # send request, with check on other clusters
        resp = self._connect_to_cluster(_request)
        return resp.json()
    
    """
    Util and "private" functions
    """

    def _clean_key(self, key):
        """
        Key should have form '/key'
        """
        if not key[0] == '/' :
            key = '/' + key
        return key

    def _connect_to_cluster(self, function): 
        """
        Listen to the key on the etcd-server
        
        Args:
            function (function), which sends request [use Client parameters!], is called in body

        Returns:
            response of server, if not 4** or 5**

        Raises:
            InvalidResponse
        
        """
        
        code = []
        retry = 0
        while True :
            resp = function()
            
            #potential ErrorMessage
            code += [self.url +":"+ str(resp.status_code)]
            if resp.status_code == requests.codes.ok :

                #update machines, because at least 1 machine didn't work
                if retry > 0 : self.cluster_cache = self.cluster
                return resp
            
            # If IP not working, get Next server in cluster_cache
            elif retry < len(self.cluster_cache)-1:
                retry += 1
                self.index = (self.index + 1) % len(cluster_cache)
                self.url = self.cluster_cache[self.index]
            
            # All IPs seem to be not working, raise exception
            else :
                raise InvalidResponse('The servers responded with %s .' % str(code))




##
## DEBUG
##

from multiprocessing.pool import ThreadPool
from multiprocessing import Process, JoinableQueue
import time

cloudplatform="aws"    
cloud_hoster = {'aws': [False, "127.0.0.1:5555"], 'azure': [False, None], 'google': [False, None]}
etcd_member = ["54.173.139.154:4001"]
cloudCounter = 1
 
 # init etcd connection
def DEBUG_init_etcd_connection():
    print(etcd_member[0].split(":")[0])
    etcd_client = Client(host=etcd_member[0].split(":")[0], protocol='http', port=4001, reconnect=True)
    return etcd_client


def DEBUG_listen_ready_ack(client, user_key):
    print ("Start Threading....\n")
    counter = 0
    cloud_hoster_local = cloud_hoster
    while 1:
        print ("iter\n")
        if counter == cloudCounter:
            break
        new_item = client.read(user_key, recursive=True, wait=True)

        #TODO: should be exported to new thread
        print ("######### Listen to Ready ACKs #######\n")
        print ("New Key: " + new_item['key'] + "\n")
        print ("#####################################\n")
        for cloud in cloud_hoster_local:
            if cloud in new_item["key"] and not cloud_hoster_local[cloud][0]:
                counter = counter + 1
                cloud_hoster_local[cloud][0] = True
    return cloud_hoster_local

def DEBUGG():
    test_user = 'test_user03'
    
    print("Init Connection")
    etcd_client = DEBUG_init_etcd_connection()
    
    user_string = "registerUser/"+test_user+'/'

    print("Start Pool")
    pool_ready_ack = ThreadPool(processes=1)
    async_ready_ack = pool_ready_ack.apply_async(DEBUG_listen_ready_ack, (etcd_client, user_string))
    
    print("Write Key in etcd")
    resp = etcd_client.write(user_string, None, dir=True)
    #time.sleep(5)


    print("Terminate Threads")
    #pool_ready_ack.terminate()

    

    
    #else:
    #    
    #    password = hashlib.sha256(
    #    salt.encode() + form.password.data.encode()).hexdigest() + ':' + salt

    #    #etcd_cloud_hoster = listen_ready_ack(etcd_client, user_string)
    #    etcd_cloud_hoster = async_ready_ack.get()

    #    print "+++++ registerUser: ack listener finished..."

    #    data = {
    #    'username': form.username.data,
    #    'email': form.email.data,
    #    'password': password,
    #    'sso': 'none'
    #    }

    #    #start listener for registration the receiving acks from the clouds
    #    pool_receiving_data = ThreadPool(processes=1)
    #    async_receive_data = pool_receiving_data.apply_async(listen_ack_receiving_data, (etcd_client, etcd_cloud_hoster, user_string))


    #    pool_send_http_data = ThreadPool(processes=1)
    #    #pool_send_http_data.daemon = True
    #    async_send_data = pool_send_http_data.apply_async(send_sync_data, (etcd_cloud_hoster, data, '/storage/api/v1.0/syncdb/registeruser'))
    #    #send_sync_data(etcd_cloud_hoster, data, '/storage/api/v1.0/syncdb/registeruser')
    #    print "+++++ send registration data to clouds"

    #    res_receive_data = async_receive_data.get()
    #    print "+++++ result receiving data: " + str(res_receive_data)

    #    
    #    
    #    commit_string = user_string + 'commit'
    #    if res_receive_data == -1:
    #        etcd_client.write(commit_string, 0)
    #    else:
    #    	pool_ack_written_data = ThreadPool(processes=1)
    #    	etcd_client.write(commit_string, 1)
    #    	async_written_data = pool_ack_written_data.apply_async(listen_ack_written_data, (etcd_client, res_receive_data, user_string))
    #    
    #    written_result = async_written_data.get()

    #    print "+++++ reslut of wirtten data to db: " + str(written_result)
    #    if written_result == -1:
    #        error == '+++++ registration fails, please try it again'
    #    else:
    #        print "+++++ sending was successfull"

    #        # login new user 
    #        dbSession_new = scoped_session(sessionmaker(autocommit=False, bind=dbEngine)) 
    #        user = dbSession_new.query(User).filter(User.username == request.form['username']).first()
    #        dbSession_new.close()
    #        #user = dbSession.query(User).filter(User.username == "test666").first()
    #        #print user
    #        login_user(user)
    #        return redirect(url_for('home'))
    #        
    #return render_template('register.html', form=form, error=error)
