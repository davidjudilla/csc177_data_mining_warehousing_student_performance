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

@app.route("/avgStatsFromGrade")
def avgStatsFromGrade():
	grade = request.args.get('grade')
	stats = {
		"sex": getMostOccuring(allStudC, grade, "sex"),
		"traveltime": getMostOccuring(allStudC, grade, "traveltime"),
		"studytime": getMostOccuring(allStudC, grade, "studytime"),
		"failures": getMostOccuring(allStudC, grade, "failures"),
		"schoolsup": getMostOccuring(allStudC, grade, "schoolsup"),
		"famsup": getMostOccuring(allStudC, grade, "famsup"),
		"activities": getMostOccuring(allStudC, grade, "activities"),
		"nursery": getMostOccuring(allStudC, grade, "nursery"),
		"internet": getMostOccuring(allStudC, grade, "internet"),
		"romantic": getMostOccuring(allStudC, grade, "romantic"),
		"famrel": getMostOccuring(allStudC, grade, "famrel"),
		"freetime": getMostOccuring(allStudC, grade, "freetime"),
		"goout": getMostOccuring(allStudC, grade, "goout"),
		"wAlc": getMostOccuring(allStudC, grade, "Walc"),
		"health": getMostOccuring(allStudC, grade, "health"),
		"absences": getMostOccuring(allStudC, grade, "absences")
	}
	print(stats)

	return jsonify(stats)