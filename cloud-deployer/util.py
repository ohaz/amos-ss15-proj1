__author__ = 'ohaz'

import shutil
import os

from distutils import dir_util

OWN_PATH = os.path.dirname(os.path.realpath(__file__))

def copy_repo_to_specific(cloud, overwrite=True, globalfolder='amos-ss15-proj1-develop'):
    target = os.path.join(OWN_PATH, 'cloud_specific_files', cloud, 'repo', '')
    if os.path.exists(target) and not overwrite:
        print(' > Util > Removing dir '+target)
        shutil.rmtree(target)
    print(' > Util > copying from global to '+cloud+'/repo/')
    dir_util.copy_tree(os.path.join(OWN_PATH, 'cloud_specific_files', 'global', globalfolder, ''),
                    target)
    print(' > Util > Done copying.')

def add_to_requirements(cloud, requirements_list):
    requirements_file = os.path.join(OWN_PATH, 'cloud_specific_files', cloud, 'repo', 'requirements.txt')
    with open(requirements_file, 'a') as f:
        for req in requirements_list:
            print(' > Util > Adding ' + req + ' to the requirements.txt file')
            f.write(req+'\n')