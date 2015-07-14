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
    Copies a script needed on the server for executing the update of the repo!
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


def apply_remote():
    """
    Get repository at remote and commits our changes to the repo.
    """    
    
    source = os.path.join(util.OWN_PATH, 'cloud_specific_files', 'google','compute')
    remote_repo = "/home/sys/environments/amos/repository"

    #Save old path
    old_path = os.getcwd()
    
    for machine in machines_in_cluster:
        try:
            
            os.chdir(source)
            
            #pull remote repository
            command = ["git","clone",machine+":"+remote_repo,os.path.join(source,"repo_google")]
            subprocess.call(command)
            
            os.chdir(os.path.join(source,"repo"))
            
            #clean our copy of repository
            command = ["rm","-r",".git"]
            subprocess.call(command)
            
            #copy configfiles of google_remote to our repo
            command = ["cp","-f","-r",os.path.join(source,"repo_google",".git"), os.path.join(source,"repo",".git")]
            subprocess.call(command)

            # add everything, I mean really everything in this repo to our next commit
            command = ["git","add","*"]
            subprocess.call(command)

            # Commit all changes
            command = ["git","commit","-a","-m\"I am log.\""]
            subprocess.call(command)
        
            command = ["git","push"]
            subprocess.call(command)
            
            os.chdir(source)
            
            # remove garbage repos
            command = ["rm","-r","repo"]
            subprocess.call(command)
            
            command = ["rm","-r","repo_google"]
            subprocess.call(command)

        except :
            print("> > > Deploy_script failed at " + machine + "...")
    
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
    
    print("Pulling Remote and add changes...")
    apply_remote()
    
    print("Copy scripts to remote ...")
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

