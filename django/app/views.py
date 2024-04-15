from rest_framework.response import Response
from rest_framework.views import APIView
from app.models import StockMarketData
from app.serializers import StockMarketDataSerializer


class StockDataView(APIView):
    def get(self, request):
        stock_data = StockMarketData.objects.all()
        serializer = StockMarketDataSerializer(stock_data, many=True)
        return Response(serializer.data)


"""
from django.db.models import Q
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import StockMarketData
from .serializers import StockMarketDataSerializer
from django.utils.dateparse import parse_datetime

class StockDataView(APIView):
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
        )

        serializer = StockMarketDataSerializer(stock_data, many=True)
        return Response(serializer.data)

"""
