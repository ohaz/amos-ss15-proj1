from FlaskWebProject import db

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


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password = db.Column(db.String(64))
    sso = db.Column(db.String(64))  # none, google, facebook
    groups = db.relationship('Group', secondary=userToGroup,
        backref=db.backref('users', lazy='dynamic'))
    files = db.relationship('File', secondary=userToFile,
        backref=db.backref('users', lazy='dynamic'))

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


class File(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    folder = db.Column(db.String(120))
    name = db.Column(db.String(120))
    users = db.relationship('User', secondary=userToFile,
        backref=db.backref('files', lazy='dynamic'))
    groups = db.relationship('Group', secondary=groupToFile,
        backref=db.backref('files', lazy='dynamic'))


class Group(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), index=True, unique=True)
    users = db.relationship('User', secondary=userToGroup,
        backref=db.backref('groups', lazy='dynamic'))
    files = db.relationship('File', secondary=groupToFile,
        backref=db.backref('groups', lazy='dynamic'))
