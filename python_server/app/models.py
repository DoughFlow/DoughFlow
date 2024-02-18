from django.db import models


class StockMarketData(models.Model):
    timestamp = models.DateTimeField(db_index=True, primary_key=True)
    ticker = models.CharField(max_length=25)
    open = models.DecimalField(max_digits=10, decimal_places=2)
    high = models.DecimalField(max_digits=10, decimal_places=2)
    low = models.DecimalField(max_digits=10, decimal_places=2)
    close = models.DecimalField(max_digits=10, decimal_places=2)
    volume = models.IntegerField()

    class Meta:
        db_table = 'stock_data'
