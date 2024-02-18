from django.core.management.base import BaseCommand
from django.db import connection


class Command(BaseCommand):
    help = 'Converts stock_data table to a TimescaleDB hypertable'

    def handle(self, *args, **options):
        with connection.cursor() as cursor:
            cursor.execute("SELECT create_hypertable('stock_data', by_range('timestamp'));")
            self.stdout.write(self.style.SUCCESS('Successfully created hypertable.'))

