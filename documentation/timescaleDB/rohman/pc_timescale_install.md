# Commands for postresql and timescaledb (timescale from source)

## These commands worked for WSL Ubuntu using fish shell

### Install postgres
sudo apt install postgresql postgresql-contrib

### git build package
sudo apt-get install -y build-essential git

### clone and checkout branch
git clone https://github.com/timescale/timescaledb.git
cd timescaledb
git checkout 2.14.0

### build and install
./bootstrap
cd build && make
sudo make install

### change postgresql config to look for timescaledb
sudo nano /etc/postgresql/14/main/postgresql.conf

#### add this line at the end of the file: 
shared_preload_libraries = 'timescaledb'

### restart postgres
sudo service postgresql restart
sudo -u postgres psql

### enter this sql to create extension and confirm its install
CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;
SELECT * FROM pg_extension WHERE extname = 'timescaledb';
