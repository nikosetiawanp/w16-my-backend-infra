# Use Node.js 14 as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

RUN npm run build

# Expose port 3000 for the application
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:prod"]


# FROM node:alpine

# WORKDIR /app

# COPY package*.json ./
# COPY package-lock.json ./

# RUN npm install

# COPY . .

# ENV PORT=3000

# EXPOSE 3000

# CMD ['npm', "run", "start:prod"]