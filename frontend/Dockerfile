# 1. Base image
FROM node:18-alpine

WORKDIR /app

# 2. Dependencies
COPY package*.json ./
RUN npm install

# 3. Copy code
COPY . .

# 4. Frontend common-ah 3000 port-la run aagum
EXPOSE 3000

CMD ["npm", "start"]