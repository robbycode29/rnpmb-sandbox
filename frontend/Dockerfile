# Use Node.js 18 LTS
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install deps first (for caching)
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Expose Next.js dev server
EXPOSE 3000

# Default command
CMD ["npm", "run", "dev"]
