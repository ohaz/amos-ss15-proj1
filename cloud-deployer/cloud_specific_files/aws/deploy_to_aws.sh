#!/bin/bash

echo "Beginning delopy to AWS Elastic Beanstalk..."

export AWS_ACCESS_KEY_ID=$3
export AWS_SECRET_ACCESS_KEY=$4

#create virtual env for boto
cd $1
virtualenv -p python2.7 deploy_aws

#activate virtual env
. deploy_aws/bin/activate

pip install awsebcli

cd $2

eb deploy amos-proj1

#deactivate virtual env
deactivate

#delete virutal env after successfull deploying
cd $1
rm -r deploy_aws
rm -r repo

echo "Deploying to AWS finished..."
