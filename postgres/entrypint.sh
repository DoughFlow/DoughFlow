#!/bin/bash
# Fetch secrets
SECRET=$(aws secretsmanager get-secret-value --secret-id prod/postgres --query SecretString --output text)
export POSTGRES_USER=$(echo $SECRET | jq -r .username)
export POSTGRES_PASSWORD=$(echo $SECRET | jq -r .password)
export POSTGRES_DB=$(echo $SECRET | jq -r .dbname)

# Call the original entrypoint script
exec docker-entrypoint.sh postgres
