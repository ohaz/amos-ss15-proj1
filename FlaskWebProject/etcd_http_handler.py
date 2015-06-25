import requests
import sys

"""
Exceptions-Hierarchy:

    Etcd_Http_Exception(Exception)
        InvalidParameter
        EtcdException
            Etcd_NotAFile
        Etcd_Cluster_Down

"""

class Etcd_Http_Exception(Exception):
    def __init__(self, message=None):
        super(Exception,self).__init__(message)

class Invalid_Parameter(Etcd_Http_Exception):
    """
    Calling a function with wrong parameters
    """
    def __init__(self, message="Parameter is Invalid"):
        super(Exception,self).__init__(message)

class Etcd_Exception(Etcd_Http_Exception):
    """
    Response of etcd-server has an error
    """
    def __init__(self, message="Etcd-Server responded with an error"):
        super(Exception,self).__init__(message)

class Etcd_NotAFile(Etcd_Exception):
    """
    Not a file exception!
    """
    def __init__(self, message="Not a File!"):
        super(Exception,self).__init__(message)

class Etcd_Cluster_Down(Etcd_Http_Exception):
    """
    Etcd-cluster is down.
    """
    def __init__(self, message="No Etcd-Server in the cluster can be accessed"):
        super(Exception,self).__init__(message)
   
"""
Errorcodes thrown by etcd-server
"""

#see etcd Documentation for this error_codes
error_exception = {
    100: Etcd_Exception, # "Key not found" 
    101: Etcd_Exception, # "Compare failed"
    102: Etcd_NotAFile,  # "Not a file" 
    104: Etcd_Exception, # "Not a directory"
    105: Etcd_Exception, # "Key already exists"
    107: Etcd_Exception, # "Root is read only"
    108: Etcd_Exception, # "Directoy not empty"
    201: Etcd_Exception, # "PrevValue is Required in POST form"
    202: Etcd_Exception, # "The given TTL in POST form is not a number"
    203: Etcd_Exception, # "The given index in POST form is not a number"
    209: Etcd_Exception, # "Invalid field"
    210: Etcd_Exception, # "Invalid POST form"
    300: Etcd_Exception, # "Raft Internal Error"
    301: Etcd_Exception, # "During Leader Election"
    400: Etcd_Exception, # "watcher is cleared due to etcd recovery"
    401: Etcd_Exception, # "The event in requested index is outdated and cleared"
    500: Etcd_Exception  # General Server Error
}

"""
Analyse Server-response
"""

def _handle_response(response) :
    """
    Returns an Exception if response is an error, other wise None

    Args:
        Json-object which is schema of etcd-server
    
    Returns:
        None or Exception-object
    """
    
    # is Http-Message ok, return
    if response.status_code in [200,201]:
        return None
    
    # Http-Message is not ok
    else :
        resp = None
        message = ""
        
        #try to post-process response
        try:
            resp = response.json()
            message = "Code: %d , Meesage: %s, Cause: %s" % (resp["errorCode"],resp["message"],resp["cause"])
        except :
            message = "Can't decipher response [at least needed errorCode, message, cause]: "
            return Etcd_Http_Exception(message + str(response.text))
        else:
            return error_exception[resp["errorCode"]](message)


"""
Connection Manager
"""

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
        print self.cluster_cache

    @property
    def cluster(self):
        uri = "%s/%s/%s" % (self.url, self.ver, 'machines')
        resp = requests.get(uri)
        return [x.encode("utf-8") for x in resp.text.split(', ')]
    
    def write(self, key, value, **kwargs) :
        #print "write"
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
            #print "XXX before: " + self.url
            uri = "%s/%s/keys%s" % (self.url, self.ver, key)
            #print "XXX uri: " + uri
            #print "XXX payload: " + str(payload)
            resp = requests.put(uri,params=payload, allow_redirects=True)
            #print "XXX put:: " + resp.url
            #print "XXX resp:: " + str(resp)
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
        #print "read"
        
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
            #print resp.url
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
        Calls function apropiate for clustermanagment
        
        Args:
            function (function), which sends request, is called in body

        Returns:
            response of server, if valid

        Raises:
            InvalidResponse
        
        """
        
        code = []
        retry = 0
        while True :
            #print self.url
            resp = function()
            
            #potential ErrorMessage
            code += [self.url +":"+ str(resp.status_code)]
            error = _handle_response(resp)
            print(error)

            # is response ok?
            if error is None :
                
                #update machines, because at least 1 machine didn't work
                if retry > 0 : self.cluster_cache = self.cluster   
                return resp.json()
            
            # If the request caused a bad response at etcd, raise it here
            elif isinstance(error, Etcd_Exception) :
                raise error
            
            # If IP not working, get Next server in cluster_cache
            elif retry < len(self.cluster_cache)-1: 
                retry += 1
                self.index = (self.index + 1) % len(self.cluster_cache)
                self.url = self.cluster_cache[self.index]
            
            # All IPs seem to be not working, raise exception
            else :
                raise Etcd_Cluster_Down('The servers responded with %s .' % str(code))

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
    print etcd_member[0].split(":")[0]
    etcd_client = Client(host=etcd_member[0].split(":")[0], protocol='http', port=4001, reconnect=True)
    return etcd_client

def DEBUG_listen_ready_ack(client, user_key):
    counter = 0
    cloud_hoster_local = cloud_hoster
    while 1:
        try:
            if counter == cloudCounter:
                break
            new_item = client.read(user_key, recursive=True, wait=True)
            #TODO: should be exported to new thread
            print "######### Listen to Ready ACKs #######"
            print "New Key: " + new_item['key']
            print "#####################################"
            for cloud in cloud_hoster_local:
                if cloud in new_item["key"] and not cloud_hoster_local[cloud][0]:
                    counter = counter + 1
                    cloud_hoster_local[cloud][0] = True
                    print ">>>listen_ready_ack: counter: " + str(counter)
                else:
                    continue
        except :
            continue
    return cloud_hoster_local

def DEBUGG():
    test_user = 'test_user03'
    
    etcd_client = DEBUG_init_etcd_connection()
    user_string = "registerUser/"+test_user+'/'

    pool_ready_ack = ThreadPool(processes=1)
    async_ready_ack = pool_ready_ack.apply_async(DEBUG_listen_ready_ack, (etcd_client, user_string))
    try:
        etcd_client.write(user_string, "", dir=True)
    except Etcd_NotAFile:
        pool_ready_ack.terminate()
        error = 'etcd: username is already taken'
    else:
        #password = hashlib.sha256(
        #salt.encode() + form.password.data.encode()).hexdigest() + ':' + salt
        
        etcd_cloud_hoster = async_ready_ack.get()

        print "+++++ registerUser: ack listener finished..."

        #data = {
        #'username': form.username.data,
        #'email': form.email.data,
        #'password': password,
        #'sso': 'none'
        #}

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
