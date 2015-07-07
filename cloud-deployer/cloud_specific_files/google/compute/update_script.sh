#!/bin/sh
set -e

branch=$1
revision=$2
process=gunicorn

#Save environment
#env0=$GIT_SSH

bp=$(ps -A | grep $process | awk '{print $1}' | head -n 1)
if [ -n "$bp" ] ; then
    sudo kill $bp
fi

#sudo -i su
cd /home/sys/environments/amos/amos-ss15-proj1/
source /home/sys/environments/amos/bin/activate

sudo git pull
sudo git checkout $branch

pip install -r requirements.txt

setsid ../bin/gunicorn -w 4 FlaskWebProject:app >/tmp/logging 2>&1 < /dev/null &

#exit #su
#exit #real user

#restore environment
#GIT_SSH=$env0
