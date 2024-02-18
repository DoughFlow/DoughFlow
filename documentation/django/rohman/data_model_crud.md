# write class for django data model

The class should be located in the /python_server/app/migrations/models.py on 
the branch django_server

## for hypertables
timestamp must be primary key (postgres partitions based on primary key and 
timescale partitions by timestamp)

# run commands to migrate to db

python3 manage.py makemigrations
python3 manage.py migrate

# run command to create hypertable of stock data

python3 manage.py create_hypertable
