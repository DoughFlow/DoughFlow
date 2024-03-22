import os
import csv
from django.core.management.base import BaseCommand

from app.models import StockMarketData  # Adjust the import path to match your app and model


class Command(BaseCommand):
    help = 'Load stock data from CSV files in a specified local directory'

    def add_arguments(self, parser):
        parser.add_argument('directory', type=str, help='The path to the directory containing CSV files')

    def handle(self, *args, **options):
        directory_path = options['directory']
        for file_name in os.listdir(directory_path):
            if file_name.endswith('.csv'):
                self.stdout.write(f"Processing {file_name}...")
                file_path = os.path.join(directory_path, file_name)
                self.load_data_from_csv(file_path)

    def load_data_from_csv(self, file_path):
        with open(file_path, mode='r') as csv_file:
            reader = csv.DictReader(csv_file)
            for row in reader:
                # Transform the row into the correct format, if necessary
                # For example, you might need to convert strings to numbers
                # or parse dates.
                # Create an instance of the StockMarketData model
                stock_data = StockMarketData(
                    ticker=row['ticker'],
                    open_price=row['open_price'],
                    high_price=row['high_price'],
                    low_price=row['low_price'],
                    close_price=row['close_price'],
                    volume=row['volume'],
                    candle_time=row.get('candle_time'),  # Assuming candle_time is optional
                )
                # Save the instance to the database
                stock_data.save()

                self.stdout.write(f"Saved data for {row['ticker']} on {row.get('timestamp')}")

