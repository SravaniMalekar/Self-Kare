Implementation:

The process starts with collection of data for which we have used kaggle.  
Next the data is spilt into test data and train data and only the required and important features are   selected for creating the model.  
As the dataset is small the best fit for it was gaussian Naives bayes classifer model which is based on   conditional probability. It is imported from scikit library. After training the model is saved , using   flask a web framework consisting of post requests is created and deployed to heroku. 

Finalmodel - The model currently used  

Model2.ipnyb - TODO (for larger datasets)