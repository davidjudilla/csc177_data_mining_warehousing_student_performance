# **********************************************************************
#CSC 177 Data Warehouse, ETL, Data Mart
# Student Life and Grade Coorelation
# **********************************************************************

#import both flat csv files
mathStud=read.table("student/student-mat.csv",sep=";",header=TRUE)
portStud=read.table("student/student-por.csv",sep=";",header=TRUE)

library(dplyr) # use for easy joining


allStud <-full_join(mathStud, portStud) # join both math and port/language students

allStud$id = 1:nrow(allStud) # Give id to all students

allStud = select(allStud, id, school:G3) #Put id first for clarity

allStud$reason <- NULL # not needed for dw/dm
allStud$school <- NULL # not needed for dw/dm


# Change/transform labels of columns such as ("yes", "no") -> (1, 0)
allStud$schoolsup = factor(allStud$schoolsup, levels = c("yes", "no"), labels = c(1,0))
allStud$famsup = factor(allStud$famsup, levels = c("yes", "no"), labels = c(1,0))
allStud$paid = factor(allStud$paid, levels = c("yes", "no"), labels = c(1,0))
allStud$activities = factor(allStud$activities, levels = c("yes", "no"), labels = c(1,0))
allStud$nursery = factor(allStud$nursery, levels = c("yes", "no"), labels = c(1,0))
allStud$higher = factor(allStud$higher, levels = c("yes", "no"), labels = c(1,0))
allStud$internet = factor(allStud$internet, levels = c("yes", "no"), labels = c(1,0))
allStud$romantic = factor(allStud$romantic, levels = c("yes", "no"), labels = c(1,0))


#student fact table
student = data.frame(
  id = allStud$id,
  school = allStud$school,
  sex = allStud$sex,
  age = allStud$age,
  address = allStud$address,
  G1 = allStud$G1,
  G2 = allStud$G2,
  G3 = allStud$G3
)
student

#Create time dimensional table
time = data.frame(
  id = allStud$id,
  traveltime = allStud$traveltime,
  studytime = allStud$studytime,
  freetime = allStud$freetime,
  goout = allStud$goout
)
time

#Create relationship dimensional table
relationship = data.frame(
  id = allStud$id,
  famrel = allStud$famrel,
  romantic = allStud$romantic,
  famsup = allStud$famsup 
)
relationship


# education dimensional table
education = data.frame(
  id = allStud$id,
  failures = allStud$failures,
  absences = allStud$absences,
  paid = allStud$paid,
  schoolsup = allStud$schoolsup,
  higher = allStud$higher
)
education

# home life dimensional table
home_life = data.frame(
  id = allStud$id,
  fedu = allStud$Fedu,
  medu = allStud$Medu,
  Pstatus = allStud$Pstatus,
  guardian = allStud$guardian,
  famsize = allStud$famsize,
  address = allStud$address,
  internet = allStud$internet,
  mjob = allStud$Mjob,
  fjob = allStud$Fjob,
  dalc = allStud$Dalc,
  walc = allStud$Walc
)
home_life






# write time and relationship tables to csv
write.csv(student, file="data_warehousing/csv/studentFactTable.csv")
write.csv(relationship, file="data_warehousing/csv/relationshipDimension.csv")
write.csv(time, file="data_warehousing/csv/timeDimension.csv")
write.csv(education, file="data_warehousing/csv/educationDimension.csv")
write.csv(home_life, file="data_warehousing/csv/home_lifeDimension.csv")

# The joining of the CSV's into a
# sqlite database is then done with DB Browser
# application and written to data_warehousing/dw-dm-final.db

