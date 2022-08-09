#!/bin/bash
# Wait until valid VPN connection is made.

set -e

SSM_PREFIX="/fresh-video/master/infra/rds"
CURRENT_COUNTRY=""

check_country() {

  RESP=`curl -s "https://api.myip.com/"`
  echo "Current Geo Meta: ${RESP}"
  CURRENT_COUNTRY=`echo ${RESP} | jq -r '.cc'`

}

# Validate a geo aws passed in
if [ -z "$CRAWLER_GEO" ]
then
  echo "Country not detected, exiting."
  exit 1
fi

if [ "$VPN" = "ON" ]; then

  echo "Waiting for VPN connection to ${CRAWLER_GEO}"

  until [ "${CURRENT_COUNTRY}" = "$CRAWLER_GEO" ]; do
    echo "Waiting for country connection."
    sleep 5
    check_country
  done

  echo "VPN connection detected."

fi

echo "Grabbing Variables from Parameter Store"
export RDS_HOST=$(aws ssm get-parameter --name ${SSM_PREFIX}/host | jq -r '.Parameter.Value')
export RDS_USER=$(aws ssm get-parameter --name ${SSM_PREFIX}/user | jq -r '.Parameter.Value')
export RDS_PASS=$(aws ssm get-parameter --with-decryption --name ${SSM_PREFIX}/pass | jq -r '.Parameter.Value')
export RDS_DB=$(aws ssm get-parameter --name ${SSM_PREFIX}/db | jq -r '.Parameter.Value')

source ~/.bashrc

npm install
npm run crawler