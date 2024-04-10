from django.urls import path

from app.views import StockDataView, TickerDynamicView

app_name = "app"

urlpatterns = [
    path('data/', StockDataView.as_view()),
    path('data/<str:my_ticker>', TickerDynamicView.as_view()),
]
