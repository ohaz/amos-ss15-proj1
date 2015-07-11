#!/bin/sh
set -e

# kill Gunicorn processes, because we are replacing the code now!
process=gunicorn
bp=$(ps -A | grep $process | awk '{print $1}' | head -n 1)
if [ -n "$bp" ] ; then
    sudo kill $bp
fi

# get into repo-context [virtualenv]
cd /home/sys/environments/amos/
source /home/sys/environments/amos/bin/activate

proj_name="amos-ss15-proj1"

if [ -d $proj_name ] ;
then
    rm -r $proj_name
fi

git clone repository $proj_name 

cd $proj_name

cp ../config.py config.py
cp ../brutto-netto-rechner-compute.pem brutto-netto-rechner-compute.pem

#reinstall requirements if needed, 
#sometimes, we should update the startupscript, because of really hard dependencies [gcc, etc.]
pip install -r requirements.txt

echo "Starting server ... "
setsid ../bin/gunicorn -w 4 FlaskWebProject:app >/tmp/logging 2>&1 < /dev/null &
