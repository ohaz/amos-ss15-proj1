#!/bin/sh
set -e

# kill Gunicorn processes, because we are replacing the code now!
process=gunicorn
bp=$(ps -A | grep $process | awk '{print $1}' | head -n 1)
if [ -n "$bp" ] ; then
    sudo kill $bp
fi

# get into repo-context [virtualenv]
cp difference /home/sys/environments/amos/difference
cd /home/sys/environments/amos/amos-ss15-proj1/
source /home/sys/environments/amos/bin/activate

#update repo 
git checkout master
git reset --hard HEAD
git clean -fd --exclude=brutto-netto-rechner-compute.pem

git apply ../difference

#reinstall requirements if needed, 
#sometimes, we should update the startupscript, because of really hard dependencies [gcc, etc.]
pip install -r requirements.txt

echo "Starting server ... "
setsid ../bin/gunicorn -w 4 FlaskWebProject:app >/tmp/logging 2>&1 < /dev/null &
