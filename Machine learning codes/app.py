import joblib
from flask import Flask, request
from flask_cors import CORS 
import json

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['POST'])
def func():
    #data = request.get_json()
    filePath = './finalmodel.pkl'
    file = open(filePath, "rb")
    model = joblib.load(file)
    data = json.loads(request.data)
    prediction = model.predict(data)
    if prediction[0]==0:
        return ("Mild severity")
    elif prediction[0]==1:
        return("Moderate severity")
    elif prediction[0]==2:
        return("Severe severity")           
    else:
        return("Request error")

if __name__ == "__main__": 
		app.run(debug = True) 
