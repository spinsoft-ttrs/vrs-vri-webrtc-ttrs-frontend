#!/bin/sh
docker build -t registry.gitlab.spinsoft.co.th/voip/webrtc_frontend_react:develop .
docker push registry.gitlab.spinsoft.co.th/voip/webrtc_frontend_react:develop