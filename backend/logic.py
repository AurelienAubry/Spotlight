import os
import ast
import pandas as pd
import numpy as np
from sklearn import preprocessing


class Logic:

    def create_streaming_df(self):
        """
        Create a dataframe from StreamingHistory files, containing all the user's streaming history
        """

        spotify_data_path = 'MyData'
        stream_hist_files = [os.path.join(spotify_data_path, x) for x in os.listdir(
            spotify_data_path) if x.split('.')[0][:-1] == 'StreamingHistory']

        streamings = []

        for stream_hist_file in stream_hist_files:
            with open(stream_hist_file, 'r', encoding='UTF-8') as f:
                new_streamings = ast.literal_eval(f.read())
                streamings.extend([streaming for streaming in new_streamings])

        streamings_df = pd.DataFrame(streamings)
        streamings_df.rename(columns={'artistName': 'artist',
                                      'trackName': 'track'}, inplace=True)
        streamings_df['minPlayed'] = streamings_df['msPlayed'] / 60000
        streamings_df.drop('msPlayed', axis=1, inplace=True)

        streamings_df['endTime'] = pd.to_datetime(streamings_df['endTime'])
        streamings_df.set_index('endTime', inplace=True)

        streamings_df = streamings_df.sort_index(ascending=False)

        self.streamings_df = streamings_df

    def create_daily_streaming_df(self):
        """
        Create a dataframe that aggregates daily streaming informations
        """

        daily_streamings_df = self.streamings_df.resample('D').agg(
            {'track': 'describe', 'artist': 'describe', 'minPlayed': 'sum'})
        daily_streamings_df.columns = ["_".join(col_name).rstrip(
            '_') for col_name in daily_streamings_df.columns.to_flat_index()]
        daily_streamings_df.drop('artist_count', axis=1, inplace=True)
        daily_streamings_df = daily_streamings_df.sort_index(ascending=False)
        daily_streamings_df.rename(
            columns={'minPlayed_minPlayed': 'minPlayed'}, inplace=True)
        daily_streamings_df['cumMinPlayed'] = daily_streamings_df['minPlayed'].cumsum()
        daily_streamings_df['cumTrack_count'] = daily_streamings_df['track_count'].cumsum()

        self.start_date = daily_streamings_df.index.min()
        print(self.start_date)
        self.end_date = daily_streamings_df.index.max()
        print(self.end_date)
        self.daily_streamings_df = daily_streamings_df

    def create_artist_songs_df(self):
        """
        Create a dataframe that link each song to it's artist
        """

        artist_songs_df = self.streamings_df.reset_index()[['artist', 'track']].copy()
        artist_songs_df.drop_duplicates(
            subset=['track', 'artist'], keep=False, inplace=True)
        artist_songs_df = artist_songs_df.sort_values(by='artist', ascending=False)
        artist_songs_df = artist_songs_df.reset_index(drop=True)

        self.artist_songs_df = artist_songs_df

    def get_date_offset(self, start_date, day_offset):
        """
        Apply a day offset to the provided date and return the the date

        Arguments:
            start_date {Timestamp} -- the intial date
            day_offset {int} -- the day offset to apply

        Returns:
            str -- the initial date with the day offset applied
        """

        date = start_date - pd.DateOffset(days=day_offset)
        return date.strftime('%Y-%m-%d')

    def get_daily_listened_min_df(self, day_offset):
        """
        Get the daily number of minutes listened over the last [day_offset] days

        Arguments:
            day_offset {int} -- the duration of the analyzed period (last [day_offset] days)

        Returns:
            df -- dataframe containing the number of minutes listened over the last [day_offset] days
            day 1 : 10 min
            day 2 : 60 min
            ...
        """
        date = self.get_date_offset(self.end_date, day_offset)
        return self.daily_streamings_df[self.daily_streamings_df.index > date]["minPlayed"]

    def get_daily_listened_tracks_df(self, day_offset):
        """
        Get the daily number of tracks listened over the last [day_offset] days

        Arguments:
            day_offset {int} -- the duration of the analyzed period (last [day_offset] days)

        Returns:
            df -- dataframe containing the number of tracks listened over the last [day_offset] days
            day 1 : 10 tracks
            day 2 : 60 tracks
            ...
        """

        date = self.get_date_offset(self.end_date, day_offset)
        return self.daily_streamings_df[self.daily_streamings_df.index > date]["track_count"]

    def get_artists_list(self, day_offset):
        """
        Get the list of artists listened over the last [day_offset] days

        Arguments:
            day_offset {int} -- the duration of the analyzed period (last [day_offset] days)

        Returns:
            list of strings -- the list of artists listened over the last [day_offset] days
        """

        date = self.get_date_offset(self.end_date, day_offset)
        artists_df = self.streamings_df[self.streamings_df.index >
                                          date]['artist'].unique()
        return artists_df.tolist()

    def get_top_artists_df(self, day_offset, count):
        """
        Get the dataframe of the [count] top artists over the last [day_offset] days

        Arguments:
            day_offset {int} -- the duration of the analyzed period (last [day_offset] days)
            count {int} -- the number of top artists to return

        Returns:
            dataframe -- the dataframe containing the [count] top artists over the last [day_offset] days
        """

        date = self.get_date_offset(self.end_date, day_offset)
        top_artists_df = self.streamings_df[self.streamings_df.index > date].groupby(by=['artist']).agg(
            {'minPlayed': 'sum', 'track': 'count'}).sort_values(by='minPlayed', ascending=False).head(count)
        return top_artists_df['minPlayed'].apply(np.ceil)

    def get_top_songs_df(self, day_offset, count):
        """
        Get the dataframe of the [count] top songs over the last [day_offset] days

        Arguments:
            day_offset {int} -- the duration of the analyzed period (last [day_offset] days)
            count {int} -- the number of top songs to return

        Returns:
            dataframe -- the dataframe containing the [count] top songs over the last [day_offset] days
        """

        date = self.get_date_offset(self.end_date, day_offset)
        top_songs_df = self.streamings_df[self.streamings_df.index > date].groupby(by=['track']).agg(
            {'minPlayed': 'sum', 'track': 'count'}).sort_values(by='minPlayed', ascending=False).head(count)
        return top_songs_df

    def get_hours_day_listen(self, day_offset):
        """
        Get a summary the average minutes listened every hour of the day

        Arguments:
            day_offset {int} -- the duration of the analyzed period (last [day_offset] days)

        Returns:
            dataframe -- the dataframe containing the averages minutes listened every hour of the day
        """

        date = self.get_date_offset(self.end_date, day_offset)
        hours_streamings_df = self.streamings_df[self.streamings_df.index > date].resample(
            'H').sum()
        hours_streamings_df = hours_streamings_df.groupby(
            hours_streamings_df.index.hour).agg(lambda x: x.mean(skipna=False))

        names = hours_streamings_df.columns
        scaler = preprocessing.MinMaxScaler()
        scaled_df = scaler.fit_transform(hours_streamings_df)
        scaled_df = pd.DataFrame(scaled_df, columns=names)

        return scaled_df

    def get_min_listened(self, day_offset):
        """
        Get the number of minutes listened over the last [day_offset] days

        Arguments:
            day_offset {int} -- the duration of the analyzed period (last [day_offset] days)

        Returns:
            int -- the number of minutes listened over the last [day_offset] days
        """

        date = self.get_date_offset(self.end_date, day_offset)
        return int(self.daily_streamings_df.at[date, 'cumMinPlayed'][0])

    def get_avg_min_listened(self, day_offset):
        """
        Get the average number of minutes listened over the last [day_offset] days

        Arguments:
            day_offset {int} -- the duration of the analyzed period (last [day_offset] days)

        Returns:
            int -- the average number of minutes listened over the last [day_offset] days
        """

        date = self.get_date_offset(self.end_date, day_offset)
        avg_min_listened = self.daily_streamings_df[self.daily_streamings_df.index > date]['minPlayed'].mean(
        )
        return int(avg_min_listened)

    def get_tracks_listened(self, day_offset):
        """
        Get the number of tracks listend over the last [day_offset] days

        Arguments:
            day_offset {int} -- the duration of the analyzed period (last [day_offset] days)

        Returns:
            int -- the number of tracks listened over the last [day_offset] days
        """

        date = self.get_date_offset(self.end_date, day_offset)
        return int(self.daily_streamings_df.at[date, 'cumTrack_count'][0])

    def get_daily_artist_streamings_df(self, day_offset, artist):
        """
        Get the daily streamings of [artist] listend over the last [day_offset] days

        Arguments:
            day_offset {int} -- the duration of the analyzed period (last [day_offset] days)
            artist {string} -- the name of the artist
        Returns:
            df -- the daily streamings of [artist] listend over the last [day_offset] days
        """
        date = self.get_date_offset(self.end_date, day_offset)
        daily_artist_streamings_df = self.streamings_df.loc[self.streamings_df['artist'] == artist]
        daily_artist_streamings_df = daily_artist_streamings_df.resample(
            'D').agg({'track': 'count', 'minPlayed': 'sum'})
        return daily_artist_streamings_df[daily_artist_streamings_df.index > date]

    def get_artist_min_listened(self, day_offset, artist):
        """
        Get the daily minutes of [artist] listend over the last [day_offset] days

        Arguments:
            day_offset {int} -- the duration of the analyzed period (last [day_offset] days)
            artist {string} -- the name of the artist
        Returns:
            df -- the daily minutes of [artist] listend over the last [day_offset] days
        """

        daily_artist_streamings_df = self.get_daily_artist_streamings_df(
            day_offset, artist)
        return daily_artist_streamings_df['minPlayed']

    def get_artist_track_listened(self, day_offset, artist):
        """
        Get the daily tracks of [artist] listend over the last [day_offset] days

        Arguments:
            day_offset {int} -- the duration of the analyzed period (last [day_offset] days)
            artist {string} -- the name of the artist
        Returns:
            df -- the daily tracks of [artist] listend over the last [day_offset] days
        """

        daily_artist_streamings_df = self.get_daily_artist_streamings_df(
            day_offset, artist)
        return daily_artist_streamings_df['track']

    def __init__(self):
        self.create_streaming_df()
        self.create_daily_streaming_df()
        self.create_artist_songs_df()
