# 1. Base image - Node.js version 18 use panrom
FROM node:18-alpine

# 2. Container kulla /app nu oru folder create panni anga velai seiyum
WORKDIR /app

# 3. First package files-a mattum copy panrom (Cachcing-ku nalladhu)
COPY package*.json ./

# 4. Libraries install panrom
RUN npm install

# 5. Matha ellaa backend code-aiyum copy panrom
COPY . .

# 6. Backend run aagura port (Unga code-la 4000 nu sonninga)
EXPOSE 4000

# 7. App-ai start panna command
CMD ["node", "server.js"]
