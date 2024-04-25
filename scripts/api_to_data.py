import os
import requests
import json

def write_call(ticker, apikey):
    response = requests.get(f"https://api.twelvedata.com/time_series?apikey={apikey}&interval=1day&format=JSON&symbol={ticker}&dp=2&start_date=2019-04-23 00:00:00&end_date=2024-04-22 00:00:00").json()
    filename = f"{ticker}.json"
    path = os.path.join("data/",filename)
    with open(path, 'w') as file:
        json.dump(response, file, indent=4)

    print(f"Response written to {filename}")
