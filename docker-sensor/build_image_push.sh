#!/bin/bash

export DOCKER_NAME=${DOCKER_NAME:=${PWD##*/}}
export BUILD_NUMBER=${BUILD_NUMBER:=1}

docker push docker.psidox.com/$DOCKER_NAME
docker rmi docker.psidox.com/$DOCKER_NAME:$BUILD_NUMBER docker.psidox.com/$DOCKER_NAME

