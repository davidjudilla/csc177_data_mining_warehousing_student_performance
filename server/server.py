from flask import Flask
from flask import jsonify
from flask import request
app = Flask(__name__)

# Connect to databases
import sqlite3
dataMartConn = sqlite3.connect('csc177_Final_Project.db')
dataMartCur = dataMartConn.cursor()

allStudentsConn = sqlite3.connect('unionedStudents.db')
allStudCur = allStudentsConn.cursor()

# columsn for gradeAvgStats to check
mostOccuringStatsCols = [
	"sex",
	"traveltime",
	"studytime",
	"schoolsup",
	"famsup",
	"activities",
	"nursery",
	"internet",
	"romantic"
]
avgStatsCols = [
	"age",
	"absences",
	"failures",
	"famrel",
	"freetime",
	"goout",
	"Dalc",
	"Walc",
	"health"
]

def getMostOccuring(cur, grade, col):
	cur.execute("""
		SELECT {0}
		FROM Students
		WHERE G3 = {1}
		GROUP BY {0}
		ORDER BY COUNT(*) DESC
		LIMIT 1
	""".format(col, grade))
	print(grade)
	mostOccuring = cur.fetchone()
	# cur.execute('SELECT * FROM Students WHERE G3 = ?');
	return mostOccuring[0] if mostOccuring != None else None

def getAverageOfCol(cur, grade, col):
	cur.execute("""
		SELECT {0}, AVG({0})
		FROM Students
		WHERE G3 = {1}
	""".format(col, grade))
	# cur.execute('SELECT * FROM Students WHERE G3 = ?');
	avg = cur.fetchone()
	return avg[1] if avg != None else None

def getGradeToColAvg(curr, grade, col):
	cur.execute("""
		SELECT *
		FROM Students
		WHERE G3 = {1}
	""".format(col, grade))
	avg = cur.fetchone()[1]
	return avg if avg != None else None


# Routes
@app.route("/")
def hello():
    endpoints = {
    	0 : "/gradeAvgStats?grade=X",
    	1 : "/gradesToCol?col=X"
    }
    return jsonify(endpoints)

@app.route("/gradeAvgStats")
def gradeAvgStats():
	grade = request.args.get('grade')
	stats = {}
	for x in mostOccuringStatsCols:
		stats[x] = getMostOccuring(allStudCur, grade, x)
	for x in avgStatsCols:
		stats[x] = getAverageOfCol(allStudCur, grade, x)
	print(stats)

	return jsonify(stats)

@app.route("/gradesToCol")
def gradeToCol():
	col = request.args.get('col')
	print(col)
	forEachGrade = []

	if (col in mostOccuringStatsCols):
		for grade in range(0, 20):
			forEachGrade.append(getMostOccuring(allStudCur, grade, col))
		return jsonify(forEachGrade)
	elif (col in avgStatsCols):
		for grade in range(0, 20):
			forEachGrade.append(getAverageOfCol(allStudCur, grade, col))
		return jsonify(forEachGrade)
	else:
		return "Invalid column name"