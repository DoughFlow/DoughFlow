import os
import requests
import json


class CollectData:
    def __init__(self, apikey, ticker):
        self.apikey = apikey
        self.ticker = ticker
        self.base_url = "https://api.twelvedata.com/"
        self.data = {}

    def fetch_all_data(self):
        self.data['time_series'] = self._fetch_data("time_series")
        self.data['sma'] = self._fetch_data("sma", period=20)
        self.data['ema'] = self._fetch_data("ema", period=20)
        self.data['macd'] = self._fetch_data("macd")
        self.data['rsi'] = self._fetch_data("rsi", period=14)

    def _fetch_data(self, indicator_type, period=None):
        url = f"{self.base_url}{indicator_type}?apikey={self.apikey}&interval=1day&symbol={self.ticker}&start_date=2024-04-13&end_date=2024-04-22"
        if period:
            url += f"&time_period={period}"
        response = requests.get(url).json()
        return response

    def save_data(self):
        for key, value in self.data.items():
            filename = f"{self.ticker}_{key}.json"
            path = os.path.join("/home/ethanrohman/data", filename)
            with open(path, 'w') as file:
                json.dump(value, file, indent=4)
            print(f"Response for {key} written to {filename}")


def main():
    api_key = 'cd384b0e986a484abc427d73cfdc7c90'
    ticker = 'AAPL'
    data_collector = CollectData(api_key, ticker)
    data_collector.fetch_all_data()
    data_collector.save_data()


if __name__ == "__main__":
    main()
