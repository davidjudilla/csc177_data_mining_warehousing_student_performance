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
statsColumns = [
	"sex",
	"traveltime",
	"studytime",
	"failures",
	"schoolsup",
	"famsup",
	"activities",
	"nursery",
	"internet",
	"romantic",
	"famrel",
	"freetime",
	"goout",
	"wAlc",
	"health",
	"absences"
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


# Routes
@app.route("/")
def hello():
    return "Hello World!"

@app.route("/gradeAvgStats")
def gradeAvgStats():
	grade = request.args.get('grade')
	stats = {}
	for x in statsColumns:
		stats[x] = getMostOccuring(allStudCur, grade, x)

	print(stats)

	return jsonify(stats)