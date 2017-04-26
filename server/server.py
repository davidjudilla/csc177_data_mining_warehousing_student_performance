from flask import Flask
from flask import jsonify
from flask import request
app = Flask(__name__)

# Connect to databases
import sqlite3
dataMartConn = sqlite3.connect('csc177_Final_Project.db')
dataMartC = dataMartConn.cursor()

allStudentsConn = sqlite3.connect('unionedStudents.db')
allStudC = allStudentsConn.cursor()

def getMostOccuring(cur, grade, col):
	t = (col, grade, col,)
	cur.execute("""
		SELECT ?
		FROM Students 
		WHERE G3 = ?
		GROUP BY ?
		ORDER BY COUNT(*) DESC
		LIMIT 1
	""", t)
	# cur.execute('SELECT * FROM Students WHERE G3 = ?');
	return cur.fetchone()


# Routes
@app.route("/")
def hello():
    return "Hello World!"

@app.route("/avgStatsFromGrade")
def avgStatsFromGrade():
	grade = request.args.get('grade')
	data = getMostOccuring(allStudC, grade, "famrel")
	print(data)

	return jsonify(data)