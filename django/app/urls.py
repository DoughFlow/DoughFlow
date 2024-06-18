from django.urls import path
from functools import partial
from app.views import ( Price1m, Price3m, Price6m, Price1y, Price2y, RSI1m,
        RSI3m, RSI6m, RSI1y, RSI2y, SMA1m, SMA3m, SMA6m, SMA1y, SMA2y,
        VOL1m, VOL3m, VOL6m, VOL1y, VOL2y )

app_name = 'app'

urlpatterns = [
    path('<str:ticker>/1m', Price1m.as_view(), name='Price'),
    path('<str:ticker>/3m', Price3m.as_view(), name='Price'),
    path('<str:ticker>/6m', Price6m.as_view(), name='Price'),
    path('<str:ticker>/1y', Price1y.as_view(), name='Price'),
    path('<str:ticker>/2y', Price2y.as_view(), name='Price'),
    path('<str:ticker>/rsi/1m', RSI1m.as_view(), name='Price'),
    path('<str:ticker>/rsi/3m', RSI3m.as_view(), name='Price'),
    path('<str:ticker>/rsi/6m', RSI6m.as_view(), name='Price'),
    path('<str:ticker>/rsi/1y', RSI1y.as_view(), name='Price'),
    path('<str:ticker>/rsi/2y', RSI2y.as_view(), name='Price'),
    path('<str:ticker>/sma/1m', SMA1m.as_view(), name='Price'),
    path('<str:ticker>/sma/3m', SMA3m.as_view(), name='Price'),
    path('<str:ticker>/sma/6m', SMA6m.as_view(), name='Price'),
    path('<str:ticker>/sma/1y', SMA1y.as_view(), name='Price'),
    path('<str:ticker>/sma/2y', SMA2y.as_view(), name='Price'),
    path('<str:ticker>/vol/1m', VOL1m.as_view(), name='Price'),
    path('<str:ticker>/vol/3m', VOL3m.as_view(), name='Price'),
    path('<str:ticker>/vol/6m', VOL6m.as_view(), name='Price'),
    path('<str:ticker>/vol/1y', VOL1y.as_view(), name='Price'),
    path('<str:ticker>/vol/2y', VOL2y.as_view(), name='Price')

]

