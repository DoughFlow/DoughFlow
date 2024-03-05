from django.db import models


class StockMarketData(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True, db_index=True, primary_key=True)
    ticker = models.CharField(max_length=25)
    open_price = models.DecimalField(max_digits=10, decimal_places=2)
    high_price = models.DecimalField(max_digits=10, decimal_places=2)
    low_price = models.DecimalField(max_digits=10, decimal_places=2)
    close_price = models.DecimalField(max_digits=10, decimal_places=2)
    volume = models.IntegerField()
    candle_time = models.IntegerField(null=True, blank=True)

    class Meta:
        db_table = 'stock_data'
