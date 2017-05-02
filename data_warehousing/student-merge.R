mathStud=read.table("student/student-mat.csv",sep=";",header=TRUE)
portStud=read.table("student/student-por.csv",sep=";",header=TRUE)

# Change/transform labels of columns such as ("yes", "no") -> (1, 0)
#factor(select(mathStud, schoolsup:romantic), levels = c("yes", "no"), labels = c(1,0))
mathStud$schoolsup = factor(mathStud$schoolsup, levels = c("yes", "no"), labels = c(1,0))
mathStud$famsup = factor(mathStud$famsup, levels = c("yes", "no"), labels = c(1,0))
mathStud$paid = factor(mathStud$paid, levels = c("yes", "no"), labels = c(1,0))
mathStud$activities = factor(mathStud$activities, levels = c("yes", "no"), labels = c(1,0))
mathStud$nursery = factor(mathStud$nursery, levels = c("yes", "no"), labels = c(1,0))
mathStud$higher = factor(mathStud$higher, levels = c("yes", "no"), labels = c(1,0))
mathStud$internet = factor(mathStud$internet, levels = c("yes", "no"), labels = c(1,0))
mathStud$romantic = factor(mathStud$romantic, levels = c("yes", "no"), labels = c(1,0))

portStud$schoolsup = factor(portStud$schoolsup, levels = c("yes", "no"), labels = c(1,0))
portStud$famsup = factor(portStud$famsup, levels = c("yes", "no"), labels = c(1,0))
portStud$paid = factor(portStud$paid, levels = c("yes", "no"), labels = c(1,0))
portStud$activities = factor(portStud$activities, levels = c("yes", "no"), labels = c(1,0))
portStud$nursery = factor(portStud$nursery, levels = c("yes", "no"), labels = c(1,0))
portStud$higher = factor(portStud$higher, levels = c("yes", "no"), labels = c(1,0))
portStud$internet = factor(portStud$internet, levels = c("yes", "no"), labels = c(1,0))
portStud$romantic = factor(portStud$romantic, levels = c("yes", "no"), labels = c(1,0))

# Merge Math and Portugese data together. Result will be only students who have taken both math and portugese
natJoinStud=merge(mathStud, portStud,by=c("school","sex","age","address","famsize","Pstatus","Medu","Fedu","Mjob","Fjob","reason","nursery","internet", "guardian"))
natJoinStud$id = 1:nrow(natJoinStud) # Give id to all students
natJoinStud = select(natJoinStud, id, school:G3.y) # Put id first for clarity

# Natural Joined Data
# Splitting data for fact tables (student, family, time)
library(dplyr)

# Student Table
studentTable <- data.frame(
  id = natJoinStud$id,
  select(natJoinStud, school: address)
)

# Math Class Table
mathTable <- data.frame(
  id = natJoinStud$id,
  natJoinStud[, grep("\\.x", colnames(natJoinStud))] # Get all columns that end in .x (from mathStud),
)
  # Remove the appended .y from the two datasets merging
cols <- colnames(mathTable)
colnames(mathTable) <- ifelse(substr(cols, nchar(cols)-1, nchar(cols)) == ".x", 
  substr(cols, 1, nchar(cols) - 2),
  cols
)

# Math Time Table
mathTimeSpentTable <- data.frame(
  id = mathTable$id,
  traveltime = mathTable$traveltime,
  studytime = mathTable$studytime,
  freetime = mathTable$freetime,
  goout = mathTable$goout
)
# Drop time related columns from the original
dropCols <- c("traveltime", "studytime", "freetime", "goout")
mathTable <- mathTable %>% select(-one_of(dropCols))
# mathTable$timeId <- mathTable$id


# Portugese Class Table
portTable <- data.frame(
  id = natJoinStud$id,
  natJoinStud[, grep("\\.y", colnames(natJoinStud))]
)
  # Remove the appended .y from the two datasets merging
cols <- colnames(portTable)
colnames(portTable) <- ifelse(substr(cols, nchar(cols)-1, nchar(cols)) == ".y",
  substr(cols, 1, nchar(cols) - 2),
  cols
)

# Portugese Time Table
portTimeSpentTable <- data.frame(
  id = portTable$id,
  traveltime = portTable$traveltime,
  studytime = portTable$studytime,
  freetime = portTable$freetime,
  goout = portTable$goout
)
dropCols <- c("traveltime", "studytime", "freetime", "goout")
portTable <- portTable %>% select(-one_of(dropCols))
# portTable$timeId <- portTable$id

write.csv(studentTable, file="data_warehousing/csv/students.csv")
write.csv(mathTable, file="data_warehousing/csv/mathClasses.csv")
write.csv(mathTimeSpentTable, file="data_warehousing/csv/mathTimeSpent.csv")
write.csv(portTable, file="data_warehousing/csv/portugeseClasses.csv")
write.csv(portTimeSpentTable, file="data_warehousing/csv/portugeseTimeSpent.csv")


# Look at all students, not just those who take BOTH math and portugese
# Do later
unionStud <- merge(mathStud, portStud, all = TRUE)

#Create time dimensional table
# Get both math and port time tables
mathTime=read.table("data_warehousing/csv/mathTimeSpent.csv",sep=";",header=TRUE)
portTime=read.table("data_warehousing/csv/portugeseTimeSpent.csv",sep=";",header=TRUE)

# Join both classes
time <- merge(mathTime, portTime, all = TRUE)
time

relationship = data.frame(
  famrel = unionStud$famrel,
  romantic = unionStud$romantic,
  famsup = unionStud$famsup 
)
relationship