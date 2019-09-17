FROM node:8

WORKDIR /opt/personal-dashboard

# Copy React app to container
COPY client ./client

# Build the React app
RUN cd client && npm install && npm run build

# Make a directory for the NodeJS server
RUN mkdir server

COPY server/package.json ./server
COPY server/package-lock.json ./server

# Install server dependencies
RUN cd server && npm install

# Copy NodeJS server to container
COPY server ./server

# Expose port
EXPOSE 80

# Run the server
CMD cd server && node server