from django.urls import path
from functools import partial
from app.views import PriceSixView, SMASixView, RSISixView, VOLSixView, PriceOneView, SMAOneView, RSIOneView, VOLOneView, PriceFiveView, SMAFiveView, RSIFiveView, VOLFiveView, WeekView

app_name = "app"

urlpatterns = [
    path('<str:ticker>', WeekView.as_view(), name='week-view'),
    path('<str:ticker>/6m', PriceSixView.as_view() ,name='sixmonth-view'),
    path('<str:ticker>/1y', PriceOneView.as_view() ,name='one-view'),
    path('<str:ticker>/5y', PriceFiveView.as_view() ,name='five-view'),
    path('<str:ticker>/rsi/6m', RSISixView.as_view() ,name='sixmonth-view'),
    path('<str:ticker>/rsi/1y', RSIOneView.as_view() ,name='sixmonth-view'),
    path('<str:ticker>/rsi/5y', RSIFiveView.as_view() ,name='sixmonth-view'),
    path('<str:ticker>/sma/6m', SMASixView.as_view() ,name='sixmonth-view'),
    path('<str:ticker>/sma/1y', SMAOneView.as_view() ,name='sixmonth-view'),
    path('<str:ticker>/sma/5y', SMAFiveView.as_view() ,name='sixmonth-view'),
    path('<str:ticker>/vol/6m', VOLSixView.as_view() ,name='sixmonth-view'),
    path('<str:ticker>/vol/1y', VOLOneView.as_view() ,name='sixmonth-view'),
    path('<str:ticker>/vol/5y', VOLFiveView.as_view() ,name='sixmonth-view')
#    path('backtest/', Backtest.as_view(), name='backtest')
]

