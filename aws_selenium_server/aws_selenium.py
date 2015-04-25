# /usr/bin/python2.7
# written by Tomas Nevar (http://www.lisenet.com) on 05/11/2012
# copyleft free software

import boto.ec2
import sys
import time

# specify AWS keys
auth = {"aws_access_key_id": "<user-id>", "aws_secret_access_key": "<secret_key>"}

def main():
	# read arguments from the command line and 
	# check whether at least two elements were entered
	if len(sys.argv) < 2:
		print "Usage: python aws.py {start|stop}\n"
		sys.exit(0)
	elif len(sys.argv) == 3:
		action = sys.argv[1]
		instanceId = sys.argv[2]
	else:
		action = sys.argv[1] 

	if action == "stop":
		stopInstance()
	elif action == "create":
		createSeleniumInstance()
	elif action == "terminate":
		terminateInstance(instanceId)
	elif action == "status":
		getStatus(instanceId)
	elif action == "security":
		showSecurityGroups()
	else:
		print "Usage: python aws.py {start|stop or create}\n"


def showSecurityGroups():

	ec2conn = boto.ec2.connect_to_region("us-west-2", **auth)
	rs = ec2conn.get_all_security_groups()
	print rs




def createSeleniumInstance():

	print "Creating instance for selenium server..."

	ec2conn = boto.ec2.connect_to_region("us-west-2", **auth)

	reservation = ec2conn.run_instances('ami-5189a661', key_name='selenium', instance_type='t2.small', security_groups=['selenium-security-config'])

	instance = reservation.instances[0]
	print('Waiting for instance to start...')
	# Check up on its status every so often
	status = instance.update()
	while status == 'pending':
		time.sleep(10)
		status = instance.update()
	if status == 'running':
		print "Instance-ID: " + instance.id
		print "Pulic-DNS: " + instance.public_dns_name
	else:
		print('Instance status: ' + status)

def terminateInstance(instanceId):
	print "Terminating instance " + instanceId

	ec2conn = boto.ec2.connect_to_region("us-west-2", **auth)

	ec2conn.terminate_instances(instance_ids=[instanceId])

	instanceArray= ec2conn.get_only_instances(instance_ids=[instanceId])
	instance = instanceArray[0]

	status = instance.update()

	while not status == "terminated":
		print status
		time.sleep(5)
		status = instance.update()

	print "Instance " + instanceId + " terminated successfully"


def getStatus(instanceId):

	ec2conn = boto.ec2.connect_to_region("us-west-2", **auth)

	instanceArray= ec2conn.get_only_instances(instance_ids=[instanceId])
	instance = instanceArray[0]

	status = instance.update()	
	print "The status of instance " + instanceId + " is: " + status



if __name__ == '__main__':
	main()