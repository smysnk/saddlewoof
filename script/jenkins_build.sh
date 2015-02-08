#!/bin/bash

cp backend/target/service.war docker/wildfly/standalone/deployments/
/bin/bash script/build.sh
cd docker
/bin/bash build_image.sh
/bin/bash build_image_push.sh


# Pull down the newest instance, run it
ssh root@${HOST} "docker pull docker.psidox.com/${DOCKER_NAME}:${BUILD_NUMBER};"
ssh root@${HOST} "docker kill ${DOCKER_NAME}; docker rm ${DOCKER_NAME}; docker rmi docker.psidox.com/${DOCKER_NAME}:${BUILD_NUMBER_OLD};" || echo ok
ssh root@${HOST} "docker run -d -t --name $DOCKER_NAME -p $PORT:22 docker.psidox.com/${DOCKER_NAME}:${BUILD_NUMBER} /bin/bash bootstrap.sh"