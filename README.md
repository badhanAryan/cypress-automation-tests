# End-to-End Automation Tests with Cypress

This repository contains a suite of end-to-end (e2e) automated test scripts for the web application developed by Buying Labs. The tests are written using Cypress, a robust testing framework that allows for easy writing, running, and debugging of integration tests.

## Test Scripts

The test scripts are designed to cover critical functionalities of the web application, ensuring a high-quality user experience:

- `cart_checkout.cy.js`: This script tests the complete flow of adding items to the shopping cart, creating new account while checkout and proceeding through the checkout process. It's crucial to ensure that users can purchase items without any disruptions, which directly impacts the business's revenue and customer satisfaction.

- `navigation.cy.js`: This script verifies the website's navigation, including the responsiveness of menu links and buttons. Navigation is a core aspect of user interaction, and any issues here could lead to a poor user experience and potentially lost sales.

- `sorting.cy.js`: This script checks the sorting functionality, which is an essential feature for users who want to find products based on specific criteria. Correct sorting functionality helps users to efficiently find the products they're interested in, improving the overall usability of the application.

## Getting Started

To run these tests, you will need to have Cypress installed and configured on your machine. Below are the steps to set up Cypress.

## Installation of Cypress

* Node.js is required. Install Node.js 14 or above and it will include npm (node package manager)

* If you are using Linux next install some Debian package dependencies as seen here (https://docs.cypress.io/guides/getting-started/installing-cypress#System-requirements)

* Run `npm install cypress --save-dev` or `yarn add cypress --dev` if you use yarn package manager

* Run `npm init` or have a node_modules folder or package.json file in the root of your project to ensure cypress is installed in the correct directory.

* Now you are able to run **npx cypress open --e2e** and it will launch a Cypress Test Runner.

* To run the test headless mode or without the cypress gui please write `npx cypress run --e2e` / `npx cypress run --e2e cypress/e2e/filename.cy.js` on the terminal.


## Usage of cypress

* After adding a new project, Cypress will autmatically establish a folder structure.
* To run the test on different environment, please change the URL inside **cypress.config.js**
* All the test scripts are located in **cypress/e2e** folder with the extension of **.cy.js**
* Any tables downloaded while testing will be stored in **cypress/downloads** folder which is set by default.
* Every custom commands are written inside **cypress/support/commands.js**. This file runs before every single spec file.


## Packages/plugin required for use the automation testing

* install **ccypress-wait-until** packages
* install **cypress-iframe** with npm
