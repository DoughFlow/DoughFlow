from rest_framework.response import Response
from rest_framework.views import APIView
from app.models import StockMarketData
from app.serializers import StockMarketDataSerializer


class StockDataView(APIView):
    def get(self, request):
        stock_data = StockMarketData.objects.all()
        serializer = StockMarketDataSerializer(stock_data, many=True)
        return Response(serializer.data)

class TickerDynamicView(APIView):
    def get(self, request, my_ticker):
        my_ticker = my_ticker.upper()
        obj = StockMarketData.objects.filter(ticker=my_ticker)
        serializer = StockMarketDataSerializer(obj, many=True)
        return Response(serializer.data)
