import os
import requests
import json


class CollectData:
    def __init__(self, apikey, ticker, start_date, end_date):
        self.apikey = apikey
        self.ticker = ticker
        self.start_date = start_date
        self.end_date = end_date
        self.base_url = "https://api.twelvedata.com/"
        self.data = {}

    def fetch_all_data(self):
        self.data['time_series'] = self._fetch_data("time_series")
        self.data['sma'] = self._fetch_data("sma", period=20)
        self.data['ema'] = self._fetch_data("ema", period=20)
        self.data['macd'] = self._fetch_data("macd")
        self.data['rsi'] = self._fetch_data("rsi", period=14)

    def _fetch_data(self, indicator_type, period=None):
        url = f"{self.base_url}{indicator_type}?apikey={self.apikey}&interval=1day&symbol={self.ticker}&start_date={self.start_date}&end_date={self.end_date}"
        if period:
            url += f"&time_period={period}"
        response = requests.get(url)
        return response.json() if response.status_code == 200 else {}

    def save_data(self):
        for key, value in self.data.items():
            filename = f"{self.ticker}_{key}_data_from_{self.start_date}_to_{self.end_date}.json"
            path = os.path.join("/home/ethanrohman/data", filename)
            with open(path, 'w') as file:
                json.dump(value, file, indent=4)
            print(f"Response for {key} written to {filename}")


def main():
    api_key = '69053267742a40b88875c653f2dbf767'  # Replace with your Twelve Data API key
    ticker = 'BOX'
    start_date = '2019-05-06'
    end_date = '2024-05-06'
    data_collector = CollectData(api_key, ticker, start_date, end_date)
    data_collector.fetch_all_data()
    data_collector.save_data()


if __name__ == "__main__":
    main()
