#!/bin/sh

# Wait for the database to be ready
python manage.py wait_for_db

# Apply Django database migrations
python manage.py migrate

# Collect static files
python manage.py collectstatic --noinput

python manage.py local_dir_db_deposit /data/csv_files

# Start Gunicorn server
exec gunicorn django_server.wsgi:application --bind 0.0.0.0:8000
