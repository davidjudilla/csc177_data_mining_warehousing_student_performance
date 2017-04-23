CREATE TABLE "Students" (
	"id"	INTEGER NOT NULL UNIQUE,
	"school"	TEXT,
	"sex"	TEXT,
	"age"	INTEGER,
	"address"	TEXT,
	PRIMARY KEY("id")
);

CREATE TABLE "PortugeseClasses" (
	"id" INTEGER NOT NULL UNIQUE,
	"failures" INTEGER,
	"schoolsup" BOOLEAN,
	"famsup" BOOLEAN,
	"paid" BOOLEAN,
	"activities" BOOLEAN,
	"higher" BOOLEAN,
	"romantic"BOOLEAN,
	"famrel" INTEGER,
	"Dalc" INTEGER,
	"Walc" INTEGER,
	"health" INTEGER,
	"absences" INTEGER,
	"G1" INTEGER,
	"G2" INTEGER,
	"G3" INTEGER,
	PRIMARY KEY("id")
)

CREATE TABLE "MathClasses" (
	"id" INTEGER NOT NULL UNIQUE,
	"failures" INTEGER,
	"schoolsup" BOOLEAN,
	"famsup" BOOLEAN,
	"paid" BOOLEAN,
	"activities"BOOLEAN,
	"higher" BOOLEAN,
	"romantic"BOOLEAN,
	"famrel" INTEGER,
	"Dalc" INTEGER,
	"Walc" INTEGER,
	"health" INTEGER,
	"absences" INTEGER,
	"G1" INTEGER,
	"G2" INTEGER,
	"G3" INTEGER,
	PRIMARY KEY("id")
)

CREATE TABLE "MathTimeSpent" (
	"id" INTEGER NOT NULL UNIQUE,
	"traveltime" INTEGER,
	"studytime" INTEGER,
	"freetime" INTEGER,
	"goout" INTEGER,
	PRIMARY KEY("id")
)

CREATE TABLE "PortugeseTimeSpent" (
	"id" INTEGER NOT NULL UNIQUE,
	"traveltime" INTEGER,
	"studytime" INTEGER,
	"freetime" INTEGER,
	"goout" INTEGER,
	PRIMARY KEY("id")
)