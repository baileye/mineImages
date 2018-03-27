# Use Azure Cognitive Services to see what's in your image archive

This repository will cover how to set up a pipeline that will let you test out Azure Cognitive Services to see what's in your image archive. The code and contents here are intended as a sample and proof-of-concept only.

## Scope

- Place images into Blob storage
- Azure function triggered by blob storage reads in images
- Function sends images to Custom Vision API
  - V1: Standard Azure Vision API
  - V2: Trained Custom Vision
- Function writes response to Azure Storage
- Power BI visualises the data
  - "Find all images of a man with a blue background on grass"

## Technologies

- [Blob storage](https://azure.microsoft.com/en-gb/services/storage/blobs/)
- [Azure Functions](https://azure.microsoft.com/en-gb/services/functions/)
- [Vision API](https://azure.microsoft.com/en-gb/services/cognitive-services/computer-vision/)
- [Custom Vision API](https://azure.microsoft.com/en-gb/services/cognitive-services/custom-vision-service/)
- [PowerBI](https://powerbi.microsoft.com/en-us/)

## Repository Contents

### Files

- [package.json](package.json)
  - JSON file that is used as part of the deployment of the Azure Functions
- [vision.js](vision.js)
  - Azure Function code that reads from Blob Storage, calls Azure Cognitive Services, and writes results to Azure Storage
- [customVision.js](customVision.js)
  - Azure Function code that reads from Blob Storage, calls Azure Custom Vision API, and writes results to Azure Storage

# Deployment Steps

## Storage Account

- Create a general purpose storage account in the [Azure Portal](https://portal.azure.com/)
  - Add more detailed steps here...
  - Use V1
  - Storage account name 'azureImageProcessing'
- Create container within storage account
  - Click on 'Blobs'
  - Click on '+Container' and create the following containers: vision, customVision, visionResults, customVisionResults
- Get [Azure Storage Explorer](https://azure.microsoft.com/en-us/features/storage-explorer/)
  - Connect Storage Explorer to your Azure account
  - Open the specific storage account you created above

## Function App

- Create a new Function app using an always-on App service plan (i.e. not the free function app -- this is for demo purposes because we don't want a delay, we could also manually trigger the function, but where's the fun in that)
- To confirm Always On is set you need to have created the function, so we're jumping ahead, but for completeness I put it here for now…
  - Go to the function
  - Click on 'Platform Features' tab
  - Click on 'Application settings'
  - Confirm that 'Always On' is set to 'On'
- Go to your resource group
- Click on the Function
- Click on the '+' to create a new function
  - Create a 'Blob Trigger' function
  - Set the language to Javascript
  - Give it a name 'visionAnalysis'
  - In 'Azure Blob Storage Trigger' -> 'Path' enter the container name: 'vision', ensure the '/{name}' is after this also, the {name} value is the parameter for a new blob
  - Click on 'Storage account connection' -> 'new', and select the storage account created above named 'azureImageProcessing'
  - Click 'Create'
- Copy the code from this github repo to the function
  - Change the keys as needed
- Upload 'package.json' to the site->wwwroot
  - Execute 'npm install' in the Kudu CMD console
  
# TODO

- TODO: Add Cognitive Services deployment steps
- TODO: Add custom vision deployment steps
- TODO: Add custom vision training steps
- TODO: Add screenshots of the deployment process
- TODO: Add PowerBI set up steps
- TODO: Create [ARM template](https://docs.microsoft.com/en-us/azure/azure-functions/functions-infrastructure-as-code) for complete deployment (will require separate repos)


