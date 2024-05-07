import json
import argparse


def read_json_file(file_path):
    """Reads a JSON file and returns the data."""
    with open(file_path, 'r') as file:
        data = json.load(file)
    return data


def extract_dates(data):
    """Extracts the dates from the data."""
    return [entry['datetime'] for entry in data['values']]


def save_dates(dates, output_file):
    """Saves the dates into a new JSON file."""
    with open(output_file, 'w') as file:
        json.dump({"market_dates": dates}, file, indent=4)


def main():
    parser = argparse.ArgumentParser(description="Extract dates from a market data JSON file.")
    parser.add_argument('input_file', type=str, help='The JSON file containing market data.')
    parser.add_argument('output_file', type=str, help='The JSON file to save the dates.')
    args = parser.parse_args()
    data = read_json_file(args.input_file)
    dates = extract_dates(data)
    save_dates(dates, args.output_file)


if __name__ == "__main__":
    main()
