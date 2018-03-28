# Use Azure Cognitive Services and find out what's in your image archive

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
- [PowerBI](https://powerbi.microsoft.com/en-us/) - currently Windows only as using Power BI Desktop

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

  ## Cognitive Services
  
- Get a [Cognitive Services API Key](https://azure.microsoft.com/en-gb/try/cognitive-services/)
  - In the 'vision.js' set the variable 'visionApiKey' to the API key you get when you register

## Function App

- Create a new Function app using an always-on App service plan
- To confirm Always On... Always On ensure instance execution of the trigger, but is more expensive. For demo and PoC use Always On to see results more quickly.
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
- Create the output trigger to Azure blog storage
  - On the newly created function click on 'Integrate'
  - For Outputs select 'New Output' and choose 'Azure Blob Storage'
  - Set the 'Path' to 'visionResults/{name}\_{sys.utcNow:yyyy-MM-dd_hh-mm-ss}.csv'
  - Select the Storage account 'azureImageProcessing' from the Storage Account connection dropdown
  - Click on 'Save'
- Copy the code from this github repo to the function file 'index.js' which you can edit in the function
  - The file 'vision.js' is the standard Azure Vision API code
  - Ensure you have changed the value for 'visionApiKey'
- Upload 'package.json' to the site->wwwroot
  - Visit the 'Platofrm Features' tab in the Azure Function
  - Click on 'Advanced tools (Kudu)'
  - Navigate to 'Debug Console'->'CMD'
  - Click on 'site'->'wwwroot'
  - Drag and drop the 'package.json' file to the browser window
  - In the browser window cmd console, execute 'npm install'
- From this point on, uploading an image to the Azure storage container 'vision' will trigger the function, which will call the cognitive services API, and write the results to a CSV file in the Azure Storage container 'visionResults'
- From here you can analyse and view this data however you want. Read on to see how to use PowerBi to start analysiing this data in your Storage account

## PowerBi

- Coming soon...

- Download [PowerBI Desktop](https://powerbi.microsoft.com/en-us/desktop/)
- Install PowerBI desktop
- Connect PowerBI to the Azure Storage account above, using the 'visionResults' container
- Create the reports...
  - ...

## Custom Vision API

- Coming soon...

- Create a (Custom Vision API](https://azure.microsoft.com/en-gb/services/cognitive-services/custom-vision-service/)
- Create a new project
- Set up the question/problem
- Train the Custom Vision API
  - Change answers with test images to train the Machine Learning model
- Copy the Custom Vsion Project ID and custom vision API key to 'customVision.js'
- Create a new function in the same function app created above, set up the input triggers and output triggers using the containers 'customVision' and 'customVisionResults' respectively.
- Copy the 'customVision.js' file to the new function, using the same steps as above
- Images copied to 'customVision' container will now show the results in the 'customVisionResults' container
- PowerBI report setup for Custom Vision coming soon....

# TODO

- TODO: Add custom vision deployment steps
- TODO: Add custom vision training steps
- TODO: Add screenshots of the deployment process
- TODO: Add PowerBI set up steps
- TODO: Create [ARM template](https://docs.microsoft.com/en-us/azure/azure-functions/functions-infrastructure-as-code) for complete deployment (will require separate repos)


