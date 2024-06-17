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
    if time == '6m':
        return datetime.date(2023, 11, 1), datetime.date(2024, 5, 1)
    if time == '1y':
        return datetime.date(2023, 5, 1), datetime.date(2024, 5, 1)
    if time == '5y':
        return datetime.date(2019, 5, 1), datetime.date(2024, 5, 1)

class PriceSixView(APIView):
    def get(self, request, ticker):
        start, end = helper_function('6m')
        price_data = StockIndicatorData.objects.filter(
            ticker=ticker.upper(),
            timestamp__range=(start,end)).order_by('timestamp').values('timestamp', 'open_price', 'high_price', 'low_price', 'close_price')
        serializer = StockIndicatorDataSerializer(price_data, many=True)
        return Response(serializer.data)

class PriceOneView(APIView):
    def get(self, request, ticker):
        start, end = helper_function('1y')
        price_data = StockIndicatorData.objects.filter(
            ticker=ticker.upper(),
            timestamp__range=(start,end)).order_by('timestamp').values('timestamp', 'open_price', 'high_price', 'low_price', 'close_price')
        serializer = StockIndicatorDataSerializer(price_data, many=True)
        return Response(serializer.data)

class PriceFiveView(APIView):
    def get(self, request, ticker):
        start, end = helper_function('5y')
        price_data = StockIndicatorData.objects.filter(
            ticker=ticker.upper(),
            timestamp__range=(start,end)).order_by('timestamp').values('timestamp', 'open_price', 'high_price', 'low_price', 'close_price')
        serializer = StockIndicatorDataSerializer(price_data, many=True)
        return Response(serializer.data)

class SMASixView(APIView):
    def get(self, request, ticker):
        start, end = helper_function('6m')
        price_data = StockIndicatorData.objects.filter(
            ticker=ticker.upper(),
            timestamp__range=(start,end)).order_by('timestamp').values('timestamp', 'sma')
        serializer = SMAIndicatorDataSerializer(price_data, many=True)
        return Response(serializer.data)

class SMAOneView(APIView):
    def get(self, request, ticker):
        start, end = helper_function('1y')
        price_data = StockIndicatorData.objects.filter(
            ticker=ticker.upper(),
            timestamp__range=(start,end)).order_by('timestamp').values('timestamp', 'sma')
        serializer = SMAIndicatorDataSerializer(price_data, many=True)
        return Response(serializer.data)

class SMAFiveView(APIView):
    def get(self, request, ticker):
        start, end = helper_function('5y')
        price_data = StockIndicatorData.objects.filter(
            ticker=ticker.upper(),
            timestamp__range=(start,end)).order_by('timestamp').values('timestamp', 'sma')
        serializer = SMAIndicatorDataSerializer(price_data, many=True)
        return Response(serializer.data)

class RSISixView(APIView):
    def get(self, request, ticker):
        start, end = helper_function('6m')
        price_data = StockIndicatorData.objects.filter(
            ticker=ticker.upper(),
            timestamp__range=(start,end)).order_by('timestamp').values('timestamp', 'rsi')
        serializer = RSIIndicatorDataSerializer(price_data, many=True)
        return Response(serializer.data)

class RSIOneView(APIView):
    def get(self, request, ticker):
        start, end = helper_function('1y')
        price_data = StockIndicatorData.objects.filter(
            ticker=ticker.upper(),
            timestamp__range=(start,end)).order_by('timestamp').values('timestamp', 'rsi')
        serializer = RSIIndicatorDataSerializer(price_data, many=True)
        return Response(serializer.data)

class RSIFiveView(APIView):
    def get(self, request, ticker):
        start, end = helper_function('5y')
        price_data = StockIndicatorData.objects.filter(
            ticker=ticker.upper(),
            timestamp__range=(start,end)).order_by('timestamp').values('timestamp', 'rsi')
        serializer = RSIIndicatorDataSerializer(price_data, many=True)
        return Response(serializer.data)

class VOLSixView(APIView):
    def get(self, request, ticker):
        start, end = helper_function('6m')
        price_data = StockIndicatorData.objects.filter(
            ticker=ticker.upper(),
            timestamp__range=(start,end)).order_by('timestamp').values('timestamp', 'volume')
        serializer = VOLIndicatorDataSerializer(price_data, many=True)
        return Response(serializer.data)

class VOLOneView(APIView):
    def get(self, request, ticker):
        start, end = helper_function('1y')
        price_data = StockIndicatorData.objects.filter(
            ticker=ticker.upper(),
            timestamp__range=(start,end)).order_by('timestamp').values('timestamp', 'volume')
        serializer = VOLIndicatorDataSerializer(price_data, many=True)
        return Response(serializer.data)

class VOLFiveView(APIView):
    def get(self, request, ticker):
        start, end = helper_function('5y')
        price_data = StockIndicatorData.objects.filter(
            ticker=ticker.upper(),
            timestamp__range=(start,end)).order_by('timestamp').values('timestamp', 'volume')
        serializer = VOLIndicatorDataSerializer(price_data, many=True)
        return Response(serializer.data)

class WeekView(APIView):
    def get(self, request, ticker):
        start, end = helper_function('6m')
        price_data = StockIndicatorData.objects.filter(
            ticker=ticker.upper(),
            timestamp__range=(start,end)).order_by('timestamp').values_list('close_price', flat=True)[:7]
        close_prices = list(price_data)
        return JsonResponse(close_prices, safe=False)

   
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

