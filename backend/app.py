from flask import Flask, jsonify, request
import json
import numpy as np

from logic import *

app = Flask(__name__)
logic = Logic()


@app.route('/')
def test():
    return "Welcome to Flask!"

"""
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
"""

@app.route("/get/top-artists", methods=["GET"])
def get_top_artist():
    start_date = request.args.get('startDate')
    count = int(request.args.get('count'))
    top_artist_df = logic.get_top_artist_df(start_date, count)
    return json.dumps(top_artist_df.to_json(orient='index'))

@app.route("/get/top-songs", methods=["GET"])
def get_top_song():
    start_date = request.args.get('startDate')
    count = int(request.args.get('count'))
    top_song_df = logic.get_top_song_df(start_date, count)
    return json.dumps(top_song_df.to_json(orient='index'))

@app.route("/get/day-hours", methods=["GET"])
def get_hours_day_listen():
    start_date = request.args.get('startDate')
    hours_streamings_df = logic.get_hours_day_listen(start_date)
    return json.dumps(hours_streamings_df.to_json(orient='index'))

@app.route("/get/min-listened", methods=["GET"])
def get_min_listened():
    start_date = request.args.get('startDate')
    min_listened = logic.get_min_listened(start_date)
    return json.dumps({"min_listened": int(min_listened)})

@app.route("/get/tracks-listened", methods=["GET"])
def get_tracks_listened():
    start_date = request.args.get('startDate')
    tracks_listened = logic.get_tracks_listened(start_date)
    return json.dumps({"tracks_listened": int(tracks_listened)})

if __name__ == '__main__':

    app.run()