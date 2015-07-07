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
    """
    Copies a script needed on the server for executeing the update of the repo!
    """
    source = os.path.join(util.OWN_PATH, 'cloud_specific_files', 'google','compute')
    for machine in machines_in_cluster:
        for file_0 in config_files :
            #scp update_script.sh google_compute:update_script.sh
            command = ["scp",os.path.join(source,file_0), machine+":"+file_0]
            try:
                subprocess.call(command)
            except :
                print("> > > Copy of Deploy_script failed...")


def diff_remote():
    """
    Helperfunction. Gets the Diff of the specified repo [copied from repo, or local, etc.]
    and writes the result to the remote servers.
    """    

    source = os.path.join(util.OWN_PATH, 'cloud_specific_files', 'google','compute')
    
    #Save old path
    old_path = os.getcwd()
    os.chdir(os.path.join(source,'repo'))
    
    for machine in machines_in_cluster: 

        try:
            # try to add google repo to git
            command = ["git","remote","add","google",machine+":/home/sys/environments/amos/amos-ss15-proj1"]
            subprocess.call(command)
            
            # fetch current branches of google repo 
            command = ["git","fetch","google"]
            subprocess.call(command)

            # make diff between this repo, and the remote one
            #git diff os.path.join(source,repo) google > os.path.join(source,difference)
            command = ["git","diff","google/master"]
            with open(os.path.join(source,"difference"),'w') as hdl:
                result = subprocess.Popen(command,stdout=hdl)
            
            # copy diff to server
            #scp os.path.join(source,difference) google_compute:difference
            command = ["scp",os.path.join(source,"difference"), machine+":"+"difference"]
            subprocess.call(command)
            
            # remove diff, we don't need it anymore
            #rm os.path.join(source,difference)
            command = ["rm",os.path.join(source,"difference")]
            subprocess.call(command)
            
            # remove google as repo from git
            command = ["git","remote","remove","google"]
            subprocess.call(command)
            print("google removed")
        except :
            print("> > > Deploy_script failed at " + machine + "...")

            #try to remove google path
            command = ["git","remote","remove","google"]
            subprocess.call(command)
    
    os.chdir(old_path)

def deploy_remote():
    """
    Executes Remote script, which we copied via copy_remote
    """

    print('\n> Deploying on systems...')
    for machine in machines_in_cluster:   
        #ssh google_compute "sudo bash update_script.sh branch"
        command = ["ssh", machine,"sudo bash "+config_files[0]]
        try:
            subprocess.call(command)
        except :
            print("> > > Deploy of Deploy_script failed...")

# Implement this function
def deploy():
    util.copy_repo_to_specific('google/compute')
    
    print("Diffing current Directory...")
    diff_remote()
    
    print("Copy rest to remote ...")
    copy_remote()

    print("Deploy changes...")
    deploy_remote()

# Implement this function
def all_requirements_available():
    available = True
    OWN_FOLDER = os.path.join(util.OWN_PATH, 'cloud_specific_files', 'google','compute')
    for k in config_files :
        if not os.path.exists(os.path.join(OWN_FOLDER, k)):
            available = False
    return available

