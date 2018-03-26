# Use Azure Cognitive Services to see what's in your image archive

This repository will cover how to set up a pipeline that will let you test out Azure Cognitive Services to see what's in your image archive. 

## Scope

- Place images into Blob storage
- Azure function triggered by blob storage reads in images
- Function sends images to Custom Vision API
  - V1: Standard Azure Vision API
  - V2: Trained Custom Vision
- Function writes response to Azure Storage
- Power BI visualises the data
  - "Find all images with Eoin and a horse"

