"""
TODO
allow for user to enter a list of [keys], [ticker], [price|indicator]
this will then return a transformed data set with this form

list of keys in a text file
use a key until the response from the api has the code 429

for each ticker go through the list of price or ticker and fetch data for the
time range given

save the data to files

iterate through files in directory and generate a json table
"""
import os
import json
import pandas as pd


def process_directory(directory):
    data = []
    for filename in os.listdir(directory):
        if filename.endswith(".json"):
            with open(os.path.join(directory, filename), "r") as file:
                json_data = json.load(file)
                meta = json_data["meta"]
                values = json_data["values"]
                for entry in values:
                    entry.update(meta)
                    data.append(entry)
    return data


def merge_directories(directories):
    merged_data = []
    for directory in directories:
        merged_data.extend(process_directory(directory))
    return merged_data


def create_dataframe(merged_data):
    df = pd.DataFrame(merged_data)
    df["datetime"] = pd.to_datetime(df["datetime"])
    df = df[["datetime", "symbol", "open", "high", "low", "close", "volume", "rsi", "sma"]]
    return df


def main():
    directories = ["", "", ""]  # List of directories containing JSON files
    merged_data = merge_directories(directories)
    df = create_dataframe(merged_data)
    print(df)


if __name__ == "__main__":
    main()
