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

@app.route("/recap", methods=["GET"])
def recap():
    most_listened = logic.get_most_listened_artist()
    most_listened_name = most_listened.index[0]
    most_listened_min = int(most_listened['minPlayed'][0])
    return json.dumps({"unique_song": logic.get_unique_songs(), "listened_min": int(logic.get_total_min_listened()), "most_listened_name": most_listened_name, "most_listened_min": most_listened_min})

if __name__ == '__main__':

    app.run()