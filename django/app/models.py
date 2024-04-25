from django.db import models
import uuid


class StockMarketData(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    timestamp = models.DateTimeField()
    ticker = models.CharField(max_length=25)
    open_price = models.DecimalField(max_digits=10, decimal_places=2)
    high_price = models.DecimalField(max_digits=10, decimal_places=2)
    low_price = models.DecimalField(max_digits=10, decimal_places=2)
    close_price = models.DecimalField(max_digits=10, decimal_places=2)
    volume = models.IntegerField()
    candle_time = models.IntegerField(null=True, blank=True)

    class Meta:
        db_table = 'stock_data'
        unique_together = (('timestamp', 'ticker'),)
