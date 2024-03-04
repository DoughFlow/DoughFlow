from django.db import models
from django.db.models import Max, Min, F
from datetime import timedelta
import datetime


class StockMarketData(models.Model):
    timestamp = models.DateTimeField(db_index=True, primary_key=True)
    ticker = models.CharField(max_length=25)
    open_price = models.DecimalField(max_digits=10, decimal_places=2)
    high_price = models.DecimalField(max_digits=10, decimal_places=2)
    low_price = models.DecimalField(max_digits=10, decimal_places=2)
    close_price = models.DecimalField(max_digits=10, decimal_places=2)
    volume = models.IntegerField()
    candle_time = models.IntegerField(null=True, blank=True)

    class Meta:
        db_table = 'stock_data'

    @staticmethod
    def get_aggregated_data(ticker, candle_time=1440):
        now = datetime.datetime.now()
        one_month_ago = now - timedelta(days=30)

        # Get the latest timestamp in the database to ensure we are working with the latest data
        latest_timestamp = StockMarketData.objects.filter(ticker=ticker).aggregate(Max('timestamp'))['timestamp__max']
        if latest_timestamp:
            one_month_ago = latest_timestamp - timedelta(days=30)

        # Aggregate query to get the first open, last close, max high, min low, and sum volume
        aggregation = StockMarketData.objects.filter(
            ticker=ticker,
            timestamp__gte=one_month_ago,
            candle_time=candle_time
        ).annotate(
            date=F('timestamp__date')
        ).values(
            'date'
        ).annotate(
            open_price=Min('timestamp'),
            close_price=Max('timestamp'),
            max_high=Max('high_price'),
            min_low=Min('low_price'),
            total_volume=Sum('volume')
        ).order_by('date')

        # Adjust the query to get the first open and last close
        for day_data in aggregation:
            day_data['open_price'] = StockMarketData.objects.filter(timestamp=day_data['open_price']).first().open_price
            day_data['close_price'] = StockMarketData.objects.filter(timestamp=day_data['close_price']).last().close_price

        return aggregation
