#!/bin/bash

# Map Inputs
while getopts g:p:m: flag
do
  case "${flag}" in
    g) 
      export CRAWLER_GEO=${OPTARG}
      ;;
    p) 
      export CRAWLER_PROVIDER=${OPTARG}
      ;;
    m)
      export CRAWLER_MEDIUM=${OPTARG}
      ;;
  esac
done

# Map Country input to ExpressVPN Alias
get_express_vpn_code() {

  export VPN="ON"

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
      export CRAWLER_GEO="GB"
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
    
    HK)
      export CRAWLER_GEO="HK"
      export CRAWLER_GEO_LONG="Hong Kong"
      export CRAWLER_EXPRESSVPN_GEO="hk2"
      ;;

    AU)
      export CRAWLER_GEO="AU"
      export CRAWLER_GEO_LONG="Australia"
      export CRAWLER_EXPRESSVPN_GEO="aume"
      ;;

    DE)
      export CRAWLER_GEO="DE"
      export CRAWLER_GEO_LONG="Germany"
      export CRAWLER_EXPRESSVPN_GEO="defr1"
      ;;

    MX)
      export CRAWLER_GEO="MX"
      export CRAWLER_GEO_LONG="Mexico"
      export CRAWLER_EXPRESSVPN_GEO="mx"
      ;;

    KR)
      export CRAWLER_GEO="KR"
      export CRAWLER_GEO_LONG="South Korea"
      export CRAWLER_EXPRESSVPN_GEO="kr2"
      ;;
    
    PH)
      export CRAWLER_GEO="PH"
      export CRAWLER_GEO_LONG="Philippines"
      export CRAWLER_EXPRESSVPN_GEO="ph"
      ;;
    
    MY)
      export CRAWLER_GEO="MY"
      export CRAWLER_GEO_LONG="Malaysia"
      export CRAWLER_EXPRESSVPN_GEO="my"
      ;;
    
    LK)
      export CRAWLER_GEO="LK"
      export CRAWLER_GEO_LONG="Sri Lanka"
      export CRAWLER_EXPRESSVPN_GEO="lk"
      ;;
    
    NL)
      export CRAWLER_GEO="NL"
      export CRAWLER_GEO_LONG="Netherlands"
      export CRAWLER_EXPRESSVPN_GEO="nlam"
      ;;

    PK)
      export CRAWLER_GEO="PK"
      export CRAWLER_GEO_LONG="Pakistan"
      export CRAWLER_EXPRESSVPN_GEO="pk"
      ;;
    
    KZ)
      export CRAWLER_GEO="KZ"
      export CRAWLER_GEO_LONG="Kazakhstan"
      export CRAWLER_EXPRESSVPN_GEO="kz"
      ;;
    
    TH)
      export CRAWLER_GEO="TH"
      export CRAWLER_GEO_LONG="Thailand"
      export CRAWLER_EXPRESSVPN_GEO="th"
      ;;
    
    ID)
      export CRAWLER_GEO="ID"
      export CRAWLER_GEO_LONG="Indonesia"
      export CRAWLER_EXPRESSVPN_GEO="id"
      ;;
    
    ES)
      export CRAWLER_GEO="ES"
      export CRAWLER_GEO_LONG="Spain"
      export CRAWLER_EXPRESSVPN_GEO="esma"
      ;;

    NZ)
      export CRAWLER_GEO="NZ"
      export CRAWLER_GEO_LONG="New Zealand"
      export CRAWLER_EXPRESSVPN_GEO="nz"
      ;;
    
    CH)
      export CRAWLER_GEO="CH"
      export CRAWLER_GEO_LONG="Switzerland"
      export CRAWLER_EXPRESSVPN_GEO="ch"
      ;;
    
    TW)
      export CRAWLER_GEO="TW"
      export CRAWLER_GEO_LONG="Taiwan"
      export CRAWLER_EXPRESSVPN_GEO="tw3"
      ;;
    
    FR)
      export CRAWLER_GEO="FR"
      export CRAWLER_GEO_LONG="France"
      export CRAWLER_EXPRESSVPN_GEO="frpa2"
      ;;
    
    VN)
      export CRAWLER_GEO="VN"
      export CRAWLER_GEO_LONG="Vietnam"
      export CRAWLER_EXPRESSVPN_GEO="vn"
      ;;
    
    MO)
      export CRAWLER_GEO="MO"
      export CRAWLER_GEO_LONG="Macau"
      export CRAWLER_EXPRESSVPN_GEO="mo"
      ;;
    
    KH)
      export CRAWLER_GEO="KH"
      export CRAWLER_GEO_LONG="Cambodia"
      export CRAWLER_EXPRESSVPN_GEO="kh"
      ;;
    
    MN)
      export CRAWLER_GEO="MN"
      export CRAWLER_GEO_LONG="Mongolia"
      export CRAWLER_EXPRESSVPN_GEO="mn"
      ;;
    
    IT)
      export CRAWLER_GEO="IT"
      export CRAWLER_GEO_LONG="Italy"
      export CRAWLER_EXPRESSVPN_GEO="itco"
      ;;
    
    LA)
      export CRAWLER_GEO="LA"
      export CRAWLER_GEO_LONG="Laos"
      export CRAWLER_EXPRESSVPN_GEO="la"
      ;;

    MM)
      export CRAWLER_GEO="MM"
      export CRAWLER_GEO_LONG="Myanmar"
      export CRAWLER_EXPRESSVPN_GEO="mm"
      ;;
    
    NP)
      export CRAWLER_GEO="NP"
      export CRAWLER_GEO_LONG="Nepal"
      export CRAWLER_EXPRESSVPN_GEO="np"
      ;;
    
    KG)
      export CRAWLER_GEO="KG"
      export CRAWLER_GEO_LONG="Kyrgyzstan"
      export CRAWLER_EXPRESSVPN_GEO="kg"
      ;;
    
    UZ)
      export CRAWLER_GEO="UZ"
      export CRAWLER_GEO_LONG="Uzbekistan"
      export CRAWLER_EXPRESSVPN_GEO="uz"
      ;;
    
    BD)
      export CRAWLER_GEO="BD"
      export CRAWLER_GEO_LONG="Bangladesh"
      export CRAWLER_EXPRESSVPN_GEO="bd"
      ;;
    
    BT)
      export CRAWLER_GEO="BT"
      export CRAWLER_GEO_LONG="Bhutan"
      export CRAWLER_EXPRESSVPN_GEO="bt"
      ;;
    
    BN)
      export CRAWLER_GEO="BN"
      export CRAWLER_GEO_LONG="Brunei"
      export CRAWLER_EXPRESSVPN_GEO="bnbr"
      ;;
    
    BR)
      export CRAWLER_GEO="BR"
      export CRAWLER_GEO_LONG="Brazil"
      export CRAWLER_EXPRESSVPN_GEO="br2"
      ;;
    
    PA)
      export CRAWLER_GEO="PA"
      export CRAWLER_GEO_LONG="Panama"
      export CRAWLER_EXPRESSVPN_GEO="pa"
      ;;

    CL)
      export CRAWLER_GEO="CL"
      export CRAWLER_GEO_LONG="Chile"
      export CRAWLER_EXPRESSVPN_GEO="cl"
      ;;
    
    AR)
      export CRAWLER_GEO="AR"
      export CRAWLER_GEO_LONG="Argentina"
      export CRAWLER_EXPRESSVPN_GEO="ar"
      ;;

    BO)
      export CRAWLER_GEO="BO"
      export CRAWLER_GEO_LONG="Bolivia"
      export CRAWLER_EXPRESSVPN_GEO="vo"
      ;;

    CR)
      export CRAWLER_GEO="CR"
      export CRAWLER_GEO_LONG="Costa Rica"
      export CRAWLER_EXPRESSVPN_GEO="cr"
      ;;
    
    CO)
      export CRAWLER_GEO="CO"
      export CRAWLER_GEO_LONG="Colombia"
      export CRAWLER_EXPRESSVPN_GEO="co"
      ;;
    
    VE)
      export CRAWLER_GEO="VE"
      export CRAWLER_GEO_LONG="Venezuela"
      export CRAWLER_EXPRESSVPN_GEO="ve"
      ;;
    
    EC)
      export CRAWLER_GEO="EC"
      export CRAWLER_GEO_LONG="Ecuador"
      export CRAWLER_EXPRESSVPN_GEO="ec"
      ;;
    
    GT)
      export CRAWLER_GEO="GT"
      export CRAWLER_GEO_LONG="Guatemala"
      export CRAWLER_EXPRESSVPN_GEO="gt"
      ;;

    PE)
      export CRAWLER_GEO="PE"
      export CRAWLER_GEO_LONG="Peru"
      export CRAWLER_EXPRESSVPN_GEO="pe"
      ;;
    
    UY)
      export CRAWLER_GEO="UY"
      export CRAWLER_GEO_LONG="Uruguay"
      export CRAWLER_EXPRESSVPN_GEO="uy"
      ;;
    
    BS)
      export CRAWLER_GEO="BS"
      export CRAWLER_GEO_LONG="Bahamas"
      export CRAWLER_EXPRESSVPN_GEO="bs"
      ;;
    
    SE)
      export CRAWLER_GEO="SE"
      export CRAWLER_GEO_LONG="Sweden"
      export CRAWLER_EXPRESSVPN_GEO="se"
      ;;
    
    RO)
      export CRAWLER_GEO="RO"
      export CRAWLER_GEO_LONG="Romania"
      export CRAWLER_EXPRESSVPN_GEO="ro"
      ;;
    
    TR)
      export CRAWLER_GEO="TR"
      export CRAWLER_GEO_LONG="Turkey"
      export CRAWLER_EXPRESSVPN_GEO="tr"
      ;;

    IE)
      export CRAWLER_GEO="IE"
      export CRAWLER_GEO_LONG="Ireland"
      export CRAWLER_EXPRESSVPN_GEO="ie"
      ;;

    IS)
      export CRAWLER_GEO="IS"
      export CRAWLER_GEO_LONG="Iceland"
      export CRAWLER_EXPRESSVPN_GEO="is"
      ;;
    
    NO)
      export CRAWLER_GEO="NO"
      export CRAWLER_GEO_LONG="Norway"
      export CRAWLER_EXPRESSVPN_GEO="no"
      ;;

    DK)
      export CRAWLER_GEO="DK"
      export CRAWLER_GEO_LONG="Denmark"
      export CRAWLER_EXPRESSVPN_GEO="dk"
      ;;
    
    BE)
      export CRAWLER_GEO="BE"
      export CRAWLER_GEO_LONG="Belgium"
      export CRAWLER_EXPRESSVPN_GEO="be"
      ;;

    FI)
      export CRAWLER_GEO="FI"
      export CRAWLER_GEO_LONG="Finland"
      export CRAWLER_EXPRESSVPN_GEO="fi"
      ;;
    
    GR)
      export CRAWLER_GEO="GR"
      export CRAWLER_GEO_LONG="Greece"
      export CRAWLER_EXPRESSVPN_GEO="gr"
      ;;
    
    PT)
      export CRAWLER_GEO="PT"
      export CRAWLER_GEO_LONG="Portugal"
      export CRAWLER_EXPRESSVPN_GEO="pt"
      ;;
    
    AT)
      export CRAWLER_GEO="AT"
      export CRAWLER_GEO_LONG="Austria"
      export CRAWLER_EXPRESSVPN_GEO="at"
      ;;

    AM)
      export CRAWLER_GEO="AM"
      export CRAWLER_GEO_LONG="Armenia"
      export CRAWLER_EXPRESSVPN_GEO="am"
      ;;

    PL)
      export CRAWLER_GEO="PL"
      export CRAWLER_GEO_LONG="Poland"
      export CRAWLER_EXPRESSVPN_GEO="pl"
      ;;
    
    LT)
      export CRAWLER_GEO="LT"
      export CRAWLER_GEO_LONG="Lithuania"
      export CRAWLER_EXPRESSVPN_GEO="lt"
      ;;

    LV)
      export CRAWLER_GEO="LV"
      export CRAWLER_GEO_LONG="Latvia"
      export CRAWLER_EXPRESSVPN_GEO="lv"
      ;;

    EE)
      export CRAWLER_GEO="EE"
      export CRAWLER_GEO_LONG="Estonia"
      export CRAWLER_EXPRESSVPN_GEO="ee"
      ;;
    
    CZ)
      export CRAWLER_GEO="CZ"
      export CRAWLER_GEO_LONG="Czech Republic"
      export CRAWLER_EXPRESSVPN_GEO="cz"
      ;;

    ME)
      export CRAWLER_GEO="ME"
      export CRAWLER_GEO_LONG="Montenegro"
      export CRAWLER_EXPRESSVPN_GEO="me"
      ;;
    
    MD)
      export CRAWLER_GEO="MD"
      export CRAWLER_GEO_LONG="Maldova"
      export CRAWLER_EXPRESSVPN_GEO="md"
      ;;
    
    RS)
      export CRAWLER_GEO="RS"
      export CRAWLER_GEO_LONG="Serbia"
      export CRAWLER_EXPRESSVPN_GEO="rs"
      ;;
    
    GE)
      export CRAWLER_GEO="GE"
      export CRAWLER_GEO_LONG="Georgia"
      export CRAWLER_EXPRESSVPN_GEO="ge"
      ;;
    
    ZA)
      export CRAWLER_GEO="ZA"
      export CRAWLER_GEO_LONG="South Africa"
      export CRAWLER_EXPRESSVPN_GEO="za"
      ;;
    
    IL)
      export CRAWLER_GEO="IL"
      export CRAWLER_GEO_LONG="Israel"
      export CRAWLER_EXPRESSVPN_GEO="il"
      ;;
    
    EG)
      export CRAWLER_GEO="EG"
      export CRAWLER_GEO_LONG="Egypt"
      export CRAWLER_EXPRESSVPN_GEO="eg"
      ;;
    
    KE)
      export CRAWLER_GEO="KE"
      export CRAWLER_GEO_LONG="Kenya"
      export CRAWLER_EXPRESSVPN_GEO="ke"
      ;;
    
    DZ)
      export CRAWLER_GEO="DZ"
      export CRAWLER_GEO_LONG="Algeria"
      export CRAWLER_EXPRESSVPN_GEO="dz"
      ;;
    
    OFF)
      export VPN="OFF"
      export CRAWLER_GEO="US"
      export CRAWLER_GEO_LONG="United States"
      export CRAWLER_EXPRESSVPN_GEO="usla1"
      ;;

    *)
      echo "Unsupported Geo"
      exit 1
      ;;

  esac

}

# Check if Crawler exists
CRAWLER_FILE="./crawler/crawlers/${CRAWLER_MEDIUM}-${CRAWLER_PROVIDER}.js"
if [ ! -f "${CRAWLER_FILE}" ]; then
  echo "Crawler file ${CRAWLER_FILE} does not exist."
  exit 1
fi

# Setup Geo
get_express_vpn_code "$CRAWLER_GEO"

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

if [ "$VPN" = "OFF" ]; then
  docker-compose -f docker-compose-no-vpn.yml up --abort-on-container-exit
else
  docker-compose up --abort-on-container-exit
fi