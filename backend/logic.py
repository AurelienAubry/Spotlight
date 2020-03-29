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
        streamings_df['minPlayed'] = streamings_df['msPlayed'] / 60000
        streamings_df['endTime'] = pd.to_datetime(streamings_df['endTime'])

        streamings_df.set_index('endTime',inplace=True)
        streamings_df.index = pd.DatetimeIndex(streamings_df.index)
        streamings_df = streamings_df.sort_index(ascending=True)
        self.streamings_df = streamings_df


    def get_total_daily_listening_data(self):
        daily_streamings_df = self.streamings_df['minPlayed'].copy()

        daily_streamings_df = daily_streamings_df.resample('D').agg(['sum'])
        idx = pd.date_range(daily_streamings_df.index.min(), daily_streamings_df.index.max(), freq='D')
        daily_streamings_df = daily_streamings_df.reindex(idx, fill_value=0)
    
        return daily_streamings_df.index.astype(str).tolist(), daily_streamings_df['sum'].tolist()

    def get_total_min_listened(self):
        return self.streamings_df['minPlayed'].sum()

    def get_unique_songs(self):
        unique_songs = self.streamings_df.drop_duplicates(subset=['artistName', 'trackName']).shape[0]
        return unique_songs

    def get_most_listened_artist(self):
        
        most_listened = self.streamings_df.groupby(by=['artistName']).sum()
        most_listened = most_listened.sort_values(by=['minPlayed'],ascending=False)[:1]
        return most_listened
        

    def __init__(self):
        self.create_streaming_df()