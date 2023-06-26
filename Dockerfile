FROM node:18

# Create and move to /app directory
# This will be the project root
WORKDIR /app

# Copy package.json and package-lock.json, then install packages
COPY package*.json .
RUN npm ci

# Copy production code
COPY api_build ./api_build
COPY react_frontend/build ./react_frontend/build

EXPOSE 3000

ENTRYPOINT ["npm", "run", "serve"]

USER node