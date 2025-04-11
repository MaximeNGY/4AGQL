# Use Node.js LTS
FROM node:18

# Set working directory
WORKDIR /app

# Copy everything
COPY . .

# Install dependencies
RUN npm install

# Build TypeScript
RUN npm run build

# Start the server
CMD ["node", "dist/index.js"]
