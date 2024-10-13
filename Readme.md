# Management-Service

The **management-service** is a Node.js application that retrieves order messages from RabbitMQ and exposes a REST API for the store-admin web app to view orders. The service is integrated with RabbitMQ, and it follows the first four principles of the 12-Factor App methodology.

## Features

- Retrieves order messages from RabbitMQ.
- Exposes a REST API for viewing orders.
- Includes a `.http` file to allow easy API testing using VS Code’s REST client.
- Follows 12-Factor App principles for deployment and configuration.

## Setup Instructions

### 1. Prerequisites

- **Node.js**: Ensure Node.js is installed on your machine. You can download it [here](https://nodejs.org/en/download/).
- **RabbitMQ**: RabbitMQ must be installed and running locally or on an Azure VM.

### 2. Clone the Repository

```bash
git clone https://github.com/your-username/management-service.git
cd management-service
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Create a .env file in the root of the project and configure the following environment variables:
```bash
`# RabbitMQ connection string
RABBITMQ_CONNECTION_STRING=amqp://newuser:newpassword@localhost:5672/
```

# Port for the management-service to listen on
```bash
PORT=4000
```

### 5. Running the Service Locally

To start the management-service locally, use the following command:

```bash
`node index.js`
```
The service will run on `http://localhost:4000` and will automatically receive and log orders from RabbitMQ.

### 6. Testing the API Endpoints

Use the included `.http` file to test the API endpoints using VS Code's built-in REST client.

-   Open `service.http` in VS Code.
-   Use the "Send Request" option to test the API and view the orders retrieved from RabbitMQ.

Deployment to Azure
-------------------

### 1\. Create an Azure Web App

1.  Go to the [Azure Portal](https://portal.azure.com).
2.  Create a new Web App.
3.  Set up the deployment source to your GitHub repository.

### 2\. Configure Azure Environment Variables

In the Azure Web App configuration, set the following environment variables:

-   `RABBITMQ_CONNECTION_STRING`
-   `PORT`
Make sure to give correct connection string and port
Ensure both RabbitMQ and the order-service are already connected and running (locally or on Azure).

### 3. CI/CD Pipeline with GitHub Actions

This repository includes a CI/CD pipeline in the `.github/workflows` folder. The pipeline automates the deployment process to Azure Web App Service. Once the service is successfully deployed, verify the deployment by checking the logs in the Azure portal.

### 4. Post-Deployment Clean-up

After verifying the deployment, delete the Azure resources to minimize costs, but ensure that the `.github/workflows` folder remains in the repository.

Testing the Service
-------------------

You can test the service by:

1.  Sending orders from the order-service to RabbitMQ (either locally or on Azure).
2.  Verifying that the orders are received and displayed by the management-service.
3.  Using the `.http` file to check the API responses.

Compliance with 12-Factor App
-----------------------------

1.  **Codebase**: The codebase is tracked in a single Git repository.
2.  **Dependencies**: All dependencies are declared in the `package.json` file.
3.  **Configuration**: Configuration settings are stored in environment variables.
4.  **Backing Services**: RabbitMQ is treated as an external backing service and is connected via the environment variable.
