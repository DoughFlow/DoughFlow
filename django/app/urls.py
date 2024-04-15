from django.urls import path

from app.views import StockDataView

app_name = "app"

urlpatterns = [
    path('data/', StockDataView.as_view()),
    #   path('data/<str:ticker>/start=<str:start_date>_end=<str:end_date>/', StockDataView.as_view(), name='stock-data'),
]
