#!/bin/sh
VERSION=3.2
GITREMOTE=registry.gitlab.spinsoft.co.th/ttrs/vrs/frontend/ttrs-vrs-webrtc-frontend-react
docker rmi $GITREMOTE:$VERSION
docker build -t $GITREMOTE:$VERSION .
docker push $GITREMOTE:$VERSION