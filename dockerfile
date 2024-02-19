FROM node:latest

# # Set the working directory inside the container
# WORKDIR /app

# Copy the contents of the local directory to the container at /app
COPY . .

# Verify npm cache
RUN npm cache verify

# Install dependencies
RUN npm install --force

# Expose port 4000
EXPOSE 4000

# Command to run your application
CMD ["node", "index.js"]