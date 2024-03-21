CREATE USER django_user WITH PASSWORD 'password';
CREATE DATABASE django_db OWNER django_user;
GRANT ALL PRIVILEGES ON DATABASE django_db TO django_user;


CREATE TABLE measurements (
    id SERIAL PRIMARY KEY,
    measurement_date DATE NOT NULL,
    value DECIMAL NOT NULL
) PARTITION BY RANGE (measurement_date);

CREATE TABLE measurements_y2023_m01 PARTITION OF measurements
    FOR VALUES FROM ('2023-01-01') TO ('2023-02-01');

