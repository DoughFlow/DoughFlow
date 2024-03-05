from django.urls import path

from app.views import StockDataView

app_name = "app"

urlpatterns = [
    path('data/', StockDataView.as_view()),
]
