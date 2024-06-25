# Guide: AWS Configuration Script

## Overview
This guide provides instructions for using the `configure_cache.sh` script to configure AWS access credentials for injecting secrets into Docker. It includes details the command-line usage, configurations via cache files, and prerequisites.

## Usage
To use the configure_cache script, follow the syntax:
```bash
./configure_cache.sh --access-key <access_key> --secret-key <secret_key> --secret-name <secret_name>
```
## Cached Files
The script utilizes the django directory and the root directory for storing cached files.
Boto3 is a required dependency for fetching the secrets from AWS (must be installed on local venv/python)

|       Information         | Structure  |
|-------------------------|------------------------------|
| The .awskeycache file can be auto-                        | ```                          |
| matically generated using the shell                        | .                            |
| command, or copied into the root                        | ├── configure_cache.sh       |
| directory. Either way, the command| ├── .awskeycache       |
| must be run with either the cache                        | ├── django                   |
| file already existing or the access                       | │   ├── Dockerfile           |
| keys passed as command-line args.                        | │   ├── .secrets             |
| Then the .secrets file will be populated                        | ├── docker-compose.yml |      
| and you can run "docker-compose up"                        | └── venv-requirements.txt   |
|                         | ```                          |
## Previously mentioned requirements/prerequisites include:
-boto3
