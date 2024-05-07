from rest_framework.views import APIView
from rest_framework.response import Response
from .models import StockMarketData
from .serializers import StockMarketDataSerializer
from django.utils.dateparse import parse_datetime
from django.utils.timezone import now
from datetime import timedelta


class StockDataView(APIView):
    def get(self, request):
        stock_data = StockMarketData.objects.all()
        serializer = StockMarketDataSerializer(stock_data, many=True)
        return Response(serializer.data)


class StockFilterView(APIView):
    def get(self, request, ticker, start_date, end_date):
        # Parse dates
        start = parse_datetime(f'{start_date}T00:00:00Z')
        end = parse_datetime(f'{end_date}T23:59:59Z')

        # Validate that dates are parsed correctly
        if not start or not end:
            return Response({"error": "Invalid date format"}, status=400)

        # Filter data based on ticker and date range
        stock_data = StockMarketData.objects.filter(
            ticker=ticker,
            timestamp__range=(start, end)
        ).order_by('timestamp')

        serializer = StockMarketDataSerializer(stock_data, many=True)
        return Response(serializer.data)


class StockPreviewView(APIView):
    def get(self, request, ticker):
        # Find the last date available in the data for the given ticker
        last_date = StockMarketData.objects.filter(
            ticker=ticker
        ).order_by('-timestamp__date').values('timestamp__date').distinct().first()

        if last_date:
            last_date = last_date['timestamp__date']
            # Get the last 5 available dates
            last_five_dates = StockMarketData.objects.filter(
                ticker=ticker,
                timestamp__date__lte=last_date
            ).order_by('-timestamp__date').values('timestamp__date').distinct()[:5]

            # Convert QuerySet of dates to a list for filtering
            dates_list = [date['timestamp__date'] for date in last_five_dates]

            # Filter data based on ticker and the last five dates
            stock_data = StockMarketData.objects.filter(
                ticker=ticker,
                timestamp__date__in=dates_list
            ).order_by('timestamp')

            # Serialize the data
            serializer = StockMarketDataSerializer(stock_data, many=True)
            return Response(serializer.data)
        else:
            return Response([])


class Backtest(APIView):
    def post(self, request):
        data = {
            'ticker': request.data.get('ticker'),
            'initial_investment': request.data.get('initial_investment'),
            'buy_pice': request.data.get('buy_price'),
            'sell_price': request.data.get('sell_price')
        }

        # Filter data based on ticker 
        stock_data = StockMarketData.objects.filter(
            ticker=data['ticker']
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

        profit_loss = total_value - initial_investment
        
        return Response(profit_loss)
