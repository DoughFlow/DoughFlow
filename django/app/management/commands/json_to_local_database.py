import json
from datetime import datetime, timedelta
import pytz
from django.core.management.base import BaseCommand, CommandError
from django.db import transaction
from app.models import StockMarketData  # Adjust 'app.models' to your actual app name


class Command(BaseCommand):
    help = 'Imports stock market data from a JSON file into the database.'

    def add_arguments(self, parser):
        parser.add_argument('json_file', type=str, help='The JSON file to import.')

    def handle(self, *args, **options):
        json_file_path = options['json_file']
        self.stdout.write(self.style.SUCCESS(f'Importing data from "{json_file_path}"'))

        try:
            with open(json_file_path, 'r') as jsonfile:
                data = json.load(jsonfile)
        except FileNotFoundError:
            raise CommandError(f'File "{json_file_path}" does not exist.')
        except json.JSONDecodeError:
            raise CommandError(f'File "{json_file_path}" is not a valid JSON file.')

        ticker_symbol = data['meta']['symbol']
        values = data['values']
        eastern = pytz.timezone('America/New_York')

        previous_timestamp = None
        with transaction.atomic():
            for row in values:
                datetime_format = '%Y-%m-%d %H:%M:%S' if ' ' in row['datetime'] else '%Y-%m-%d'
                naive_timestamp = datetime.strptime(row['datetime'], datetime_format)
                if datetime_format == '%Y-%m-%d':
                    # For dates without a time component, use the date with a fixed time (e.g., midnight)
                    localized_timestamp = eastern.localize(datetime.combine(naive_timestamp, datetime.min.time()))
                    candle_time = timedelta(hours=6, minutes=30).total_seconds()  # Approximate market open duration
                else:
                    localized_timestamp = eastern.localize(naive_timestamp)
                    if previous_timestamp:
                        # Calculate the difference in seconds from the previous timestamp
                        candle_time = (localized_timestamp - previous_timestamp).total_seconds()
                    else:
                        candle_time = None
                stock_market_data = StockMarketData(
                    ticker=ticker_symbol,
                    open_price=row['open'],
                    high_price=row['high'],
                    low_price=row['low'],
                    close_price=row['close'],
                    volume=row['volume'],
                    candle_time=candle_time
                )
                stock_market_data.save()
                previous_timestamp = localized_timestamp
        self.stdout.write(self.style.SUCCESS(f'Successfully imported data for {ticker_symbol} into the database.'))
