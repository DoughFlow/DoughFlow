#!/bin/bash

# Local cache file
cache_file=".awskeycache"
count=0

# Remove secret file if exists
if [ -f django/.secrets ]; then
	rm django/.secrets
fi

# Malinput correction
usage() {
    echo "Usage: $0 --access-key <access_key>" \
	   " --secret-key <secret_key> --secret-name <secret_name>"
    exit 1
}

make_secrets() {
	# Load cached values for boto3
	read access_key secret_key secret_name < "$cache_file"

	# Inject secrets into Django directory
	output=$(python3 django/inject_secrets.py "$access_key" \
		"$secret_key" "$secret_name")
	# Iterate over the lines of output
	echo "$output" | while IFS= read -r line; do
	# Skip the first three lines
	if [ $count -gt 2 ]; then
        # Write each line to .secrets file
        echo "$line" >> django/.secrets
	fi
	((count++))
	done
}

# Check for params passed, save them
if [ -n "$6" ]; then
	access_key="$2"
	secret_key="$4"
	secret_name="$6"
	echo "$access_key $secret_key $secret_name" > "$cache_file"
	make_secrets
	exit 1
fi
if [ -f $cache_file ]; then
	make_secrets
	exit 1
else
	usage
fi
