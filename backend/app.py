from flask import Flask, jsonify
import json
import numpy as np

from logic import *

app = Flask(__name__)
logic = Logic()


@app.route('/')
def test():
    return "Welcome to Flask!"


@app.route("/data", methods=["GET"])
def data():
    dates, data = logic.get_total_daily_listening_data()
    return json.dumps({"labels": dates, "data": data})

if __name__ == '__main__':

    app.run()