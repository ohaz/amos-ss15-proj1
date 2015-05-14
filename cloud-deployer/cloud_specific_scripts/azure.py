__author__ = 'ohaz'

import os
import util
import shutil

OWN_FOLDER = os.path.join(util.OWN_PATH, 'cloud_specific_files', 'azure')

move_files = [('package.json', 'unneeded_file_1')]

add_to_reqs = ['azure']

from util import copy_repo_to_specific, add_to_requirements

# Implement this function
def deploy():
    try:
        prepare_deployment()
    except StandardError, e:
        print('Canceling Azure')
        return

def prepare_deployment():
    get_azure_git()
    copy_repo_to_specific('azure')
    add_to_requirements('azure', add_to_reqs)
    for m in move_files:
        print(' > > Moving file ' + m[0] + ' to ' + m[1])
        shutil.move(os.path.join(OWN_FOLDER, 'repo', m[0]), os.path.join(OWN_FOLDER, 'repo', m[1]))

def get_azure_git():
    from cloud_specific_files.azure import deploy_config
    url = deploy_config.git_clone_url
    to = os.path.join(OWN_FOLDER, 'azure_repo')
    if os.path.exists(to):
        shutil.rmtree(to)
    import subprocess
    command = ['git', 'clone', url, to]
    git_output = ''
    try:
        print('> > Cloning Azure repo. This might take some time...')
        p = subprocess.Popen(command, stdout=subprocess.PIPE, bufsize=1)
        for line in iter(p.stdout.readline, b''):
            print (line)
        p.stdout.close()
        p.wait()
    except Exception, e:
        print('Git checkout from azure failed. Stacktrace: ')
        print(e)
        raise StandardError()
    print(git_output)

# Implement this function
def all_requirements_available():
    all_available = True

    if not os.path.exists(os.path.join(OWN_FOLDER, 'config.py')):
        all_available = False
    if not os.path.exists(os.path.join(OWN_FOLDER, 'deploy_config.py')):
        all_available = False

    return all_available