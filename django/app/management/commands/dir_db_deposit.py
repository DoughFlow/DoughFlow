import os
import csv
from django.core.management.base import BaseCommand
import boto3
from botocore.exceptions import NoCredentialsError

from app.models import StockMarketData# Adjust import path to your app's structure


class Command(BaseCommand):
    help = 'Load stock data from CSV files in a local directory or an S3 bucket'

    def add_arguments(self, parser):
        parser.add_argument('--directory', type=str, help='Local directory containing CSV files')
        parser.add_argument('--s3-bucket', type=str, help='S3 bucket name')
        parser.add_argument('--s3-prefix', type=str, default='', help='Prefix (path within bucket) where CSV files are located')

    def handle(self, *args, **options):
        if options['directory']:
            self.load_from_directory(options['directory'])
        elif options['s3_bucket']:
            self.load_from_s3(options['s3_bucket'], options['s3_prefix'])
        else:
            self.stdout.write(self.style.ERROR('Please specify either a local directory or an S3 bucket'))

    def load_from_directory(self, directory_path):
        for file_name in os.listdir(directory_path):
            if file_name.endswith('.csv'):
                file_path = os.path.join(directory_path, file_name)
                self.process_csv(file_path)

    def load_from_s3(self, bucket_name, prefix):
        s3 = boto3.client('s3')
        try:
            for obj in s3.list_objects_v2(Bucket=bucket_name, Prefix=prefix)['Contents']:
                response = s3.get_object(Bucket=bucket_name, Key=obj['Key'])
                lines = response['Body'].read().decode('utf-8').splitlines()
                self.process_csv(lines, is_s3=True)
        except NoCredentialsError:
            self.stdout.write(self.style.ERROR('AWS credentials not found'))

    def process_csv(self, csv_input, is_s3=False):
        reader = csv.DictReader(csv_input if is_s3 else open(csv_input, 'r'))
        for row in reader:
            stock_data = StockData(**row)
            stock_data.save()

    # Additional methods as needed...

