#!/bin/bash

export DOCKER_NAME=${DOCKER_NAME:=${PWD##*/}}
export BUILD_NUMBER=${BUILD_NUMBER:=1}
export JOB_NAME=${JOB_NAME:=}

# Pull the latest base
docker pull docker.psidox.com/base

docker kill builder$JOB_NAME
docker rm builder$JOB_NAME
docker run -t -v $(pwd):/fs --name builder$JOB_NAME docker.psidox.com/base /bin/bash /fs/build_container.sh
docker commit builder$JOB_NAME docker.psidox.com/$DOCKER_NAME:$BUILD_NUMBER
docker rm builder$JOB_NAME

docker tag docker.psidox.com/$DOCKER_NAME:$BUILD_NUMBER docker.psidox.com/$DOCKER_NAME:latest
