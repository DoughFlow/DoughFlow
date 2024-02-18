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
            with transaction.atomic():  # Use a transaction to ensure data integrity
                for row in reader:
                    # Ensure the timestamp is properly formatted
                    timestamp_str = row['timestamp'] if ':' in row['timestamp'] else f"{row['timestamp']}:00"
                    naive_timestamp = datetime.strptime(timestamp_str, '%Y-%m-%d %H:%M:%S')
                    localized_timestamp = eastern.localize(naive_timestamp)
                    stock_market_data = StockMarketData(
                        timestamp=localized_timestamp,
                        ticker=ticker_symbol,  # Use the specified ticker for all rows
                        open=row['open'],
                        high=row['high'],
                        low=row['low'],
                        close=row['close'],
                        volume=row['volume'],
                    )
                    stock_market_data.save()
        self.stdout.write(self.style.SUCCESS(f'Successfully imported data for {ticker_symbol} into the database.'))
