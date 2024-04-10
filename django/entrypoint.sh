#!/bin/sh

# Apply Django database migrations
python manage.py migrate

# Add populate DB here
python manage.py json_to_database data/apple-5year.json
python manage.py json_to_database data/berkshire-hathaway-5year.json
python manage.py json_to_database data/lockheed-martin-5year.json
python manage.py json_to_database data/shopify-5year.json
python manage.py json_to_database data/tesla-5year.json

# Start Gunicorn server
exec gunicorn django_server.wsgi:application --bind 0.0.0.0:8000
