#!/bin/bash
set -e

# Check if the user already exists
USER_EXISTS=$(psql -U postgres -tAc "SELECT 1 FROM pg_roles WHERE rolname='$POSTGRES_USER'")
if [ "$USER_EXISTS" != "1" ]; then
    psql -v ON_ERROR_STOP=1 --username "postgres" <<-EOSQL
        CREATE USER ${POSTGRES_USER} WITH PASSWORD '${POSTGRES_PASSWORD}';
    EOSQL
fi

# Check if the database already exists
DB_EXISTS=$(psql -U postgres -tAc "SELECT 1 FROM pg_database WHERE datname='$POSTGRES_DB'")
if [ "$DB_EXISTS" != "1" ]; then
    psql -v ON_ERROR_STOP=1 --username "postgres" <<-EOSQL
        CREATE DATABASE ${POSTGRES_DB} OWNER ${POSTGRES_USER};
    EOSQL
fi

psql -v ON_ERROR_STOP=1 --username "postgres" <<-EOSQL
    GRANT ALL PRIVILEGES ON DATABASE ${POSTGRES_DB} TO ${POSTGRES_USER};
EOSQL

