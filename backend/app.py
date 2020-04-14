from flask import Flask, jsonify, request
import json
import numpy as np

from logic import *

app = Flask(__name__)
logic = Logic()


@app.route("/get/daily-listened-min", methods=["GET"])
def get_daily_listened_min():
    """
        Get the daily number of minutes listened over the last [day_offset] days
    """
    day_offset = int(request.args.get('dayOffset'))
    daily_listened_min = logic.get_daily_listened_min_df(day_offset)
    return json.dumps(daily_listened_min.to_json(orient='split', date_format='iso'))


@app.route("/get/daily-listened-tracks", methods=["GET"])
def daily_listened_tracks():
    """
        Get the daily number of tracks listened over the last [day_offset] days
    """
    day_offset = int(request.args.get('dayOffset'))
    daily_listened_tracks_df = logic.get_daily_listened_tracks_df(day_offset)
    return json.dumps(daily_listened_tracks_df.to_json(orient='split', date_format='iso'))


@app.route("/get/artists", methods=["GET"])
def get_artists_list():
    """
        Get the list of artists listened over the last [day_offset] days
    """
    day_offset = int(request.args.get('dayOffset'))
    artists_list = logic.get_artists_list(day_offset)
    return json.dumps({"artists": artists_list})


@app.route("/get/top-artists", methods=["GET"])
def get_top_artists():
    """
        Get the dataframe of the [count] top artists over the last [day_offset] days
    """
    day_offset = int(request.args.get('dayOffset'))
    count = int(request.args.get('count'))
    top_artists_df = logic.get_top_artists_df(day_offset, count)
    return json.dumps(top_artists_df.to_json(orient='split'))


@app.route("/get/top-songs", methods=["GET"])
def get_top_songs():
    """
        Get the dataframe of the [count] top songs over the last [day_offset] days
    """
    day_offset = int(request.args.get('dayOffset'))
    count = int(request.args.get('count'))
    top_songs_df = logic.get_top_songs_df(day_offset, count)
    return json.dumps(top_songs_df.to_json(orient='split'))


@app.route("/get/day-hours", methods=["GET"])
def get_hours_day_listen():
    """
        Get a summary the average minutes listened every hour of the day
    """
    day_offset = int(request.args.get('dayOffset'))
    hours_streamings_df = logic.get_hours_day_listen(day_offset)
    return json.dumps(hours_streamings_df.to_json(orient='split'))


@app.route("/get/min-listened", methods=["GET"])
def get_min_listened():
    """
        Get the number of minutes listened over the last [day_offset] days
    """
    day_offset = int(request.args.get('dayOffset'))
    min_listened = logic.get_min_listened(day_offset)
    return json.dumps({"min_listened": min_listened})


@app.route("/get/avg-min-listened", methods=["GET"])
def get_avg_min_listened():
    """
    Get the average number of minutes listened over the last [dayOffset] days
    """
    day_offset = int(request.args.get('dayOffset'))
    avg_min_listened = logic.get_avg_min_listened(day_offset)
    return json.dumps({"avg_min_listened": avg_min_listened})


@app.route("/get/tracks-listened", methods=["GET"])
def get_tracks_listened():
    """
    Get the number of tracks listend over the last [dayOffset] days
    """
    day_offset = int(request.args.get('dayOffset'))
    tracks_listened = logic.get_tracks_listened(day_offset)
    return json.dumps({"tracks_listened": tracks_listened})


@app.route("/get/artist-tracks-listened", methods=["GET"])
def get_artist_tracks_listened():
    """
        Get the daily tracks of [artist] listend over the last [day_offset] days
    """
    day_offset = int(request.args.get('dayOffset'))
    artist = request.args.get('artist')
    artist_tracks_listened = logic.get_artist_track_listened(day_offset, artist)
    return json.dumps(artist_tracks_listened.to_json(orient='split'))


@app.route("/get/artist-min-listened", methods=["GET"])
def get_artist_min_listened():
    """
        Get the daily minutes of [artist] listend over the last [day_offset] days
    """
    day_offset = int(request.args.get('dayOffset'))
    artist = request.args.get('artist')
    artist_tracks_listened = logic.get_artist_min_listened(day_offset, artist)
    return json.dumps(artist_tracks_listened.to_json(orient='split'))


if __name__ == '__main__':

    app.run()
