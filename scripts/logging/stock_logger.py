import json
import argparse
from collections import defaultdict


class StockDataProcessor:
    def __init__(self, stock_file, market_dates_file):
        self.stock_file = stock_file
        self.market_dates_file = market_dates_file
        self.missing_dates = defaultdict(dict)

    def load_json_data(self, filename):
        with open(filename, 'r') as file:
            return json.load(file)

    def process_data(self):
        stock_data = self.load_json_data(self.stock_file)
        market_dates = self.load_json_data(self.market_dates_file)['market_dates']
        stock_symbol = stock_data['meta']['symbol']
        stock_dates = {entry['datetime'] for entry in stock_data['values']}
        market_date_set = set(market_dates)
        missing_dates = market_date_set.difference(stock_dates)
        if 'indicator' in stock_data['meta']:
            indicator_name = stock_data['meta']['indicator']['name'].split(' - ')[0].lower()
            self.missing_dates[stock_symbol][indicator_name] = list(missing_dates)
        else:
            self.missing_dates[stock_symbol]['price'] = list(missing_dates)

    def save_results(self, output_file):
        with open(output_file, 'w') as file:
            json.dump(self.missing_dates, file, indent=4)

    def run(self, output_file='output.json'):
        self.process_data()
        self.save_results(output_file)


def main():
    parser = argparse.ArgumentParser(description='Process stock and market date files.')
    parser.add_argument('stock_file', type=str, help='The JSON file containing the stock data')
    parser.add_argument('market_dates_file', type=str, help='The JSON file containing the market dates')
    parser.add_argument('--output', type=str, default='output.json', help='Output file to save the results')
    args = parser.parse_args()
    processor = StockDataProcessor(args.stock_file, args.market_dates_file)
    processor.run(args.output)


if __name__ == "__main__":
    main()
