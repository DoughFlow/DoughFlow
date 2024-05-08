import os
import json
import pandas as pd
from glob import glob

def clean_data(file_path, output_dir):
    try:
        # Load the data from the JSON file
        df = pd.read_json(file_path, orient='records')
        
        # Drop rows that contain any null values
        cleaned_df = df.dropna()
        
        # Construct the path for the output file
        output_file_path = os.path.join(output_dir, os.path.basename(file_path))
        
        # Save the cleaned data to the new directory
        cleaned_df.to_json(output_file_path, orient='records', date_format='iso')
        print(f"Cleaned data saved to {output_file_path}")
    except Exception as e:
        print(f"Error processing file {file_path}: {e}")

def main():
    # Directory containing the data to clean
    data_dir = "/home/ethanrohman/all_data/joined_data"
    output_dir = "/home/ethanrohman/all_data/cleaned_data"
    
    # Ensure the output directory exists
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    
    # Get all JSON files in the directory
    json_files = glob(os.path.join(data_dir, "*.json"))
    
    # Process each file
    for file_path in json_files:
        clean_data(file_path, output_dir)

if __name__ == "__main__":
    main()
