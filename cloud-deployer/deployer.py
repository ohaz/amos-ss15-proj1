__author__ = 'ohaz'

_possible_clouds = {'azure': [False, None], 'google': [False, None], 'aws': [False, None]}

import os

def download_branch(url):
    import urllib2

    file_name = url.split('/')[-1]
    download_finished = False
    GLOBAL_DIR = os.path.join('cloud_specific_files', 'global')
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
                #print(status) #atop spamming commandline
                import sys
                sys.stdout.write('\r' + str(status))
                sys.stdout.flush()

            f.close()
            download_finished = True
        except IndexError as e:
            print('Download failed, retrying...')

    print('')
    print(' > > Unzipping.')

    import zipfile
    try:
        with zipfile.ZipFile(os.path.join(GLOBAL_DIR,file_name), "r") as z:
            z.extractall(GLOBAL_DIR)
    except:
        print('Unzipping did not work. Probably your internet died while you were downloading the file.')

    return file_name

print(' -- Cloud deployment script')

print(' > Downloading development branch:')
download_branch('https://github.com/ohaz/amos-ss15-proj1/archive/develop.zip')

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
