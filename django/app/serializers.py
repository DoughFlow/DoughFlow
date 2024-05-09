from rest_framework import serializers
from app.models import StockMarketData, StockIndicatorData


class StockMarketDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockMarketData
        fields = ['timestamp', 'ticker', 'open_price', 'high_price', 'low_price', 'close_price', 'volume']

class StockIndicatorDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockIndicatorData
        fields = ['timestamp', 'ticker', 'open_pirce', 'high_price', 'low_price', 'close_price', 'rsi', 'sma', 'volume']
