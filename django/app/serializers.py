from rest_framework import serializers
from app.models import StockMarketData


class StockMarketDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockMarketData
        fields = ['timestamp', 'ticker', 'open_price', 'high_price', 'low_price', 'close_price', 'volume', 'candle_time']


