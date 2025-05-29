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

This is an example bicep template that can be used to deploy your React Router application to Azure App Service.

Here is the bicep file

```bicep
@description('name of the app service')
param appName string

@description('name of the service plan for the app service')
param appServicePlanName string

@description('name of application insights resource')
param appInsightsName string

@description('custom value and an environment variable')
param customEnvironmentVariable string


var location = resourceGroup().location

resource appInsights 'Microsoft.Insights/components@2020-02-02' = {
  name: appInsightsName
  location: location
  properties: {
    Application_Type: 'web'
  }
  kind: 'web'
}


resource appServicePlan 'Microsoft.Web/serverfarms@2021-03-01' = {
  name: appServicePlanName
  location: location
  properties: {
    reserved: true
  }
  sku: {
    name: 'B1'
    tier: 'Basic'
  }
  kind: 'linux'
}

resource webApp 'Microsoft.Web/sites@2021-03-01' = {
  name: appName
  location: location
  properties: {
    serverFarmId: appServicePlan.id
    httpsOnly: true
    siteConfig: {
      publicNetworkAccess: 'Enabled'
      linuxFxVersion: 'node|20-lts'
      alwaysOn: true
      appCommandLine: ''
      scmType: 'None'
      appSettings: [
        {
          name: 'WEBSITE_NODE_DEFAULT_VERSION'
          value: '~20'  // Specify the Node.js version you want to use
        }
        {
          name:'WEBSITE_WEBDEPLOY_USE_SCM'
          value: 'true'
        }
        {
          name:'WEBSITE_RUN_FROM_PACKAGE'
          value: '1'
        }
        {
          name: 'APPINSIGHTS_INSTRUMENTATIONKEY'
          value: appInsights.properties.InstrumentationKey
        }
        {
          name: 'ApplicationInsightsAgent_EXTENSION_VERSION'
          value: '~3'
        }
        {
          name: 'APPLICATIONINSIGHTS_CONNECTION_STRING'
          value: appInsights.properties.ConnectionString
        }
        {
          name: 'CUSTOM_ENVIRONMENT_VARIABLE'
          value: customEnvironmentVariable
        }
        {
          name:'WEBSITES_ENABLE_APP_SERVICE_STORAGE'
          value: 'true'
        }
      ]
    }
  }
}
```

Here's how to deploy it quickly using Azure cli

```bash
az deployment group create \
  --resource-group <your-resource-group-name> \
  --template-file <your-template.bicep>
```
