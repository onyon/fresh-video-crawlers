#!/bin/bash

# Map Inputs
while getopts g:c: flag
do
  case "${flag}" in
    g) GEO=${OPTARG};;
    c) CRAWLER_NAME=${OPTARG}
  esac
done

# Map Country input to ExpressVPN Alias
get_express_vpn_code() {

  local cc=$1 # Set 2 letter country code
  case $cc in

    US)
      export CRAWLER_GEO="US"
      export CRAWLER_GEO_LONG="United States"
      export CRAWLER_EXPRESSVPN_GEO="usla1"
      ;;

    CA)
      export CRAWLER_GEO="CA"
      export CRAWLER_GEO_LONG="Canada"
      export CRAWLER_EXPRESSVPN_GEO="cato"
      ;;

    UK)
      export CRAWLER_GEO="UK"
      export CRAWLER_GEO_LONG="United Kingdom"
      export CRAWLER_EXPRESSVPN_GEO="uklo"
      ;;

    SG)
      export CRAWLER_GEO="SG"
      export CRAWLER_GEO_LONG="Singapore"
      export CRAWLER_EXPRESSVPN_GEO="sgju"
      ;;
    
    IN)
      export CRAWLER_GEO="IN"
      export CRAWLER_GEO_LONG="India"
      export CRAWLER_EXPRESSVPN_GEO="in"
      ;;
    
    JP)
      export CRAWLER_GEO="JP"
      export CRAWLER_GEO_LONG="Japan"
      export CRAWLER_EXPRESSVPN_GEO="jpto"
      ;;

    *)
      echo "Unsupported Geo"
      exit 1
      ;;

  esac

}

# Setup Geo
get_express_vpn_code "$GEO"

echo "Running from country ${CRAWLER_GEO_LONG} (${CRAWLER_GEO})"

echo "Retrieving temporary credentials from STS"

CREDENTIALS=`aws sts get-session-token`

if [ $? -ne 0 ];
then
  echo "Unable to retrieve credentials from sts."
  exit 1
fi

export LOCAL_AWS_ACCESS_KEY_ID=`echo ${CREDENTIALS} | jq -r '.Credentials.AccessKeyId'`
export LOCAL_AWS_SECRET_ACCESS_KEY=`echo ${CREDENTIALS} | jq -r '.Credentials.SecretAccessKey'`
export LOCAL_AWS_SESSION_TOKEN=`echo ${CREDENTIALS} | jq -r '.Credentials.SessionToken'`

export CRAWLER_NAME=$CRAWLER_NAME

docker-compose up --abort-on-container-exit