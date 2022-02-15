#!/bin/sh
VERSION=develop
GITREMOTE=registry.gitlab.spinsoft.co.th/ttrs/vrs/frontend/ttrs-vrs-webrtc-frontend-react
docker build -t $GITREMOTE:$VERSION .
docker push $GITREMOTE:$VERSION