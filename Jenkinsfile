// Configure using microservice-pipelines and using 'master' branch
library identifier: 'dbk-shared-pipeline@master', retriever: modernSCM([$class: 'GitSCMSource', credentialsId: 'dbkGithubServiceAccount', remote: 'https://github.com/ncr-digital-banking/dbk-shared-pipeline', traits: [gitBranchDiscovery()]])
_entry([
    entryType: 'SERVERLESS_REPO',
    APP_NAME: 'dbk-widget-helloworld',
    CLOUD_BUILD_FILE_PATH: ".",
    SLACK_CHANNEL: "epoxy-build",
    BUCKET_NAME: "widgets.dev.cloud.ncrsaas.com",
    UPLOAD_DIR: "dist/dbk-widget-helloworld/*"
])
