#!/bin/sh

# Apply Django database migrations
python manage.py migrate

# Start Gunicorn server
exec gunicorn django_server.wsgi:application --bind 0.0.0.0:8000
