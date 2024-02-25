# Use the official Azure Functions base image for Node.js
FROM mcr.microsoft.com/azure-functions/node:latest

# Install wget and gnupg
RUN apt-get update && apt-get install -y wget gnupg

# Install Google Chrome Stable
RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list' \
    && apt-get update && apt-get install -y google-chrome-stable

# Set the working directory to /home/site/wwwroot
WORKDIR /home/site/wwwroot

# Copy the function app contents to the container
COPY . .

# Install dependencies
RUN npm install

# Set environment variable for Puppeteer
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# Configure the listening port
ENV AzureWebJobsScriptRoot=/home/site/wwwroot \
    AzureFunctionsJobHost__Logging__Console__IsEnabled=true
