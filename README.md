# CSC 177 - Data Mining and Warehousing - Student Performance
Semester project using machine learning algorithms to predict student grades.

Web application made to view and explore discoveries.

# Installation
- Install R Studio and SQLite
- Clone this repo and `cd` into it.

## R Studio
- Unzip `student.zip` into a new folder called `student/`
- Open the file `student-merge.R` in R Studio and make sure your working directory is at the root of the project.
- Once you've ran the .R file, the CSVs in `/data_warehousing/csv/` will be updated.

## SQLite
- Open SQLite and open the .db file in `/data_warehousing/csc177_Final_Project.db`
- CSVs created by `student-merge.R` were used to populate the database

## Server
- `cd` into `/server`
- Sidenote: Reference these links ([installation](http://flask.pocoo.org/docs/0.12/installation/#installation) + [quickstart](http://flask.pocoo.org/docs/0.12/quickstart/)) for help.
- Make sure you have virtualenv installed `sudo pip install virtualenv`
- Then run `. venv/bin/activate`
	- `venv\bin\activate.bat` if you're on Windows
- Now run `sudo pip install Flask`
- Run `export FLASK_APP=server.py`
	- 'set FLASK_APP=server.py`
- Finally, `flask run`, and follow the link logged to console

## Endpoints
- once you have the server running on `localhost:5000`, you'll have access to our endpoints, such as `localhost:5000/gradeAvgStats?grade=12`:
	- `/gradeAvgStats?grade=12`
		- returns the avg of each column for a specific grade
		- outputs:
		```
			{
				Dalc: 1.5436893203883495,
				Walc: 2.3883495145631066,
				absences: 3.7864077669902914,
				activities: "1",
				age: 16.466019417475728,
				failures: 0.08737864077669903,
				famrel: 3.883495145631068,
				famsup: "1",
				freetime: 3.1941747572815533,
				goout: 3.029126213592233,
				health: 3.8349514563106797,
				internet: "1",
				nursery: "1",
				romantic: "0",
				schoolsup: "0",
				sex: "F",
				studytime: "2",
				traveltime: "1"
			}
		```
	- `/gradesToCol?&col=failures`
		- returns the averages of the given column for all grades (0-20)
		- outputs:
		```
			[
				0.8867924528301887,
				1,
				null,
				null,
				2,
				1.25,
				0.1111111111111111,
				1.263157894736842,
				0.7313432835820896,
				0.47619047619047616,
				0.42483660130718953,
				0.13245033112582782,
				0.08737864077669903,
				0.08849557522123894,
				0.011111111111111112,
				0.04878048780487805,
				0.019230769230769232,
				0,
				0.037037037037037035,
				0
			]
		```
