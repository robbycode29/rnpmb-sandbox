# Use Node.js 18 LTS
FROM node:18-alpine

WORKDIR /app

# Install deps first
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy rest of code
COPY . .

# Expose API port
EXPOSE 4000

# Default command for API (will override in worker)
CMD ["npm", "run", "start:dev"]
