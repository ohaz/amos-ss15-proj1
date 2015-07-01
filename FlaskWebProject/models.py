from FlaskWebProject import db
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class User(Base):
    """
    Model for a user. Contains their login data.
    """

    # create with:
    # User("hanz","hanzmail","hanzpw","sso")
    # get with:
    # usr = session.query(User).filter(User.id==1).first()
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password = db.Column(db.String(120))
    sso = db.Column(db.String(64))  # none, google, facebook
    # association proxy of "user_userfiles" collection
    # to "keyword" attribute
    userfiles = association_proxy('user_userfiles', 'userfile')

    def __init__(self, username, email, password, sso):
        """
        Create a new user.

        :param string username: The username of the user to create
        :param string email: The email of the user to create
        :param string password: The password of the user to create
        :param string sso: The SSO login of the user to create
        """
        self.username = username
        self.email = email
        self.password = password
        self.sso = sso

    def is_authenticated(self):
        """
        Determines if the user is authenticated. Basically a dummy (for decorators)

        :return boolean: always returns True
        """
        return True

    def is_active(self):
        """
        Determines if the user is active. Dummy

        :return boolean: always returns True
        """
        return True

    def is_anonymous(self):
        """
        Determines if the user is anonymous. Dummy

        :return boolean: always returns True
        """
        return False

    def get_id(self):
        """
        Determines the id of the user

        :return string: The id of the user as a string
        """
        try:
            return unicode(self.id)  # python 2
        except NameError:
            return str(self.id)  # python 3

    def __repr__(self):
        """
        Representation string of a user object.

        :return string: String representation of a user
        """
        return '<User %r>' % (self.username)


class UserUserfile(Base):
    """
    Relation between a user and a file
    """
    # create with:
    # UserUserfile(Userfile("folder","file"), user, permission=7)
    # check with:
    # uufile = session.query(UserUserfile).filter(UserUserfile.user_id==1,UserUserfile.userfile_id==2).first().permission
    __tablename__ = 'user_userfile'
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    userfile_id = db.Column(db.Integer, db.ForeignKey('userfile.id'), primary_key=True)
    permission = db.Column(db.String(50))

    # bidirectional attribute/collection of "user"/"user_userfiles"
    user = db.relationship(User,
                backref=db.backref("user_userfiles",
                                cascade="all, delete-orphan")
            )

    # reference to the "Keyword" object
    userfile = db.relationship("Userfile")

    def __init__(self, userfile=None, user=None, permission=None):
        """
        Create a new releation between a user and a file

        :param Userfile userfile: The file for the relationship
        :param User user: the user for the relationship
        :param string permission: the permissions for the user
        """
        self.user = user
        self.userfile = userfile
        self.permission = permission


class Userfile(Base):
    """
    An uploaded file
    """
    # create with:
    # Userfile("hanzfolder","hanzfile")
    # get with:
    # file = session.query(Userfile).filter(Userfile.id==1).first()
    __tablename__ = 'userfile'
    id = db.Column(db.Integer, primary_key=True)
    folder = db.Column('folder', db.String(64))
    name = db.Column('name', db.String(120))

    def __init__(self, folder, name):
        """
        Create a new userfile

        :param string folder: The folder in which the file is located
        :param string name: The name of the file
        """
        self.folder = folder
        self.name = name

    def get_id(self):
        """
        Determines the id of the object

        :return string: The id of the file
        """
        try:
            return unicode(self.id)  # python 2
        except NameError:
            return str(self.id)  # python 3

    def __repr__(self):
        """
        Representation string of a file

        :return string: String representation of a file
        """
        return '<Userfile %r>' % (self.name)


"""
User -> Group -> File Mapping:
additional info: http://docs.sqlalchemy.org/en/latest/orm/extensions/associationproxy.html

# should be class Group(Base):
class Group(db.Model): 
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), index=True, unique=True)
    files = db.relationship('File', secondary=groupToFile,
        backref=db.backref('groups', lazy='dynamic'))

    def __init__(self, name, files):
        self.name = name
        self.files = files

    def get_id(self):
        try:
            return unicode(self.id)  # python 2
        except NameError:
            return str(self.id)  # python 3

    def __repr__(self):
        return '<Group %r>' % (self.name)

# should be class GroupUserfile(Base):
groupToFile = db.Table('groupToFile',
    db.Column('group_id', db.Integer, db.ForeignKey('group.id')),
    db.Column('file_id', db.Integer, db.ForeignKey('file.id')),
    db.Column('permission', db.Integer)
)

# should be class UserGroup(Base):
userToGroup = db.Table('userToGroup',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('group_id', db.Integer, db.ForeignKey('group.id')),
    db.Column('permission', db.Integer)
)
"""
