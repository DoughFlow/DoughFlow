import json
from django.core.management.base import BaseCommand
from app.models import StockMarketData
import pytz


class Command(BaseCommand):
    """
    Takes in a file created by the acquireHistoricalData function in yf_pull.py
    """
    help = 'Import stock market data from a JSON file'

    def add_arguments(self, parser):
        parser.add_argument('file_path', type=str, help='Path to the JSON file')

    def handle(self, *args, **options):
        file_path = options['file_path']
        # eastern = pytz.timezone('America/New_York')
        try:
            with open(file_path, 'r') as f:
                data = json.load(f)
                ticker_symbol = data['meta']['symbol']
                self.stdout.write(self.style.SUCCESS(f'Importing data for {ticker_symbol} from "{file_path}"'))
                for row in data['values']:
                    stock_market_data = StockMarketData(
                        timestamp=row['datetime'],
                        ticker=ticker_symbol,  # Use the specified ticker for all rows
                        open=row['open'],
                        high=row['high'],
                        low=row['low'],
                        close=row['close'],
                        volume=row['volume'],
                    )
                    stock_market_data.save()
                self.stdout.write(self.style.SUCCESS(f'Successfully imported data for {ticker_symbol} into the database.'))
        except FileNotFoundError:
                print("File not found at the specified path.")


# class Command(BaseCommand):
#     """
#     Takes in json data like this:
#                {"ticker":{"meta":{},"values":[]}}
#     """
#     help = 'Import stock market data from a JSON file'

#     def add_arguments(self, parser):
#         parser.add_argument('file_path', type=str, help='Path to the JSON file')

#     def handle(self, *args, **options):
#         file_path = options['file_path']
#         # eastern = pytz.timezone('America/New_York')
#         try:
#             with open(file_path, 'r') as f:
#                 data = json.load(f)
#                 for ticker_symbol in data.keys(): # each key should be a ticker symbol
                    
#                     for row in data[ticker_symbol]["values"]:
#                         self.stdout.write(self.style.SUCCESS(f'Importing data for {ticker_symbol} from "{file_path}"'))
                        
#                         stock_market_data = StockMarketData(
#                             timestamp=row["datetime"],
#                             ticker=ticker_symbol,  # Use the specified ticker for all rows
#                             open=row['open'],
#                             high=row['high'],
#                             low=row['low'],
#                             close=row['close'],
#                             volume=row['volume'],
#                         )
#                         stock_market_data.save()
#                     self.stdout.write(self.style.SUCCESS(f'Successfully imported data for {ticker_symbol} into the database.'))
#                     print("finished with "+ticker_symbol+"into db.")
#         except FileNotFoundError:
#                 print("File not found at the specified path.")