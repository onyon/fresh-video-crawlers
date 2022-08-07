#!/bin/bash
# Wait until valid VPN connection is made.

set -e

# Validate a geo aws passed in
if [ -z "$CRAWLER_GEO" ]
then
  echo "Country not detected, exiting."
  exit 1
fi

echo "Waiting for VPN connection to ${CRAWLER_GEO}"

until [ `curl -s "https://api.myip.com/" | jq -r '.cc'` = "$CRAWLER_GEO" ]; do
  echo "Waiting for country connection."
  sleep 1
done

echo "VPN connection detected."

echo "Grabbing Variables from Parameter Store"
export RDS_HOST=$(aws ssm get-parameter --name /torrent-ninja/master/infra/rds/host | jq -r '.Parameter.Value')
export RDS_USER=$(aws ssm get-parameter --name /torrent-ninja/master/infra/rds/user | jq -r '.Parameter.Value')
export RDS_PASS=$(aws ssm get-parameter --with-decryption --name /torrent-ninja/master/infra/rds/pass | jq -r '.Parameter.Value')
export RDS_DB="torrent_ninja"

source ~/.bashrc

npm install
npm run ${CRAWLER_NAME}