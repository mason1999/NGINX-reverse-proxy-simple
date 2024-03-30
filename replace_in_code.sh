#! /usr/bin/bash
TFVARS_FILE="./infrastructure-code/terraform.tfvars"
DATABASE_REDIS_VARIABLE="DATABASE_REDIS_DNS_NAME"
BACKEND_VARIABLE="BACKEND_DNS_NAME"

database_redis_replace() {
    database_redis_input_name=$(cat "${TFVARS_FILE}" | grep "${DATABASE_REDIS_VARIABLE}" | grep -Eo '".*"' | grep -Eo '[^"]+')

    # Update here for more occurences of files where redis needs to be referenced.
    sed -i "s/${DATABASE_REDIS_VARIABLE}/$(echo ${database_redis_input_name})/g" "./app-code/backend/index.js"
    sed -i "s/${DATABASE_REDIS_VARIABLE}/$(echo ${database_redis_input_name})/g" "./app-code/docker-compose.yml" # TODO: delete this after testing because plan to use ACI
}

backend_replace() {
    backend_input_name=$(cat "${TFVARS_FILE}" | grep "${BACKEND_VARIABLE}" | grep -Eo '".*"' | grep -Eo '[^"]+')

    # Update here for more occurences of files where backend needs to be referenced.
    sed -i "s/${BACKEND_VARIABLE}/$(echo ${backend_input_name})/g" "./app-code/docker-compose.yml" # TODO: delete this after testing because plan to use ACI
}


########## BEGIN SCRIPT ##########
getopts "cdh" option
case $option in
    c)
    cp -r "app-code-template" "app-code"
    database_redis_replace
    backend_replace
    ;;

    d)
    rm -rf "app-code"
    ;;

    h)
    help
    ;;

    ?)
    cat << 'EOF'
Illegal option entered. The available options [-c|-d|-h] are:
    -c: Creating and running images and containers
    -d: Stopping and removing images and containers
    -h: Getting help for the script

In the script, we don't use getopts in a while loop, so only the first option will be recognized. That is:
    <script name> -cda : -c will be seen as the parameter
    <script name> -dca : -d will be seen as the parameter
    <script name> -acd : -a will be seen as the parameter
EOF
    ;;
esac
