#!/bin/bash

# Defined a variable for the Docker image
IMAGE_NAME="cypress-test-suite"

# Build the image
echo "Building Docker image..."
docker build -t $IMAGE_NAME .

if [ $? -eq 0 ]; then
  echo "Successfully built Docker image."
else
  echo "Docker build failed"
  exit 1
fi

# Run the Cypress tests
echo "Running Cypress tests..."
docker run --rm -v "$PWD:/e2e" -w /e2e $IMAGE_NAME npx cypress run

# Check if Cypress tests ran successfully
if [ $? -eq 0 ]; then
  echo "Cypress tests completed successfully."
else
  echo "Cypress tests failed."
  exit 1
fi

