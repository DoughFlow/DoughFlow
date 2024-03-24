#!/bin/bash
set -e

# Define the name of your secret in AWS Secrets Manager
SECRET_NAME="your_secret_name_here"

# Fetch the secret from AWS Secrets Manager
SECRET=$(aws secretsmanager get-secret-value --secret-id $SECRET_NAME --query SecretString --output text)

# Extract credentials from the secret
POSTGRES_USER=$(echo $SECRET | jq -r .username)
POSTGRES_PASSWORD=$(echo $SECRET | jq -r .password)
POSTGRES_DB=$(echo $SECRET | jq -r .dbname)

# Rest of the script remains the same...

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

