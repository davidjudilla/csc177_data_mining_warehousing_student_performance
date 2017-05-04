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

# Classifying if a student is passing or failing, so add new column to base formula
# Passing is a grade GTE 10
allStud$pass <- allStud$G3 >= 10

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

fit <- randomForest(as.factor(pass) ~ sex + age + famsize + traveltime + studytime + failures + 
                      schoolsup + famsup + paid + activities + nursery + higher + internet + romantic +
                      famrel + freetime + goout + Dalc + Walc + health + absences, 
                    data = training_set,
                    importance = TRUE,
                    ntree = 1000,
                    do.trace = 100
)

varImpPlot(fit)
fit.prediction <- predict(fit, test_set, type = "prob")
print(fit)
results <- data.frame(id = test_set$id, actual = test_set$pass, predicted = prediction)



library(ggplot2)
ggplot(results, aes(x = actual, y = predicted)) +
  geom_point()

fit.pr <- predict(fit, test_set, type = "prob")[,2]
fit.pred <- prediction(fit.pr, test_set$pass)
fit.perf = performance(fit.pred, "tpr", "fpr")
plot(fit.perf,main="ROC Curve for Random Forest",col=2,lwd=2)
abline(a=0,b=1,lwd=2,lty=2,col="gray")

