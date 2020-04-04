import os
import ast
import pandas as pd


class Logic:

    def create_streaming_df(self):
        spotify_data_path = 'MyData'
        stream_hist_files = [os.path.join(spotify_data_path, x) for x in os.listdir(spotify_data_path) if x.split('.')[0][:-1] == 'StreamingHistory']

        streamings = []

        for stream_hist_file in stream_hist_files:
            with open(stream_hist_file, 'r', encoding='UTF-8') as f:
                new_streamings = ast.literal_eval(f.read())
                streamings.extend([streaming for streaming in new_streamings])

        streamings_df = pd.DataFrame(streamings)
        streamings_df.rename(columns = {'artistName':'artist', 'trackName':'track'}, inplace = True)
        streamings_df['minPlayed'] = streamings_df['msPlayed'] / 60000
        streamings_df.drop('msPlayed', axis=1, inplace=True)

        streamings_df['endTime'] = pd.to_datetime(streamings_df['endTime'])
        streamings_df.set_index('endTime',inplace=True)

        streamings_df = streamings_df.sort_index(ascending=False)

        self.streamings_df = streamings_df

    def create_daily_streaming_df(self):
        daily_streamings_df = self.streamings_df.resample('D').agg({'track': 'describe', 'artist': 'describe', 'minPlayed': 'sum'})
        daily_streamings_df.columns = ["_".join(col_name).rstrip('_') for col_name in daily_streamings_df.columns.to_flat_index()]
        daily_streamings_df.drop('artist_count', axis=1, inplace=True)
        daily_streamings_df = daily_streamings_df.sort_index(ascending=False)
        daily_streamings_df.rename(columns = {'minPlayed_minPlayed':'minPlayed'}, inplace = True)
        daily_streamings_df['cumMinPlayed'] = daily_streamings_df['minPlayed'].cumsum()
        daily_streamings_df['cumTrack_count'] = daily_streamings_df['track_count'].cumsum()

        self.daily_streamings_df = daily_streamings_df

    def create_artist_songs_df(self):
        artist_songs_df = self.streamings_df.reset_index()[['artist', 'track']].copy()
        artist_songs_df.drop_duplicates(subset =['track', 'artist'],keep = False, inplace = True)
        artist_songs_df = artist_songs_df.sort_values(by='artist', ascending=False)
        artist_songs_df = artist_songs_df.reset_index(drop=True)

        self.artist_songs_df = artist_songs_df

    def get_top_artist_df(self, start_date, count):
        top_artist_df = self.streamings_df[self.streamings_df.index > start_date].groupby(by=['artist']).agg({'minPlayed': 'sum', 'track': 'count'}).sort_values(by='minPlayed',ascending=False).head(count)
        return top_artist_df

    def get_top_song_df(self, start_date, count):
        top_songs_df = self.streamings_df[self.streamings_df.index > start_date].groupby(by=['track']).agg({'minPlayed': 'sum', 'track': 'count'}).sort_values(by='minPlayed', ascending=False).head(count)
        return top_songs_df

    def get_hours_day_listen(self, start_date):
        hours_streamings_df = self.streamings_df[self.streamings_df.index < start_date].resample('1H').sum()
        hours_streamings_df = hours_streamings_df.groupby(hours_streamings_df.index.hour).agg(lambda x: x.mean(skipna=False))
        return hours_streamings_df

    def get_min_listened(self, start_date):
        return self.daily_streamings_df.at[start_date, 'cumMinPlayed'][0]

    def get_tracks_listened(self, start_date):
        return self.daily_streamings_df.at[start_date, 'cumTrack_count'][0]


    def __init__(self):
        self.create_streaming_df()
        self.create_daily_streaming_df()
        self.create_artist_songs_df()
