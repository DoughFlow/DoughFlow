import json
import sys
from django.core.management.base import BaseCommand
from django.db import transaction
from app.models import StockIndicatorData
from dateutil import parser
import os


class Command(BaseCommand):
    help = 'Imports stock market data from a JSON file into the database.'

    def add_arguments(self, parser):
        parser.add_argument('json_file', type=str, help='The JSON file to import.')

    def handle(self, *args, **options):
        json_file_path = options['json_file']
        self.stdout.write(self.style.SUCCESS(f'Importing data from "{json_file_path}"'))
        # Grab ticker-name
        json_basename = os.path.basename(json_file_path)
        ticker_name = os.path.splitext(json_basename)[0]
        print(ticker_name)
        # Load data to python dict
        with open(json_file_path, 'r') as file:
            data = json.load(file)

        # Check for preloaded data
        if StockIndicatorData.objects.filter(ticker=ticker_name).exists():
            print('$$$TICKER EXISTS ALREADY$$$')
            sys.exit()
        
        total_rows =  len(data)
        processed_rows = 0
        #Use a transaction to ensure data integrity
        with transaction.atomic():
            for stock in data:
                stock_indicator_data = StockIndicatorData(
                        timestamp=stock['datetime'],
                        ticker=ticker_name,
                        open_price=stock['open'],
                        high_price=stock['high'],
                        low_price=stock['low'],
                        close_price=stock['close'],
                        volume=stock['volume'],
                        sma=stock['sma'],
                        rsi=stock['rsi']
                        )
                stock_indicator_data.save()
                processed_rows += 1
                percentage_complete = (processed_rows / total_rows) * 100
                if processed_rows % 200 == 0:
                    self.stdout.write(self.style.SUCCESS(f'Imported {processed_rows}/{total_rows} rows ({percentage_complete:.2f}%)'))
        self.stdout.write(self.style.SUCCESS('Successfully imported data into the database.'))


''' OLD CODE
    def handle(self, *args, **options):
        json_file_path = options['json_file']
        self.stdout.write(self.style.SUCCESS(f'Importing data from "{json_file_path}"'))
        with open(json_file_path, 'r') as json_file:
            data = json.load(json_file)
        total_rows = sum([len(data[ticker]) for ticker in data])
        processed_rows = 0
        with transaction.atomic():  # Use a transaction to ensure data integrity
            for ticker_symbol, entries in data.items():
                for entry in entries:
                    localized_timestamp = parser.parse(entry['timestamp'])
                    stock_market_data = StockMarketData(
                        timestamp=localized_timestamp,
                        ticker=ticker_symbol,
                        open_price=entry['open_price'],
                        high_price=entry['high_price'],
                        low_price=entry['low_price'],
                        close_price=entry['close_price'],
                        volume=entry['volume'],
                        candle_time=entry['candle_time']
                    )
                    stock_market_data.save()
                    processed_rows += 1
                    percentage_complete = (processed_rows / total_rows) * 100
                    self.stdout.write(self.style.SUCCESS(f'Imported {processed_rows}/{total_rows} rows ({percentage_complete:.2f}%)'))
        self.stdout.write(self.style.SUCCESS('Successfully imported data into the database.'))'''
