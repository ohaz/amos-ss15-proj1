__author__ = 'ohaz'

import os

OWN_FOLDER = os.path.join('cloud_specific_files', 'azure')

move_files = [('package.json', 'unneeded_file_1')]

add_to_reqs = ['azure']

from util import copy_repo_to_specific, add_to_requirements

# Implement this function
def deploy():
    prepare_deployment()

def prepare_deployment():
    copy_repo_to_specific('azure')
    add_to_requirements('azure', add_to_reqs)

# Implement this function
def all_requirements_available():
    all_available = True

    if not os.path.exists(os.path.join(OWN_FOLDER, 'config.py')):
        all_available = False

    return all_available