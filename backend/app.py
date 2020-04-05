from flask import Flask, jsonify, request
import json
import numpy as np

from logic import *

app = Flask(__name__)
logic = Logic()

@app.route("/get/daily-listened-min", methods=["GET"])
def get_daily_listened_min():
    day_offset = int(request.args.get('dayOffset'))
    daily_listened_min = logic.get_daily_listened_min_df(day_offset)
    return json.dumps(daily_listened_min.to_json(orient='split', date_format='iso'))

@app.route("/get/daily-listened-tracks", methods=["GET"])
def daily_listened_tracks():
    day_offset = int(request.args.get('dayOffset'))
    daily_listened_tracks_df = logic.get_daily_listened_tracks_df(day_offset)
    return json.dumps(daily_listened_tracks_df.to_json(orient='split', date_format='iso'))


@app.route("/get/top-artists", methods=["GET"])
def get_top_artists():
    day_offset = int(request.args.get('dayOffset'))
    count = int(request.args.get('count'))
    top_artists_df = logic.get_top_artists_df(day_offset, count)
    return json.dumps(top_artists_df.to_json(orient='split'))


@app.route("/get/top-songs", methods=["GET"])
def get_top_songs():
    day_offset = int(request.args.get('dayOffset'))
    count = int(request.args.get('count'))
    top_songs_df = logic.get_top_songs_df(day_offset, count)
    return json.dumps(top_songs_df.to_json(orient='split'))


@app.route("/get/day-hours", methods=["GET"])
def get_hours_day_listen():
    day_offset = int(request.args.get('dayOffset'))
    hours_streamings_df = logic.get_hours_day_listen(day_offset)
    return json.dumps(hours_streamings_df.to_json(orient='index'))


@app.route("/get/min-listened", methods=["GET"])
def get_min_listened():
    day_offset = int(request.args.get('dayOffset'))
    min_listened = logic.get_min_listened(day_offset)
    return json.dumps({"min_listened": min_listened})

@app.route("/get/avg-min-listened", methods=["GET"])
def get_avg_min_listened():
    day_offset = int(request.args.get('dayOffset'))
    avg_min_listened = logic.get_avg_min_listened(day_offset)
    return json.dumps({"avg_min_listened": avg_min_listened})


@app.route("/get/tracks-listened", methods=["GET"])
def get_tracks_listened():
    day_offset = int(request.args.get('dayOffset'))
    tracks_listened = logic.get_tracks_listened(day_offset)
    return json.dumps({"tracks_listened": tracks_listened})


if __name__ == '__main__':

    app.run()
