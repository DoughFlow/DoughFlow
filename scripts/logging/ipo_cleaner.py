import json
from datetime import datetime

class StockDataCleaner:
    def __init__(self, ipo_filepath, missing_data_filepath):
        self.ipo_filepath = ipo_filepath
        self.missing_data_filepath = missing_data_filepath
        self.ipo_dates = {}
        self.missing_data = []

    def load_ipo_data(self):
        with open(self.ipo_filepath, 'r') as file:
            ipo_data = json.load(file)
        for entry in ipo_data:
            symbol = entry['symbol']
            ipo_date = datetime.strptime(entry['date'], '%Y-%m-%d')
            self.ipo_dates[symbol] = ipo_date

    def load_missing_data(self):
        with open(self.missing_data_filepath, 'r') as file:
            self.missing_data = json.load(file)

    def clean_missing_data(self):
        for stock in self.missing_data:
            symbol = list(stock.keys())[0]
            if symbol in self.ipo_dates:
                ipo_date = self.ipo_dates[symbol]
                for indicator in stock[symbol]:
                    cleaned_dates = []
                    for date_str in indicator[next(iter(indicator))]:
                        date = datetime.strptime(date_str, '%Y-%m-%d')
                        if date >= ipo_date:
                            cleaned_dates.append(date_str)
                    indicator[next(iter(indicator))] = cleaned_dates
            else:
                print(f"No IPO date found for {symbol}, skipping...")

    def save_cleaned_data(self, output_filepath):
        with open(output_filepath, 'w') as file:
            json.dump(self.missing_data, file, indent=4)

    def process_data(self):
        self.load_ipo_data()
        self.load_missing_data()
        self.clean_missing_data()
        self.save_cleaned_data('cleaned_missing_data.json')
        print("Missing data cleaned and saved to 'cleaned_missing_data.json'.")

# Usage
if __name__ == "__main__":
    cleaner = StockDataCleaner('ipo.json', 'missing_data.json')
    cleaner.process_data()

