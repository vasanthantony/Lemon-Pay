# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Compile TypeScript
RUN npx tsc

# Expose port
EXPOSE 5000

# Start the backend (now running the compiled JavaScript)
CMD ["node", "dist/index.js"]
