__author__ = 'ohaz'

import os
import util
import shutil
import subprocess
from distutils import file_util, dir_util
from util import copy_repo_to_specific, add_to_requirements
from cloud_specific_files.aws import config

OWN_FOLDER = os.path.join(util.OWN_PATH, 'cloud_specific_files', 'aws')
#OWN_PATH = os.path.dirname(os.path.realpath(__file__))

#List with extra pip install packages
add_to_reqs = ['boto']




# Implement this function
def deploy():
    try:
        prepare_deployment()
    except StandardError, e:
        print('Canceling AWS')
        return
    copy_config_to_repo()
    copy_ebextensions_to_repo()
    copy_elasticbeanstalk_to_repo()
    deploy_app_to_aws()

def prepare_deployment():
    copy_repo_to_specific('aws')
    add_to_requirements('aws', add_to_reqs)

def run_subprocess(cmd):
    p = subprocess.Popen(cmd, stdout=subprocess.PIPE, stdin=subprocess.PIPE, bufsize=1, shell=True)
    for line in iter(p.stdout.readline, b''):
        print(line)
    p.stdout.close()
    p.wait()


def deploy_app_to_aws():
    arglist = OWN_FOLDER+' '+os.path.join(OWN_FOLDER, 'repo')+' '+config.AWS_EB_ACCESS_KEY+' '+config.AWS_EB_SECRET_KEY
    bashCommand = "/bin/bash "+os.path.join(OWN_FOLDER, 'deploy_to_aws.sh')+ ' ' + arglist 
    os.system(bashCommand)

def copy_config_to_repo():
    target = os.path.join(OWN_FOLDER, 'repo', 'config.py')
    if os.path.exists(target):
        print(' > AWS Deploy > Removing file '+target)
        os.remove(target)
    print(' > AWS Deploy > copying config.py to aws/repo/')
    file_util.copy_file(os.path.join(OWN_FOLDER, 'config.py'), target)
    print(' > AWS Deploy > Done copying.')

def copy_ebextensions_to_repo():
    target = os.path.join(OWN_FOLDER, 'repo', '.ebextensions')
    if os.path.exists(target):
        print(' > AWS Deploy > Removing dir '+target)
        shutil.rmtree(target)
    print(' > AWS Deploy > copying .ebextensions to aws/repo/')
    shutil.copytree(os.path.join(OWN_FOLDER, '.ebextensions'), target)
    print(' > AWS Deploy > Done copying.')

def copy_elasticbeanstalk_to_repo():
    target = os.path.join(OWN_FOLDER, 'repo', '.elasticbeanstalk')
    if os.path.exists(target):
        print(' > AWS Deploy > Removing dir '+target)
        shutil.rmtree(target)
    print(' > AWS Deploy > copying .elasticbeanstalk to aws/repo/')
    shutil.copytree(os.path.join(OWN_FOLDER, '.elasticbeanstalk'), target)
    print(' > AWS Deploy > Done copying.')



# Implement this function
def all_requirements_available():
    all_available = True

    if not os.path.exists(os.path.join(OWN_FOLDER, 'config.py')):
        all_available = False

    return all_available