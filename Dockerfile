# Use the Cypress base image
FROM cypress/included:11.2.0

WORKDIR /e2e

# Copying the test suite from local machine into Docker image
COPY . /e2e

# Install Cypress plugins
RUN npm install --save-dev cypress-wait-until cypress-iframe

# Run Cypress tests
CMD ["npx", "cypress", "run"]
