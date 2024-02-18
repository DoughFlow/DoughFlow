# start sql
sudo -u postgres psql

# create user for your django orm to use and give it create db permissions
CREATE USER django_user WITH PASSWORD 'password';
CREATE DATABASE django_db OWNER django_user;
GRANT ALL PRIVILEGES ON DATABASE django_db TO django_user;

# give django permissions to edit data
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON TABLES TO django_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON SEQUENCES TO django_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON FUNCTIONS TO django_user;

# set environment variable for django reading
export SQL_PASSWORD="password"
