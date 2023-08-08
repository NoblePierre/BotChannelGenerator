#! /bin/bash

VERSION=$(jq -r .version package.json)
PACKAGE_NAME=$(jq -r .name package.json)
WORKSPACE="noblepierre"

docker build -f ./Dockerfile -t $WORKSPACE/$PACKAGE_NAME:$VERSION ./ 
docker tag $WORKSPACE/$PACKAGE_NAME:$VERSION $WORKSPACE/$PACKAGE_NAME:latest