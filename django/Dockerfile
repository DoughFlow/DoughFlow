FROM python:3.12

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

WORKDIR /app

COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000

WORKDIR ./django
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "django_server.wsgi:application"]
