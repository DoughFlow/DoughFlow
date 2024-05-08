import os
import json
import pandas as pd
from glob import glob

def load_and_merge_data(stock_symbol, dirs):
    data_frames = []
    for directory in dirs:
        file_path = os.path.join(directory, f"{stock_symbol}.json")
        try:
            if os.path.exists(file_path):
                with open(file_path, 'r') as file:
                    data = json.load(file)
                    # Handle missing 'values' key gracefully
                    if 'values' in data:
                        df = pd.DataFrame(data['values'])
                        df['datetime'] = pd.to_datetime(df['datetime'])
                        data_frames.append(df)
                    else:
                        print(f"'values' key missing in file {file_path}")
            else:
                print(f"File not found: {file_path}")
        except Exception as e:
            print(f"Error processing file {file_path}: {e}")
            continue

    if data_frames:
        # Merge all data frames on 'datetime'
        merged_df = data_frames[0]
        for df in data_frames[1:]:
            merged_df = pd.merge(merged_df, df, on='datetime', how='outer')
        return merged_df
    else:
        return pd.DataFrame()

def save_merged_data(merged_df, output_dir, stock_symbol):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    output_path = os.path.join(output_dir, f"{stock_symbol}.json")
    merged_df.to_json(output_path, orient='records', date_format='iso')
    print(f"Data saved to {output_path}")

def main():
    # Directories containing the data
    base_dir = "/home/ethanrohman/all_data"
    dirs = [
        os.path.join(base_dir, "data"),
        os.path.join(base_dir, "rsi_data", "data"),
        os.path.join(base_dir, "sma_data", "data")
    ]
    output_dir = os.path.join(base_dir, "joined_data")

    # Get all unique stock symbols from the first directory (assuming all directories have the same symbols)
    stock_files = glob(os.path.join(dirs[0], "*.json"))
    stock_symbols = [os.path.basename(f).replace('.json', '') for f in stock_files]

    for symbol in stock_symbols:
        merged_data = load_and_merge_data(symbol, dirs)
        if not merged_data.empty:
            save_merged_data(merged_data, output_dir, symbol)

if __name__ == "__main__":
    main()

