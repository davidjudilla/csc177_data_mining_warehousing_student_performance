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
# Feature Scaling
# training_set[, 2:3] = scale(training_set[, 2:3])
# test_set[, 2:3] = scale(test_set[, 2:3])
#Coming up Simple Linear Regression

library(rpart)

fit <- rpart(romantic ~ sex + age + famsize + traveltime + studytime + failures + 
               schoolsup + famsup + paid + activities + nursery + higher + internet +
               famrel + freetime + goout + Dalc + Walc + health + absences + G3, 
             data = training_set)

print(fit)
prediction <- predict(fit, test_set, type="class")
results <- data.frame(id = test_set$id, actual = test_set$romantic, predictedTime = prediction)
errorRate <- results[results$actual != results$predictedTime,] %>% nrow / nrow(results)
acceptanceRate <- 1 - errorRate
sprintf("Acceptance Rate: %f", acceptanceRate)

library(ggplot2)
ggplot(results) +
  geom_point(aes(x = id, y = actual), color = "blue") + 
  geom_point(aes(x = id, y = predictedTime), color = "red")
