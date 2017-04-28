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
	# cur.execute('SELECT * FROM Students WHERE G3 = ?');
	return cur.fetchone()[0]

def getAverageOfCol(cur, grade, col):
	cur.execute("""
		SELECT {0}, AVG({0})
		FROM Students
		WHERE G3 = {1}
	""".format(col, grade))
	# cur.execute('SELECT * FROM Students WHERE G3 = ?');
	return cur.fetchone()[1]


# Routes
@app.route("/")
def hello():
    return "Hello World!"

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