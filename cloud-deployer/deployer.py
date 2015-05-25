__author__ = 'ohaz'

#
# This file is used to prepare for the deployment-subscripts.
# It manages the repo and calls the subscripts.
#

_possible_clouds = {'azure': [False, None], 'google': [False, None], 'aws': [False, None]}

IGNORE_PATTERN = ''     # These Pathes will be ignored, 
                        # when generating the repo, from which will be deployed

import os
import argparse
import shutil

def download_branch(url):
    #
    # Downloads a zip file from the repo and unzips it to cloud_specific_files/global
    #
    import urllib2

    file_name = url.split('/')[-1]
    download_finished = False
    GLOBAL_DIR = os.path.join('cloud_specific_files', 'global')

    # Clean up old folders:

    if os.path.exists(os.path.join(GLOBAL_DIR, 'amos-ss15-proj1-develop')):
        shutil.rmtree(os.path.join(GLOBAL_DIR, 'amos-ss15-proj1-develop'))

    while not download_finished:
        try:
            u = urllib2.urlopen(url)


            if not os.path.exists(GLOBAL_DIR):
                os.makedirs(GLOBAL_DIR)

            f = open(os.path.join(GLOBAL_DIR, file_name), 'wb')
            meta = u.info()
            file_size = int(meta.getheaders("Content-Length")[0])
            print (" > > Downloading: %s Bytes: %s" % (file_name, file_size))

            file_size_dl = 0
            block_sz = 8192
            while True:
                buffer = u.read(block_sz)
                if not buffer:
                    break

                file_size_dl += len(buffer)
                f.write(buffer)
                status = r" > > %10d  [%3.2f%%]" % (file_size_dl, file_size_dl * 100. / file_size)
                status = status + chr(8)*(len(status)+1)

                #
                # Different machines handle the next lines differently (probably depending on the terminal)
                # If the currently active version spams your console, prepend a # and remove the #s
                # in front of the other method
                #

                # Method

                print(status)

                # Method 2

                #import sys
                #sys.stdout.write('\r' + str(status))
                #sys.stdout.flush()

                # END OF METHODS

            f.close()
            download_finished = True
        except IndexError as e:
            print('Download failed, retrying...')

    print('')
    print(' > > Unzipping.')


    # Unzips the downloaded file
    import zipfile
    try:
        with zipfile.ZipFile(os.path.join(GLOBAL_DIR, file_name), "r") as z:
            z.extractall(GLOBAL_DIR)
    except:
        print('Unzipping did not work. Probably your internet died while you were downloading the file.')
    
    # Moves the unzipped folder to the correct structure

    foldername = file_name.split('.')[0]
    shutil.move(os.path.join(GLOBAL_DIR, "amos-ss15-proj1-"+foldername), os.path.join(GLOBAL_DIR, "amos-ss15-proj1-develop"))
    
    #removes unnecessary folder
    shutil.rmtree(os.path.join(GLOBAL_DIR,"amos-ss15-proj1-develop",'cloud-deployer'))
    shutil.rmtree(os.path.join(GLOBAL_DIR,"amos-ss15-proj1-develop",IGNORE_PATTERN))    
    return file_name

def copy_from_local(path):
    #
    # In case you don't want to download but use your local repository instead, this function deep-copies a given folder
    #
    GLOBAL_DIR = os.path.join('cloud_specific_files', 'global')
    if os.path.exists(os.path.join(GLOBAL_DIR, 'amos-ss15-proj1-develop')):
        shutil.rmtree(os.path.join(GLOBAL_DIR, 'amos-ss15-proj1-develop'))
    shutil.copytree(path, os.path.join(GLOBAL_DIR, 'amos-ss15-proj1-develop'),ignore = shutil.ignore_patterns("cloud-deployer",IGNORE_PATTERN) )

def main():

    # Main function of the deployer

    print(' -- Cloud deployment script')


    # Argument parsing. Currently accepts:
    # -b = Download a specified branch. Default is develop
    # -l = use a local folder instead of the repository
    parser = argparse.ArgumentParser()
    group = parser.add_mutually_exclusive_group()
    group.add_argument("-b", "--branch", default='develop', help='The branch to download. Defaults to develop')
    group.add_argument("-l", "--local_path", default=None, help='Uses a local path instead of the github repo')
    parser.add_argument("-t", "--tests", default=False, dest='tests', action='store_true', help='Includes testsuites for deployment')
    args = parser.parse_args()
    
    if not args.tests:
        global IGNORE_PATTERN
        IGNORE_PATTERN = 'tests'

    # Decide if script needs to download or to copy the repository
    if args.local_path is None:
        print(' > Downloading '+args.branch+' branch:')
        download_branch('https://github.com/ohaz/amos-ss15-proj1/archive/'+args.branch+'.zip')
    else:
        print(' > Copying from local path:')
        copy_from_local(args.local_path)


    # Checks for the subscripts by trying to import them
    # Also asks the scripts if they have all requirements they need
    print(' > Checking deployment sub-scripts')
    try:
        from cloud_specific_scripts import azure
        _possible_clouds['azure'][0] = azure.all_requirements_available()
        _possible_clouds['azure'][1] = azure
    except:
        pass

    try:
        from cloud_specific_scripts import google
        _possible_clouds['google'][0] = google.all_requirements_available()
        _possible_clouds['google'][1] = google
    except:
        pass

    try:
        from cloud_specific_scripts import aws
        _possible_clouds['aws'][0] = aws.all_requirements_available()
        _possible_clouds['aws'][1] = aws
    except:
        pass

    print(' > > Deployment subscripts found for:')

    for name, available in _possible_clouds.iteritems():
        print(' > > > '+ name + (' found :)' if available[0] else ' not found :('))

    # Asks the user which clouds to deploy to and tries to deploy to them
    finished = False
    while not finished:
        print('> Which clouds should I deploy for?')
        clouds = raw_input(' > > Comma separated list (Example: azure,aws): ')
        cloud_list = clouds.split(',')
        for c in cloud_list:
            if not c in _possible_clouds.keys():
                print(' > > > Cloud does not exist. Please retry.')
                break
            if not _possible_clouds[c][0]:
                print(' > > > Cloud does not have a deploy script. Please retry.')
                break
        else:
            # Only gets executed if the for loop does not break.
            for c in cloud_list:
                print('> > Deploying for: '+c)
                _possible_clouds[c][1].deploy()
            finished = True

    print('Done deploying. Have fun!')

if __name__ == '__main__':
    main()
