from datetime import datetime
from app import db
from sqlalchemy import DateTime, ForeignKey
from sqlalchemy.orm import relationship
# from sqlalchemy.ext.declarative import declarative_base
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from app import login

@login.user_loader
def load_user(id):
    return login_form.query.get(int(id))

# Base = declarative_base()

class login_form(UserMixin, db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    password = db.Column(db.String(128))
    email = db.Column(db.String(120), index=True, unique=True)

    def set_pswd(self, password):
        self.password_hash = generate_password_hash(password)

    def check_pswd(self, password):
        return check_password_hash(self.password_hash, password)
    
    login_info = db.relationship('login_info', backref='login_form')
    option_record = db.relationship('option_record', backref='login_form')

    def __repr__(self):
        return '<login_form {}>'.format(self.username)

class login_info(db.Model):
    user_id = db.Column(db.Integer, db.ForeignKey('login_form.user_id'), primary_key=True)
    user_created_time = db.Column(DateTime)
    last_login_in = db.Column(db.DateTime)
    
    def __repr__(self):
        return '<login_info {}>'.format(self.user_id)
    
class option_record(db.Model):
    option_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('login_form.user_id'))
    option_created_time = db.Column(db.DateTime)

    op_id = db.relationship('option_info', backref='option_record')

class option_info(db.Model):
    option_id = db.Column(db.Integer, db.ForeignKey('option_record.option_id'), primary_key=True)
    option_last_updated = db.Column(db.DateTime)
    option_text = db.Column(db.String)

    def __repr__(self):
        return '<option_info {}>'.format(self.option_text)

