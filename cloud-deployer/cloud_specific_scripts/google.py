__author__ = 'ohaz/' + 'MacBlub'

import os
import util
import subprocess

##
## UTIL-extension for this Script
##

from distutils import file_util
def copy_file_to_repo(_from_, _to_ ,filename, overwrite=True):
    target = os.path.join(util.OWN_PATH, 'cloud_specific_files', _to_, 'repo', filename)
    source = os.path.join(util.OWN_PATH, 'cloud_specific_files', _from_, filename)
    if os.path.exists(target) :
        if overwrite :
            print(' > Util-GC > Replacing '+target)
            file_util.copy_file(source,target)
    else :
        print(' > Util-GC > copying from '+source+' into '+target)
        file_util.copy_file(source,target)

config_files = ["deploy_config.py","app.yaml","appengine_config.py","config.py","brutto-netto-rechner.pem","google_requirements_glob.txt","google_requirements_loc.txt"]


def run_subprocess(cmd):
    p = subprocess.Popen(cmd, stdout=subprocess.PIPE, stdin=subprocess.PIPE, bufsize=1)
    for line in iter(p.stdout.readline, b''):
        print(line)
    p.stdout.close()
    p.wait()

##
## Prepare Deployment
##

#cp app.yaml, appengine_config.py, config.py to root
def copy_core_files(rootles):
    copy_file_to_repo('google',rootles,'app.yaml')
    copy_file_to_repo('google',rootles,'appengine_config.py')
    copy_file_to_repo('google',rootles,'config.py')

#cp brutto-netto-rechner.pem
def copy_secrets(rootles):
    copy_file_to_repo('google',rootles,'brutto-netto-rechner.pem')

def install_lib(rootles):
    print(' > Util-GC > installing requirements...')
    target = os.path.join(util.OWN_PATH, 'cloud_specific_files',rootles,'repo')
    target_req = os.path.join(target, 'requirements.txt')
    target_lib = os.path.join(target, 'lib')
    command = ['pip', 'install' ,'-r', target_req, '-t', target_lib]
    subprocess.call(command)
    print(' > Util-GC > Installing finished.')

#
# Local-deployment
#
def option_local():
    rootles = 'google/local'

    util.copy_repo_to_specific(rootles)
    lst = None
    OWN_FOLDER = os.path.join(util.OWN_PATH, 'cloud_specific_files', 'google')
    with open(os.path.join(OWN_FOLDER,'google_requirements_loc.txt')) as hdl :
        lst = hdl.readlines()
    util.add_to_requirements(rootles,lst)
    
    copy_core_files(rootles)
    copy_secrets(rootles)
    install_lib(rootles)
    
    _to_ = os.path.join(util.OWN_PATH, 'cloud_specific_files',rootles,'repo')
    from cloud_specific_files.google import deploy_config
    command = ["python",deploy_config._DEV_SEV_, "--mysql_host=[[ip]]", "--mysql_user=[[USER]]", "--mysql_password=[[PWD]]", _to_ ]

    with open(os.path.join(_to_,'start-server'),'w+') as hdl :
        for k in command :
            hdl.write(k)
            hdl.write(" ")

    #create script which starts dev_server

#
# Global-deployment
#
def option_global():
    rootles = 'google/global'
    util.copy_repo_to_specific(rootles)
    lst = None
    OWN_FOLDER = os.path.join(util.OWN_PATH, 'cloud_specific_files', 'google')
    with open(os.path.join(OWN_FOLDER,'google_requirements_glob.txt')) as hdl :
        lst = hdl.readlines()
    util.add_to_requirements(rootles,lst)
    
    copy_core_files(rootles)
    copy_secrets(rootles)
    install_lib(rootles)
    
    print(' > > > Pushing to cloud...')
    from cloud_specific_files.google import deploy_config
    _to_ = os.path.join(util.OWN_PATH, 'cloud_specific_files',rootles,'repo')
    command = ["python",deploy_config._DEV_DEP_, "update", "--oauth2", "-A", "brutto-netto-rechner", _to_]
    try:
        subprocess.call(command)
    except :
        print("> > > Were not able to deploy. Maybe your Path is wrong?")

    print(' > > > Pushed.')
    ##upload to google-cloud automatically

#
# Deployment - Interface
#

options = {"local": option_local, "global": option_global}

# Implement this function
def deploy():
    ready = False
    while not ready:
        print('\n> Where should the system be deployed?')
        ops = raw_input(' > > Comma seperated list (local,global): ')
        op_list = ops.split(',')
        for op in op_list :
            if op in options.keys():
                options[op]()
                ready = True
            else :
                print("\"" + op + "\" is not known.")


# Implement this function
def all_requirements_available():
    available = True
    OWN_FOLDER = os.path.join(util.OWN_PATH, 'cloud_specific_files', 'google')
    for k in config_files :
        if not os.path.exists(os.path.join(OWN_FOLDER, k)):
            available = False
    return available

