# Generated by Django 4.1.13 on 2024-03-01 17:54

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("app", "0002_rename_close_stockmarketdata_close_price_and_more"),
    ]

    operations = [
        migrations.RenameField(
            model_name="stockmarketdata",
            old_name="candleTime",
            new_name="candle_time",
        ),
    ]