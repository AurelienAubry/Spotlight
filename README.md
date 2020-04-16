Spotlight is a Spotify dashboard that allows user to visualize her favorite artist and listening habits. The following metrics are available, over the last 3/6/12 months:

* Total number of tracks listened.
* Total minutes listend.
* Average daily minutes listend.
* Graph of the daily tracks / minutes listened.
* List of favorites artists (most listened).
* Listening clock, displaying at which hour of the day the user listens music the most.


The backend API of this application is built using [Python](https://www.python.org/) and served by a [Flask](https://flask.palletsprojects.com/en/1.1.x/) web server. This server uses *json* streamings files that the user can download on his Spotify's profile. This list of streaming is then converted in a dataframe, processed with [Pandas](https://pandas.pydata.org/).

The frontend part is made with [React](https://en.reactjs.org/) and [Bootstrap](https://getbootstrap.com/). The graphs are made with [Chart.js](https://www.chartjs.org/) library.

The building process of this project is detailled in the following set of articles:

* Spotify Dataviz Part1: Process streamings files
* Spotify Dataviz Part2: Create your private API
* Spotify Dataviz Part3: Build the frontend

This project is available on [Github](https://github.com/AurelienAubry/Spotlight).

Here some helpfull links, used to build this project:

<https://towardsdatascience.com/spotify-rewrapped-e2a7cc94fb4e>
<https://towardsdatascience.com/get-your-spotify-streaming-history-with-python-d5a208bbcbd3>
<https://dribbble.com/shots/6539697-Dashboard-Spotify-Statistics>