#!/bin/sh
echo "Installing Tools"
CLOUD_SDK_VERSION=290.0.1
export PATH=google-cloud-sdk/bin:$PATH
apk --no-cache add \
        curl \
        python3 \
        bash \
        jq \
        coreutils \
        nodejs=12.18.4-r0 \
        yarn \
    && curl -O https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-${CLOUD_SDK_VERSION}-linux-x86_64.tar.gz && \
    tar xzf google-cloud-sdk-${CLOUD_SDK_VERSION}-linux-x86_64.tar.gz && \
    rm google-cloud-sdk-${CLOUD_SDK_VERSION}-linux-x86_64.tar.gz && \
    gcloud config set core/disable_usage_reporting true && \
    gcloud config set component_manager/disable_update_check true && \
    gcloud config set metrics/environment github_docker_image && \
    gcloud --version

gcloud components install kubectl --quiet

echo "Pushing application to GCR"

