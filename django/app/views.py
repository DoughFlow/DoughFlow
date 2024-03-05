from rest_framework.response import Response
from rest_framework.views import APIView
from app.models import StockMarketData
from app.serializers import StockMarketDataSerializer


class StockDataView(APIView):
    def get(self, request):
        stock_data = StockMarketData.objects.all()
        serializer = StockMarketDataSerializer(stock_data, many=True)
        return Response(serializer.data)
