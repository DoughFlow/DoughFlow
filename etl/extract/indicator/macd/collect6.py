import requests
import json
import time

#HARDCODE this each file
API_key = "254ee3ec01ab49ab8574d3484a7a07e3"
LIST_file = "list_six.txt"

def request_data(indicator, API_key):
    res = requests.get(f"https://api.twelvedata.com/macd?apikey={API_key}&interval=1day&symbol={indicator}&end_date=2024-05-06 00:00:00&start_date=2019-05-06 00:00:00&format=JSON")
    return res.json()

def save_data(indicator, json_response):
    filename = f"data/{indicator}.json"
    with open(filename, "w") as file:
        json.dump(json_response, file, indent=4)

def main():
    indicator_list = []
    with open(LIST_file, "r") as file:
        for line in file:
            indicator_list.append(line.strip())
    for ticker in indicator_list:
        res = request_data(ticker, API_key)
        save_data(ticker, res)
        print(f"Wrote to {ticker}.json, sleeping seven seconds")
        time.sleep(8)

if __name__ == "__main__":
    main()
