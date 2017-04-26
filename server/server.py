from flask import Flask
from flask import jsonify
app = Flask(__name__)

import sqlite3
conn = sqlite3.connect('csc177_Final_Project.db')
c = conn.cursor()

@app.route("/")
def hello():
    return "Hello World!"

@app.route("/avgStatsFromGrade")
def avgStatsFromGrade():
	# t = ('RHAT',)
	# c.execute('SELECT * FROM stocks WHERE symbol=?', t)
	# print(c.fetchone())
	c.execute('SELECT * FROM MathClasses');
	data = c.fetchone()
	print(data)

	return jsonify(data)