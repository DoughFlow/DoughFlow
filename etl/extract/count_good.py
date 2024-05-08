import json
import sys

def find_tickers_with_few_dates(file_path):
    # Read data from the file
    with open(file_path, 'r') as file:
        data = json.load(file)
    tickers_with_few_dates = [ticker for entry in data for ticker, price_info in entry.items() if len(price_info[0]['macd']) < 4]
    return tickers_with_few_dates

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python process_data.py <file_path>")
        sys.exit(1)

    file_path = sys.argv[1]
    result = find_tickers_with_few_dates(file_path)
    print(len(result))

