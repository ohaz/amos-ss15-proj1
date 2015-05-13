"""Create DB Tables in AWS Cloud"""
#!flask/bin/python
from FlaskWebProject import db
from FlaskWebProject.models import User
db.create_all()
print "DB created."
