from FlaskWebProject import db
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class User(Base):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))

    # association proxy of "user_keywords" collection
    # to "keyword" attribute
    keywords = association_proxy('user_keywords', 'keyword')

    def __init__(self, name):
        self.name = name


class UserKeyword(Base):
    __tablename__ = 'user_keyword'
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    keyword_id = db.Column(db.Integer, db.ForeignKey('keyword.id'), primary_key=True)
    special_key = db.Column(db.String(50))

    # bidirectional attribute/collection of "user"/"user_keywords"
    user = db.relationship(User,
                backref=db.backref("user_keywords",
                                cascade="all, delete-orphan")
            )

    # reference to the "Keyword" object
    keyword = db.relationship("Keyword")

    def __init__(self, keyword=None, user=None, special_key=None):
        self.user = user
        self.keyword = keyword
        self.special_key = special_key


class Keyword(Base):
    __tablename__ = 'keyword'
    id = db.Column(db.Integer, primary_key=True)
    keyword = db.Column('keyword', db.String(64))

    def __init__(self, keyword):
        self.keyword = keyword

    def __repr__(self):
        return 'Keyword(%s)' % repr(self.keyword)





"""
class User(Base):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password = db.Column(db.String(64))
    sso = db.Column(db.String(64))  # none, google, facebook
    # association proxy from user to files
    files = association_proxy('userToFile', 'userfile')

    def __init__(self, username, email, password, sso):
        self.username = username
        self.email = email
        self.password = password
        self.sso = sso

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        try:
            return unicode(self.id)  # python 2
        except NameError:
            return str(self.id)  # python 3

    def __repr__(self):
        return '<User %r>' % (self.username)


class userToFile(Base):
    __tablename__ = 'userToFile'
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    file_id = db.Column(db.Integer, db.ForeignKey('userfile.id'), primary_key=True)
    permission = db.Column(db.String(64))

    # bidirectional attribute/collection of "user"/"userToFile"
    user = db.relationship(User,
                           backref=db.backref("userToFile",
                                              cascade="all, delete-orphan")
                           )

    # reference to the "Keyword" object
    userfile = db.relationship("Userfile")

    def __init__(self, user=None, userfile=None, permission=None):
        self.user = user
        self.userfile = userfile
        self.permission = permission


class Userfile(Base):
    __tablename__ = 'userfile'
    id = db.Column(db.Integer, primary_key=True)
    folder = db.Column(db.String(120))
    name = db.Column(db.String(120))

    def __init__(self, folder, name):
        self.folder = folder
        self.name = name

    def get_id(self):
        try:
            return unicode(self.id)  # python 2
        except NameError:
            return str(self.id)  # python 3

    def __repr__(self):
        return '<Userfile %r>' % (self.name)
"""

"""class Group(db.Model):
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

userToFile = db.Table('userToFile',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('file_id', db.Integer, db.ForeignKey('file.id')),
    db.Column('permission', db.Integer)
)

groupToFile = db.Table('groupToFile',
    db.Column('group_id', db.Integer, db.ForeignKey('group.id')),
    db.Column('file_id', db.Integer, db.ForeignKey('file.id')),
    db.Column('permission', db.Integer)
)

userToGroup = db.Table('userToGroup',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('group_id', db.Integer, db.ForeignKey('group.id')),
    db.Column('permission', db.Integer)
)
"""
