from rest_framework import serializers
from app.models import StockMarketData, StockIndicatorData


class StockMarketDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockMarketData
        fields = ['timestamp', 'ticker', 'open_price', 'high_price', 'low_price', 'close_price', 'volume']

class StockIndicatorDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockIndicatorData
        fields = ['timestamp', 'open_price', 'high_price', 'low_price', 'close_price']

class RSIIndicatorDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockIndicatorData
        fields = ['timestamp', 'rsi']

class SMAIndicatorDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockIndicatorData
        fields = ['timestamp', 'sma']

class VOLIndicatorDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockIndicatorData
        fields = ['timestamp', 'volume']
