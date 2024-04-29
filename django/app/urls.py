from django.urls import path

from app.views import StockFilterView, StockPreviewView, StockSixMonthView, StockOneYearView, StockThreeYearView, StockFiveYearView

app_name = "app"

urlpatterns = [
    #path('data/', StockDataView.as_view()),
    path('filter/<str:ticker>/start=<str:start_date>_end=<str:end_date>/', StockFilterView.as_view(), name='stock-data'),
    path('preview/<str:ticker>/', StockPreviewView.as_view(), name='stock-preview'),
    path('<str:ticker>/6m', StockSixMonthView.as_view(), name='one-year-data'),
    path('<str:ticker>/1y', StockOneYearView.as_view(), name='one-year-data'),
    path('<str:ticker>/3y', StockThreeYearView.as_view(), name='one-year-data'),
    path('<str:ticker>/5y', StockFiveYearView.as_view(), name='one-year-data'),
]
