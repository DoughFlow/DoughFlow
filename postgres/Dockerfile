FROM postgres:16

# Install AWS CLI
RUN apt-get update && \
    apt-get install -y awscli && \
    rm -rf /var/lib/apt/lists/*

COPY init-db.sh /docker-entrypoint-initdb.d/
