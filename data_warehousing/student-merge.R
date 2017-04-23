mathStud=read.table("student/student-mat.csv",sep=";",header=TRUE)
portStud=read.table("student/student-por.csv",sep=";",header=TRUE)

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
mathTimeTable <- data.frame(
  id = mathTable$id,
  mathTable$traveltime,
  mathTable$studytime,
  mathTable$freetime,
  mathTable$goout
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
portTimeTable <- data.frame(
  id = portTable$id,
  portTable$traveltime,
  portTable$studytime,
  portTable$freetime,
  portTable$goout
)
dropCols <- c("traveltime", "studytime", "freetime", "goout")
portTable <- portTable %>% select(-one_of(dropCols))
# portTable$timeId <- portTable$id


# Look at all students, not just those who take BOTH math and portugese
unionStud <- merge(mathStud, portStud, all = TRUE)

