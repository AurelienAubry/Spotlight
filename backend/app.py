from flask import Flask, jsonify
import json
import numpy as np

app = Flask(__name__)

@app.route('/')
def test():
    return "Welcome to Flask!"


@app.route("/data", methods=["GET"])
def data():
    list = (50*np.random.rand(1,12)).tolist()
    print(list)
    return json.dumps(list[0])

if __name__ == '__main__':
    app.run()