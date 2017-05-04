source("data_mining/preprocessing.R")

# Questions
# Is there a correlation between study time and final grade
# Which factor has the greatest effect on the final grade
# Answer with bar chart

# Is there a correlation between distractions (internet, going out) and final grade
# Do after school activities effect students grades? What're some edge cases (ie does tutoring count as after school activites)
# Do those in relationships have different grades than those without
# What is the effect of nursery/preschool on a students grades
# Yes
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

library(randomForest)
# fit <- randomForest(G3 ~ . - id - G1 - G2, 
#                     data = training_set,
#                     importance = TRUE,
#                     ntree = 5000
# )

fit <- randomForest(G3 ~ sex + age + famsize + traveltime + studytime + failures + 
                      schoolsup + famsup + paid + activities + nursery + higher + internet + romantic +
                      famrel + freetime + goout + Dalc + Walc + health + absences, 
                    data = training_set,
                    importance = TRUE,
                    ntree = 1000
)

fitWPrevGrades <- randomForest(G3 ~ sex + age + famsize + traveltime + studytime + failures + 
                      schoolsup + famsup + paid + activities + nursery + higher + internet + romantic +
                      famrel + freetime + goout + Dalc + Walc + health + absences + G2 + G1, 
                    data = training_set,
                    importance = TRUE,
                    ntree = 1000
)

varImpPlot(fit)
varImpPlot(fitWPrevGrades)

prediction <- predict(fit, test_set)
predictionPrevGrades <- predict(fitWPrevGrades, test_set)

print(fit)
results <- data.frame(id = test_set$id, actual = test_set$G3, predicted = prediction)
resultsPrevGrades <- data.frame(id = test_set$id, actual = test_set$G3, predicted = predictionPrevGrades)

accuracyWithoutPrevGrades <- sum(abs(results$actual-results$predicted) < 3)/nrow(test_set)
accuracyWithPrevGrades <- sum(abs(resultsPrevGrades$actual-resultsPrevGrades$predicted) < 3)/nrow(test_set)

results$distanceFromActual = abs(results$actual-results$predicted)
resultsPrevGrades$distanceFromActual = abs(resultsPrevGrades$actual-resultsPrevGrades$predicted)

library(ggplot2)
ggplot(results, aes(x = actual)) +
  geom_bar(aes(weight = mean(distanceFromActual))) +
  coord_cartesian(ylim=c(0,100)) + 
  labs(x = "Grade", y = "Error - Dist. From Actual", title = "With Previous Grades") 

ggplot(resultsPrevGrades, aes(x = actual)) + 
  geom_bar(aes(weight = mean(distanceFromActual))) + 
  coord_cartesian(ylim=c(0,100)) + 
  labs(x = "Grade", y = "Error - Dist. From Actual", title = "With Previous Grades") 

ggplot(results, aes(x = actual, y = predicted)) + 
  geom_point() + geom_smooth(method='lm') + 
  labs(x = "Actual Grade", y = "Predicted Grade", title = "Without Previous Grades") 

ggplot(resultsPrevGrades, aes(x = actual, y = predicted)) + 
  geom_point() + geom_smooth(method='lm') +
  labs(x = "Actual Grade", y = "Predicted Grade", title = "With Previous Grades") 
  

