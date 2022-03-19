from flask import Flask, redirect,render_template, request, url_for, flash
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import and_, or_

app = Flask(__name__,template_folder="../HTML", static_folder="../CSS")

class Config:
    SQLALCHEMY_DATABASE_URI ='mysql://root:123456@127.0.0.1:3306/flaskdb'
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    app.secret_key = 'asdfsdafsda'

app.config.from_object(Config)

db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True)
    password = db.Column(db.String(80))
    email = db.Column(db.String(120), unique=True)
    gender = db.Column(db.String(80))
    birth = db.Column(db.String(80))

@app.before_first_request
def create_db():
    db.drop_all()  
    db.create_all()
    
    admin = User(username='admin', password='root', email='admin@example.com')
    db.session.add(admin)

    guestes = [User(username='guest1', password='guest1', email='guest1@example.com'),
               User(username='guest2', password='guest2', email='guest2@example.com'),
               User(username='guest3', password='guest3', email='guest3@example.com'),
               User(username='guest4', password='guest4', email='guest4@example.com')]
    db.session.add_all(guestes)
    db.session.commit()

def valid_login(email, password):
    user = User.query.filter(and_(User.email == email, User.password == password)).first()
    if user:
        return True
    else:
        return False

def valid_regist(username, email):
    user = User.query.filter(or_(User.username == username, User.email == email)).first()
    if user:
        return False
    else:
        return True

@app.route('/')
def index():
    msg = 'login successful'
    return render_template('index.html', data = msg)

@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        if valid_login(request.form['email'], request.form['password']):
            flash("Login successful!")
            return redirect(url_for('index'))
        else:
            error = 'Wrong username or password!'

    return render_template('login.html', error=error)

@app.route('/register', methods=['GET','POST'])
def register():
    error = None
    if request.method == 'POST':
        if valid_regist(request.form['username'], request.form['email']):
            user = User(username=request.form['username'], password=request.form['password'], email=request.form['email'],gender = request.form['gender'],birth = request.form['birthday'])
            db.session.add(user)
            db.session.commit()
            
            flash("register successfully!")
            return redirect(url_for('login'))
        else:
            error = 'The username or email address is already registered!'
    
    return render_template('register.html', error=error)

if __name__ == "__main__":
    app.run(port = 3000,debug= True)