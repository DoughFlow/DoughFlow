import csv
from django.core.management.base import BaseCommand
from django.db import transaction
from app.models import StockMarketData
from datetime import datetime
import pytz


class Command(BaseCommand):
    help = 'Imports stock market data from a CSV file into the database.'

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str, help='The CSV file to import.')
        parser.add_argument('ticker', type=str, help='The stock ticker symbol associated with the data.')

    def handle(self, *args, **options):
        csv_file_path = options['csv_file']
        ticker_symbol = options['ticker']
        self.stdout.write(self.style.SUCCESS(f'Importing data for {ticker_symbol} from "{csv_file_path}"'))
        eastern = pytz.timezone('America/New_York')
        with open(csv_file_path, newline='') as csvfile:
            reader = csv.DictReader(csvfile)
            previous_timestamp = None
            processed_rows = 0
            with transaction.atomic():  # Use a transaction to ensure data integrity
                for row in reader:
                    # Ensure the timestamp is properly formatted
                    timestamp_str = row['timestamp'] if ':' in row['timestamp'] else f"{row['timestamp']}:00"
                    naive_timestamp = datetime.strptime(timestamp_str, '%m/%d/%y %H:%M')
                    localized_timestamp = eastern.localize(naive_timestamp)

                    # Calculate seconds since last timestamp
                    if previous_timestamp is not None:
                        delta = (localized_timestamp - previous_timestamp).total_seconds()
                    else:
                        delta = None  # There is no previous timestamp for the first row

                    stock_market_data = StockMarketData(
                        timestamp=localized_timestamp,
                        ticker=ticker_symbol,  # Use the specified ticker for all rows
                        open_price=row['open'],
                        high_price=row['high'],
                        low_price=row['low'],
                        close_price=row['close'],
                        volume=row['volume'],
                        candle_time=delta  # Add the calculated seconds difference here
                    )
                    stock_market_data.save()
                    previous_timestamp = localized_timestamp    
                    processed_rows += 1
                    total_rows = 193830
                    percentage_complete = (processed_rows / total_rows) * 100
                    self.stdout.write(self.style.SUCCESS(f'Imported{processed_rows}/{total_rows} rows ({percentage_complete:.2f}%)'))
        self.stdout.write(self.style.SUCCESS(f'Successfully imported data for {ticker_symbol} into the database.'))
