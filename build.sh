#!/bin/bash
APP_NAME="kestros"
IMAGE_TAG="$APP_NAME-build"
IMAGE_VERSION="alpha"
# Uncomment BUILD_PATH if using this Dockerfile as part of an Ansible deployment
#BUILD_PATH="/tmp/build"
#mkdir $BUILD_PATH
#cd $BUILD_PATH
echo $IMAGE_TAG:$IMAGE_VERSION
docker build -t $IMAGE_TAG:$IMAGE_VERSION .
ID=$(docker create $IMAGE_TAG:$IMAGE_VERSION)
docker cp $ID:/output/ .
docker rm -v $ID
docker rmi $IMAGE_TAG:$IMAGE_VERSION