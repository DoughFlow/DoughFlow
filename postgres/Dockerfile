FROM postgres:16

# Install AWS CLI and jq
RUN apt-get update && \
    apt-get install -y awscli jq && \
    rm -rf /var/lib/apt/lists/*

COPY init-db.sh /docker-entrypoint-initdb.d/
COPY entrypoint-wrapper.sh /usr/local/bin/

ENTRYPOINT ["entrypoint-wrapper.sh"]
