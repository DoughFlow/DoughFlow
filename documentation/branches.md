# Branches for DoughFlow Development

## dummy csv data

- 5 files
    - 4 5 year long day prices for 4 different stocks
    - 1 month of 1 minute data for one of 4 stocks
        - for testing changing the candle_time on the front end

## postgres 

- Dockerfile
    - uses aws secret manager for db connection
    - creates the table with partitioning
    - pulls from dummy data branch and loads it in for initial development
- init-db.sh 
    - creates django_user

## django nginx to remote db

- django, and nginx dirs with settings to connect to remote db 
    - this will use the .env for the sql password and other dockder env
        variables
    - for api development and data collection development

## django nginx to local db

- django, and nginx dirs with settings to connect to remote db 
    - this will use the .env for the sql password and other dockder env
        variables
    - for api development and data collection development

## frontend nginx django local db

- contains frontend, nginx, django, and postgres images 
    - for frontend development
    - uses local db for testing with dummy data from dummy data branch

## main

- contains frontend, nginx, django
    - connects to remote postgres image
    - frontend, nginx, django all run in one ec2
- Dockerfile
    - has connection to remote db through aws secrets manager
