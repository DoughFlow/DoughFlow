from rest_framework.views import APIView
from rest_framework.response import Response
from .models import StockMarketData, StockIndicatorData
from .serializers import StockMarketDataSerializer, StockIndicatorDataSerializer, RSIIndicatorDataSerializer, VOLIndicatorDataSerializer, SMAIndicatorDataSerializer
from django.utils.dateparse import parse_datetime
from django.utils.timezone import now
from django.http import JsonResponse
from datetime import timedelta
import datetime

def helper_function(time):
    if time == '1m':
        return datetime.date(2024, 4, 1), datetime.date(2024, 5, 1)
    if time == '3m':
        return datetime.date(2024, 2, 1), datetime.date(2024, 5, 1)
    if time == '6m':
        return datetime.date(2023, 11, 1), datetime.date(2024, 5, 1)
    if time == '1y':
        return datetime.date(2023, 5, 1), datetime.date(2024, 5, 1)
    if time == '2y':
        return datetime.date(2022, 5, 1), datetime.date(2024, 5, 1)

class Price1m(APIView):
    def get(self, request, ticker):
        start, end = helper_function('1m')
        price_data = StockIndicatorData.objects.filter(
            ticker=ticker.upper(),
            timestamp__range=(start,end)).order_by('timestamp').values('timestamp', 'open_price', 'high_price', 'low_price', 'close_price')
        serializer = StockIndicatorDataSerializer(price_data, many=True)
        return Response(serializer.data)

class Price3m(APIView):
    def get(self, request, ticker):
        start, end = helper_function('3m')
        price_data = StockIndicatorData.objects.filter(
            ticker=ticker.upper(),
            timestamp__range=(start,end)).order_by('timestamp').values('timestamp', 'open_price', 'high_price', 'low_price', 'close_price')
        serializer = StockIndicatorDataSerializer(price_data, many=True)
        return Response(serializer.data)

class Price6m(APIView):
    def get(self, request, ticker):
        start, end = helper_function('6m')
        price_data = StockIndicatorData.objects.filter(
            ticker=ticker.upper(),
            timestamp__range=(start,end)).order_by('timestamp').values('timestamp', 'open_price', 'high_price', 'low_price', 'close_price')
        serializer = StockIndicatorDataSerializer(price_data, many=True)
        return Response(serializer.data)


class Price1y(APIView):
    def get(self, request, ticker):
        start, end = helper_function('1y')
        price_data = StockIndicatorData.objects.filter(
            ticker=ticker.upper(),
            timestamp__range=(start,end)).order_by('timestamp').values('timestamp', 'open_price', 'high_price', 'low_price', 'close_price')
        serializer = StockIndicatorDataSerializer(price_data, many=True)
        return Response(serializer.data)


class Price2y(APIView):
    def get(self, request, ticker):
        start, end = helper_function('2y')
        price_data = StockIndicatorData.objects.filter(
            ticker=ticker.upper(),
            timestamp__range=(start,end)).order_by('timestamp').values('timestamp', 'open_price', 'high_price', 'low_price', 'close_price')
        serializer = StockIndicatorDataSerializer(price_data, many=True)
        return Response(serializer.data)

class SMA1m(APIView):
    def get(self, request, ticker):
        start, end = helper_function('1m')
        price_data = StockIndicatorData.objects.filter(
            ticker=ticker.upper(),
            timestamp__range=(start,end)).order_by('timestamp').values('timestamp', 'sma')
        serializer = SMAIndicatorDataSerializer(price_data, many=True)
        return Response(serializer.data)

class SMA3m(APIView):
    def get(self, request, ticker):
        start, end = helper_function('3m')
        price_data = StockIndicatorData.objects.filter(
            ticker=ticker.upper(),
            timestamp__range=(start,end)).order_by('timestamp').values('timestamp', 'sma')
        serializer = SMAIndicatorDataSerializer(price_data, many=True)
        return Response(serializer.data)

class SMA6m(APIView):
    def get(self, request, ticker):
        start, end = helper_function('6m')
        price_data = StockIndicatorData.objects.filter(
            ticker=ticker.upper(),
            timestamp__range=(start,end)).order_by('timestamp').values('timestamp', 'sma')
        serializer = SMAIndicatorDataSerializer(price_data, many=True)
        return Response(serializer.data)

class SMA1y(APIView):
    def get(self, request, ticker):
        start, end = helper_function('1y')
        price_data = StockIndicatorData.objects.filter(
            ticker=ticker.upper(),
            timestamp__range=(start,end)).order_by('timestamp').values('timestamp', 'sma')
        serializer = SMAIndicatorDataSerializer(price_data, many=True)
        return Response(serializer.data)

class SMA2y(APIView):
    def get(self, request, ticker):
        start, end = helper_function('2y')
        price_data = StockIndicatorData.objects.filter(
            ticker=ticker.upper(),
            timestamp__range=(start,end)).order_by('timestamp').values('timestamp', 'sma')
        serializer = SMAIndicatorDataSerializer(price_data, many=True)
        return Response(serializer.data)

