import json
import argparse
import os
from collections import defaultdict

class StockDataProcessor:
    def __init__(self, directory, market_dates_file):
        self.directory = directory
        self.market_dates_file = market_dates_file
        self.missing_dates = defaultdict(lambda: defaultdict(list))

    def load_json_data(self, filename):
        with open(filename, 'r') as file:
            return json.load(file)

    def process_data(self):
        market_dates = self.load_json_data(self.market_dates_file)['market_dates']
        market_date_set = set(market_dates)
        
        for filename in os.listdir(self.directory):
            if filename.endswith('.json'):  # Filter to process only JSON files
                stock_data = self.load_json_data(os.path.join(self.directory, filename))
                stock_symbol = stock_data['meta']['symbol']
                stock_dates = {entry['datetime'] for entry in stock_data['values']}
                missing_dates = market_date_set.difference(stock_dates)
                
                if 'indicator' in stock_data['meta']:
                    indicator_name = stock_data['meta']['indicator']['name'].split(' - ')[0].lower()
                    self.missing_dates[stock_symbol][indicator_name].extend(missing_dates)
                else:
                    self.missing_dates[stock_symbol]['price'].extend(missing_dates)

    def save_results(self, output_file):
        output_data = []
        for symbol, indicators in self.missing_dates.items():
            symbol_data = {symbol: []}
            for indicator, dates in indicators.items():
                symbol_data[symbol].append({indicator: sorted(dates)})
            output_data.append(symbol_data)
        
        with open(output_file, 'w') as file:
            json.dump(output_data, file, indent=4)

    def run(self, output_file='output.json'):
        self.process_data()
        self.save_results(output_file)

def main():
    parser = argparse.ArgumentParser(description='Process stock data files from a directory.')
    parser.add_argument('directory', type=str, help='The directory containing the stock data files')
    parser.add_argument('market_dates_file', type=str, help='The JSON file containing the market dates')
    parser.add_argument('--output', type=str, default='output.json', help='Output file to save the results')
    args = parser.parse_args()
    processor = StockDataProcessor(args.directory, args.market_dates_file)
    processor.run(args.output)

if __name__ == "__main__":
    main()

