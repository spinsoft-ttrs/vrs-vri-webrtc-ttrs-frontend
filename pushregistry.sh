#!/bin/sh
docker rmi registry.gitlab.spinsoft.co.th/voip/webrtc_frontend_react:1.9
docker build -t registry.gitlab.spinsoft.co.th/voip/webrtc_frontend_react:1.9 .
docker push registry.gitlab.spinsoft.co.th/voip/webrtc_frontend_react:1.9