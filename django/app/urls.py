from django.urls import path

from app.views import StockDataView, StockFilterView, StockPreviewView, Backtest

app_name = "app"

urlpatterns = [
    path('data/', StockDataView.as_view()),
    path('filter/<str:ticker>/start=<str:start_date>_end=<str:end_date>/', StockFilterView.as_view(), name='stock-data'),
    path('preview/<str:ticker>/', StockPreviewView.as_view(), name='stock-preview'),
    path('backtest/', Backtest.as_view(), name='backtest')
]
