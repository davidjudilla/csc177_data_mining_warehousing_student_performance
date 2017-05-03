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

library(Cubist)
# fit <- randomForest(G3 ~ . - id - G1 - G2, 
#                     data = training_set,
#                     importance = TRUE,
#                     ntree = 5000
# )
trainPredictors <- training_set %>% select(sex, age, famsize, traveltime, studytime, 
                                        failures, schoolsup, famsup, paid, activities, nursery, 
                                        higher, internet, romantic, famrel, freetime, goout, Dalc, 
                                        Walc, health, absences)
trainActual <- training_set$G3

testPredictors <- test_set %>% select(sex, age, famsize, traveltime, studytime, 
                                         failures, schoolsup, famsup, paid, activities, nursery, 
                                         higher, internet, romantic, famrel, freetime, goout, Dalc, 
                                         Walc, health, absences)
testActual <- test_set$G3

fit <- cubist(x = trainPredictors, y = trainActual)
summary(fit)

prediction <- predict(fit, testPredictors)
rmse <- sqrt(mean((prediction - testActual)^2))
sprintf("RMSE: %f", rmse)

results <- data.frame(id = test_set$id, actual = testActual, predicted = prediction)
accuracy <- sum(abs(results$actual-results$predicted) < 2)/nrow(test_set)
sprintf("Accuracy: %f", rmse)


