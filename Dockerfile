# Use the official Node.js 16 image as a parent image
FROM node:16-slim

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json (or npm-shrinkwrap.json) from your project into the /app directory in the container
COPY package*.json ./

# Install Puppeteer dependencies
RUN apt-get update && apt-get install -yq \
    gconf-service \
    libasound2 \
    libatk1.0-0 \
    libc6 \
    libcairo2 \
    libcups2 \
    libdbus-1-3 \
    libexpat1 \
    libfontconfig1 \
    libgcc1 \
    libgconf-2-4 \
    libgdk-pixbuf2.0-0 \
    libglib2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libstdc++6 \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxss1 \
    libxtst6 \
    ca-certificates \
    fonts-liberation \
    libappindicator1 \
    libnss3 \
    lsb-release \
    xdg-utils \
    wget \
    && apt-get clean && apt-get autoremove -y && rm -rf /var/lib/apt/lists/*

# Install node modules including Puppeteer
RUN npm install

# Copy the rest of your application's source code from your project's current directory into the container at /app
COPY . .

# Inform Docker that the container is listening on the specified port at runtime.
EXPOSE 8080

# Run the command "node src/index.js" inside your container without a shell.
CMD ["node", "src/index.js"]
