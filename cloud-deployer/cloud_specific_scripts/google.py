__author__ = 'ohaz/' + 'MacBlub'

import os
import util
import subprocess


##
## UTIL-extension for this Script
##


#
# Deployment - Interface
#

config_files = ["update_script.sh"]
machines_in_cluster = ['google_compute']

def copy_remote():
    source = os.path.join(util.OWN_PATH, 'cloud_specific_files', 'google','compute')
    for machine in machines_in_cluster:
        for file_0 in config_files :
            #scp update_script.sh google_compute:update_script.sh
            command = ["scp",os.path.join(source,file_0), machine+":"+file_0]
            try:
                subprocess.call(command)
            except :
                print("> > > Copy of Deploy_script failed...")

def deploy_remote():
    branch='develop'
    print('\n> Deploying on systems...')
    for machine in machines_in_cluster:   
        #ssh google_compute "sudo bash update_script.sh branch"
        command = ["ssh", machine,"sudo bash "+config_files[0]+" "+branch]
        try:
            subprocess.call(command)
        except :
            print("> > > Copy of Deploy_script...")

# Implement this function
def deploy():
    copy_remote()
    deploy_remote()

# Implement this function
def all_requirements_available():
    available = True
    OWN_FOLDER = os.path.join(util.OWN_PATH, 'cloud_specific_files', 'google','compute')
    for k in config_files :
        if not os.path.exists(os.path.join(OWN_FOLDER, k)):
            available = False
    return available

