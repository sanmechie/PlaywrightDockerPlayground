
# Get the base image of Node version 16
FROM node:16

# Get the latest version of Playwright
FROM mcr.microsoft.com/playwright:focal

# Set the work directory for the application
WORKDIR /app

# Set the environment path to node_modules/.bin
ENV PATH /app/node_modules/.bin:$PATH

COPY /package.json /app/
COPY /package-lock.json /app/
COPY /angular.json /app/
COPY /tests/ /app/tests/
COPY src/ /app/src/
COPY /tsconfig.json /app/
COPY /config.toml /app/
COPY /configTypes.ts /app/
COPY /tsconfig.app.json /app/
COPY /proxy.conf.json /app/

# # Get the needed libraries to run Playwright
# RUN apt-get update && apt-get -y install libnss3 libatk-bridge2.0-0 libdrm-dev libxkbcommon-dev libgbm-dev libasound-dev libatspi2.0-0 libxshmfence-dev

# Install the dependencies in Node environment
RUN npm ci

CMD ["ng","serve","--host", "0.0.0.0",  "--port", "4300"]