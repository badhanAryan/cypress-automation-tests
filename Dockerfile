# Use the Cypress base image
FROM cypress/included:11.2.0

# Set the working directory to /e2e
WORKDIR /e2e

# Copy the test suite from your local machine into the Docker image
COPY . /e2e

# Install the necessary Cypress plugins
RUN npm install --save-dev cypress-wait-until cypress-iframe

# Run Cypress tests
CMD ["npx", "cypress", "run"]
