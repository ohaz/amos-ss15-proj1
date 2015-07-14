amos-ss15-proj1
===============

Introduction
------------

This application was created as a project at the Friedrich-Alexander-Universität Erlangen Nürnberg. The project is called "AMOS Project" and is held by the open source chair of the IT department.
[AMOS Project](http://osr.cs.fau.de/teaching/ss2015/amos/)

This project is an attempt to write a common code base for web applications on the three big cloud providers: AWS, Azure and Google.
This abstraction has been named "AMOS Cloud Layer" (short: ACL). With this ACL, it is possible to run web applications without having to port them to the different clouds.
This way, you can avoid getting vendor-locked - you can simply run your application on a different vendor without having to change a single line of code. Only a few config changes needed!

Technology
----------

This application is based on the [Flask Framework](http://flask.pocoo.org/). On top of this, we've built our ACL, which supports the following big themes:

* Simple-to-use storage interface that abstracts from the cloud implementations. It's modular, so you can even add your own storage adapter
* SQLAlchemy interface to support a lot of database servers. Every one of the three clouds we worked on provides at least one of the supported database servers.
* etcd support makes it easy to synchronize data (e.g. database entries or files) between multiple instances of your application.

Documentation
-------------

Documentation on how to setup and configure can be found in the documentation folder.

Contribution
------------

If you want to contribute, please fork the repo and submit a pull request. Please make sure that your changes don't break anything.
