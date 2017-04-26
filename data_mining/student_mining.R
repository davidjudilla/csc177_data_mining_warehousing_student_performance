mathStud=read.table("student/student-mat.csv",sep=";",header=TRUE)
portStud=read.table("student/student-por.csv",sep=";",header=TRUE)

# Change labels of columns such as ("yes", "no") -> (1, 0)
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


# Look at all students, not just those who take BOTH math and portugese
# Do later
unionStud <- merge(mathStud, portStud, 
                  all = TRUE
            )


# Questions
# Is there a correlation between study time and final grade
# Is there a correlation between distractions (internet, going out) and final grade
# Do after school activities effect students grades? What're some edge cases (ie does tutoring count as after school activites)
# Do those in relationships have different grades than those without
# What is the effect of nursery/preschool on a students grades
# Do students with school/family educational support have improved grades over other students

library(caTools)
set.seed(123)
split = sample.split(unionStud, SplitRatio = 0.8)
training_set = subset(unionStud, split == T)
test_set = subset(unionStud, split == F)
#Feature Scaling
# training_set[, 2:3] = scale(training_set[, 2:3])
# test_set[, 2:3] = scale(test_set[, 2:3])
#Coming up Simple Linear Regression
