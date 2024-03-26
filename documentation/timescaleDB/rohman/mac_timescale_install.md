# Mac
brew install postgresql
brew tap timescale/tap
brew install timescaledb

# PC 

wget --quiet -O - https://packagecloud.io/timescale/timescale-oss/gpgkey | sudo apt-key add -
sudo sh -c "echo 'deb https://packagecloud.io/timescale/timescale-oss/ubuntu/ $(. /etc/os-release; echo $VERSION_CODENAME) main' > /etc/apt/sources.list.d/timescale_timescale-oss.list"
sudo apt update
sudo apt install timescaledb-2-postgresql-14
sudo timescaledb-tune --quiet --yes

# Adding Extension

## Mac 

brew services restart postgresql

### In postgresql

CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;

## PC

sudo -u postgres psql

### In postgresql

CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;
