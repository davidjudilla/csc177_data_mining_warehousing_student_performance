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
	- `venv\Scripts\activate` if you're on Windows
- Now run `sudo pip install Flask`
- Finally, `flask run`, and follow the link logged to console