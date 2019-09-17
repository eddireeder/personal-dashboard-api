FROM node:8

WORKDIR /opt/personal-dashboard

# Copy React app to container
COPY app ./

# Build the React app
RUN cd app && npm build

# Make a directory for this API
RUN mkdir api

COPY api/package.json ./api
COPY api/package-lock.json ./api

# Install NodeJS API dependencies
RUN npm install

# Copy NodeJS API to container
COPY api ./

# Run the server
CMD cd api && node server