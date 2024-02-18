# format csv to match django data model for hypertable

## timestamp

timezones must follow this form and have a NY timezone 
2022-09-30 03:00:00-05

## adjust csv_to_database command

the csv_to_database.py file in python_server/app/management/commands/

change the file to put your csv in the correct format

# changing file input

If you have json or other data structures create a new command file for 
populating the database with the new data source

# Use csv_to_database command

python3 manage.py csv_to_database ~/path/to/your_data.csv TICKER
