__author__ = 'ohaz'

import os
import util
import shutil
import subprocess
import distutils

OWN_FOLDER = os.path.join(util.OWN_PATH, 'cloud_specific_files', 'azure')

move_files = [('package.json', 'unneeded_file_1')]

add_to_reqs = ['azure']

from util import copy_repo_to_specific, add_to_requirements

def run_subprocess(cmd):
    # A function to run a subprocess. Should probably get moved to the util file in the future
    p = subprocess.Popen(cmd, stdout=subprocess.PIPE, stdin=subprocess.PIPE, bufsize=1)
    for line in iter(p.stdout.readline, b''):
        print(line)
    p.stdout.close()
    p.wait()

# Implement this function
def deploy():
    # Deployer for Azure
    # Prepares for deployment and then runs the necessary git commands
    try:
        prepare_deployment()
    except StandardError, e:
        print('Canceling Azure')
        return
    print(' > > Copying downloaded files into repo')
    
    shutil.rmtree(os.path.join(OWN_FOLDER,'repo', '.git'))
    distutils.dir_util.copy_tree(os.path.join(OWN_FOLDER, 'repo'), os.path.join(OWN_FOLDER, 'azure_repo'))
    distutils.file_util.copy_file(os.path.join(OWN_FOLDER, 'config.py'), os.path.join(OWN_FOLDER, 'azure_repo', 'config.py'))
    print(' Adding files to git')

    command = ['git', 'add', '--git-dir='+os.path.join(OWN_FOLDER,'azure_repo', '.git/'), '--work-tree='+os.path.join(OWN_FOLDER, 'azure_repo/'), '.']

    run_subprocess(command)
    print(' > > Doing a git commit')
    command = ['git', '--git-dir='+os.path.join(OWN_FOLDER,'azure_repo', '.git/'), '--work-tree='+os.path.join(OWN_FOLDER, 'azure_repo/'), 'commit', '-am', '"Autodeploy with deployer script"']
    run_subprocess(command)
    print(' > > Pushing')
    command = ['git', '--git-dir='+os.path.join(OWN_FOLDER,'azure_repo', '.git/'), '--work-tree='+os.path.join(OWN_FOLDER, 'azure_repo/'), 'push']
    run_subprocess(command)
    print(' > > Done Pushing')

def prepare_deployment():
    # Preparing for the deployment by downloading the azure repo and copying the files needed
    get_azure_git()
    copy_repo_to_specific('azure')
    add_to_requirements('azure', add_to_reqs)
    for m in move_files:
        print(' > > Moving file ' + m[0] + ' to ' + m[1])
        shutil.move(os.path.join(OWN_FOLDER, 'repo', m[0]), os.path.join(OWN_FOLDER, 'repo', m[1]))

def get_azure_git():
    # Download azure repo
    from cloud_specific_files.azure import deploy_config
    url = deploy_config.git_clone_url
    to = os.path.join(OWN_FOLDER, 'azure_repo')
    if os.path.exists(to):
        shutil.rmtree(to)
    command = ['git', 'clone', url, to]
    git_output = ''
    try:
        print('> > Cloning Azure repo. This might take some time...')
        run_subprocess(command)
    except Exception, e:
        print('Git checkout from Azure failed. Stacktrace: ')
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
