---
title: 'Deploying a React Router to Azure App Service'
description: 'Integrate react router with eslint, prettier and vscode'
publishDate: 'May 28 2025'
category: 'react'
tags:
  - react-router
  - eslint
  - prettier
  - azure
  - app service
---

Why is deploying an Azure App Service so difficult these days. There are so many little gotchas that you have to know when you deploy with regards to environment variables, config settings, deployment know-hows. Here is a complete working example that was taking from a project I worked on.

This is a complete example bicep template that can be used to deploy your React Router application to Azure App Service.

Here is the bicep file

```bicep
@description('name of the app service')
param appName string

@description('name of the service plan for the app service')
param appServicePlanName string

@description('name of application insights resource')
param appInsightsName string

@description('the location to deploy to')
param location string

resource appInsights 'Microsoft.Insights/components@2020-02-02' = {
  name: appInsightsName
  location: location
  properties: {
    Application_Type: 'web'
  }
  kind: 'web'
}


resource appServicePlan 'Microsoft.Web/serverfarms@2023-12-01' = {
  name: appServicePlanName
  location: location
  properties: {
    reserved: true
  }
  sku: {
    // F1 is the free plan
    // S1 is the next step up
    name: 'F1'
  }
  kind: 'linux'
}

resource webApp 'Microsoft.Web/sites@2023-12-01' = {
  name: appName
  location: location
  properties: {
    serverFarmId: appServicePlan.id
    httpsOnly: true
    siteConfig: {
      publicNetworkAccess: 'Enabled'
      linuxFxVersion: 'node|20-lts'

      // only enable this when not on the F1 free plan
      // this will enable the app service to run continuously
      // and not go to sleep after 20 minutes of inactivity
      // if you are on the F1 free plan, the app service will go to sleep
      // since only 60mins of compute is allowed per day
      alwaysOn: true
      scmType: 'None'
      appSettings: [
        {
          name: 'WEBSITE_NODE_DEFAULT_VERSION'
          value: '~20'  // Specify the Node.js version you want to use
        }
        {
          // don't run from a zip package. if set to true, that app
          // will not be able to access the file system. also, we would
          // need to zip the node_modules folder and the app code
          // and upload it to the app service which takes more time for
          // deployment
          name:'WEBSITE_RUN_FROM_PACKAGE'
          value: '0'
        }
        {
          // needed for app insights logging
          name: 'APPINSIGHTS_INSTRUMENTATIONKEY'
          value: appInsights.properties.InstrumentationKey
        }
        {
          // needed for app insights logging
          name: 'ApplicationInsightsAgent_EXTENSION_VERSION'
          value: '~3'
        }
        {
          // needed for app insights logging
          name: 'APPLICATIONINSIGHTS_CONNECTION_STRING'
          value: appInsights.properties.ConnectionString
        }
        {
          // For Linux containers, if this app setting isn't specified, the
          // /home directory is shared across scaled instances by default. You
          // can set it to false to disable sharing.
          // For Windows containers, set to true to enable the c:\home directory
          // to be shared across scaled instances. The default is true for
          // Windows containers.
          name:'WEBSITES_ENABLE_APP_SERVICE_STORAGE'
          value: 'true'
        }
        {
          // enables logging in kudu when it starts a docker instance
          // if deployments fail, we can check the logs in kudu
          name: 'DOCKER_ENABLE_CI'
          value: 'true'
        }
        {
          // tell azure app service to npm install the dependencies
          // during deployment. this is needed because we are not running
          // from a zip package and we are not running npm install
          // during the build pipeline
          name: 'SCM_DO_BUILD_DURING_DEPLOYMENT'
          value: 'true'
        }
      ]
    }
  }
}
```

Create a bicep params file called `params.bicepparam`

```bicep
using 'appService.bicep'

param appName = '{your_app_name}'

param appServicePlanName = '{your_app_service_plan_name}'

param appInsightsName = '{your_app_insights_name_here}'

param location = 'westus'
```

Here's how to deploy it using a bash script. Since we created an app service on linux and set the `WEBSITE_RUN_FROM_PACKAGE` value to `0`,
we need to zip our source code. If you are on Windows, you cannot use `Compress-Archive` because all the folders use `\` instead of `/`, which breaks the
linux deployment. Instead you can install GNu Windows command here https://github.com/bmatzelle/gow/wiki. Make sure to add this to PATH "/c/Program Files (x86)/Gow/bin/" or wherever you install GOW.

```bash
#!/bin/bash

set -e

RESOURCE_GROUP="{your_resource_group}"
APP_SERVICE_NAME="{your_app_service_name}"
SUBSCRIPTION="{your_subscription_id}"
ZIP_FILE="app.zip"

echo "Zipping the application..."
rm -rf $ZIP_FILE
zip -rq $ZIP_FILE package.json src package-lock.json react-router.config.ts vite.config.ts tsconfig.json public


echo "Creating/Updating resources on azure..."
DEPLOYMENT_NAME="aia-analytics-ui-$(date +%Y%m%d%H%M%S)"
az deployment group create \
 --subscription $SUBSCRIPTION \
 --resource-group $RESOURCE_GROUP \
 --template-file appService.bicep \
 --parameters params.bicepparam \
 --name $DEPLOYMENT_NAME


echo "Deploying your code..."
az webapp deploy \
 --subscription $SUBSCRIPTION \
 --resource-group $RESOURCE_GROUP \
 --name $APP_SERVICE_NAME \
 --src-path $ZIP_FILE \
 --type zip

echo "✅ Deployment completed successfully!"
```

Now build your application, then deploy it!

```bash
pnpm run build
./deploy.sh
```