class RSI1m(APIView):
    def get(self, request, ticker):
        start, end = helper_function('1m')
        price_data = StockIndicatorData.objects.filter(
            ticker=ticker.upper(),
            timestamp__range=(start,end)).order_by('timestamp').values('timestamp', 'rsi')
        serializer = RSIIndicatorDataSerializer(price_data, many=True)
        return Response(serializer.data)


class RSI3m(APIView):
    def get(self, request, ticker):
        start, end = helper_function('3m')
        price_data = StockIndicatorData.objects.filter(
            ticker=ticker.upper(),
            timestamp__range=(start,end)).order_by('timestamp').values('timestamp', 'rsi')
        serializer = RSIIndicatorDataSerializer(price_data, many=True)
        return Response(serializer.data)

class RSI6m(APIView):
    def get(self, request, ticker):
        start, end = helper_function('6m')
        price_data = StockIndicatorData.objects.filter(
            ticker=ticker.upper(),
            timestamp__range=(start,end)).order_by('timestamp').values('timestamp', 'rsi')
        serializer = RSIIndicatorDataSerializer(price_data, many=True)
        return Response(serializer.data)

class RSI1y(APIView):
    def get(self, request, ticker):
        start, end = helper_function('1y')
        price_data = StockIndicatorData.objects.filter(
            ticker=ticker.upper(),
            timestamp__range=(start,end)).order_by('timestamp').values('timestamp', 'rsi')
        serializer = RSIIndicatorDataSerializer(price_data, many=True)
        return Response(serializer.data)

class RSI2y(APIView):
    def get(self, request, ticker):
        start, end = helper_function('2y')
        price_data = StockIndicatorData.objects.filter(
            ticker=ticker.upper(),
            timestamp__range=(start,end)).order_by('timestamp').values('timestamp', 'rsi')
        serializer = RSIIndicatorDataSerializer(price_data, many=True)
        return Response(serializer.data)


class VOL1m(APIView):
    def get(self, request, ticker):
        start, end = helper_function('1m')
        price_data = StockIndicatorData.objects.filter(
            ticker=ticker.upper(),
            timestamp__range=(start,end)).order_by('timestamp').values('timestamp', 'volume')
        serializer = VOLIndicatorDataSerializer(price_data, many=True)
        return Response(serializer.data)

class VOL3m(APIView):
    def get(self, request, ticker):
        start, end = helper_function('3m')
        price_data = StockIndicatorData.objects.filter(
            ticker=ticker.upper(),
            timestamp__range=(start,end)).order_by('timestamp').values('timestamp', 'volume')
        serializer = VOLIndicatorDataSerializer(price_data, many=True)
        return Response(serializer.data)

class VOL6m(APIView):
    def get(self, request, ticker):
        start, end = helper_function('6m')
        price_data = StockIndicatorData.objects.filter(
            ticker=ticker.upper(),
            timestamp__range=(start,end)).order_by('timestamp').values('timestamp', 'volume')
        serializer = VOLIndicatorDataSerializer(price_data, many=True)
        return Response(serializer.data)


class VOL1y(APIView):
    def get(self, request, ticker):
        start, end = helper_function('1y')
        price_data = StockIndicatorData.objects.filter(
            ticker=ticker.upper(),
            timestamp__range=(start,end)).order_by('timestamp').values('timestamp', 'volume')
        serializer = VOLIndicatorDataSerializer(price_data, many=True)
        return Response(serializer.data)


class VOL2y(APIView):
    def get(self, request, ticker):
        start, end = helper_function('2y')
        price_data = StockIndicatorData.objects.filter(
            ticker=ticker.upper(),
            timestamp__range=(start,end)).order_by('timestamp').values('timestamp', 'volume')
        serializer = VOLIndicatorDataSerializer(price_data, many=True)
        return Response(serializer.data)

'''
class Backtest(APIView):
    def post(self, request):
        if request.method == 'POST':
            ticker = request.data.get('ticker')
            initial_investment = request.data.get('initial_investment')
            buy_price = request.data.get('buy_price')
            sell_price = request.data.get('sell_price')
            
        # Do something with the data
        data = {
            'ticker': request.data.get('ticker'),
            'initial_investment': request.data.get('initial_investment'),
            'buy_pice': request.data.get('buy_price'),
            'sell_price': request.data.get('sell_price')
        }
        # Filter data based on ticker 
        stock_data = StockIndicatorData.objects.filter(
            ticker=ticker
            ).order_by('timestamp')

        serializer = StockMarketDataSerializer(stock_data, many=True)

        # initialize values for tracking
        shares_owned = 0
        cash = data['initial_investment']
        total_value = data['initial_investment']

        for day_data in serializer.data:
            if day_data.low_price <= data['buy_pice'] and cash >= day_data.low_price:
                shares_to_buy = cash // day_data.low_price

                # Initiate transaction
                shares_owned += shares_to_buy
                cash -= shares_to_buy * day_data.low_price
            elif day_data.high_price >= data['sell_price'] and shares_owned > 0:
                # Sell
                cash += shares_owned * day_data.high_price
                shares_owned = 0

            total_value = cash + (shares_owned * day_data.close_price)

        profit_loss = total_value - data['initial_investment']
        
        return Response(profit_loss)
'''

