from rest_framework.response import Response
from rest_framework.views import APIView
from app.models import StockMarketData

def stock_data_view(request, ticker):
    candle_time = request.GET.get('candle_time', 1440)  # Default to daily candles if not specified
    data = StockMarketData.get_aggregated_data(ticker, candle_time)
    return JsonResponse(list(data), safe=False)

class StockDayView(APIView):
    def get(self, request):
        pass

class StockMonthView(APIView):
    def get(self, request):
        pass

class StockYearView(APIView):
    def get(self, request):
        pass

class StockYTDView(APIView):
    def get(self, request):
        pass


