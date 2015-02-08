#!/bin/bash

# Kill currently running instance, back it up to google drive, delete it 
ssh root@${HOST} "docker commit ${DOCKER_NAME} ${DOCKER_NAME}_backup_${BUILD_NUMBER_OLD}; docker rmi docker.psidox.com/${DOCKER_NAME}:${BUILD_NUMBER_OLD}" || echo ok
ssh root@${HOST} "docker save ${DOCKER_NAME}_backup_${BUILD_NUMBER_OLD} | gzip -9 > ${DOCKER_NAME}_backup_${BUILD_NUMBER_OLD}.tar.gz; docker rmi ${DOCKER_NAME}_backup_${BUILD_NUMBER_OLD}; cp ${DOCKER_NAME}_backup_${BUILD_NUMBER_OLD}.tar.gz /gdrive/backup/docker; rm ${DOCKER_NAME}_backup_${BUILD_NUMBER_OLD}.tar.gz" || echo ok

