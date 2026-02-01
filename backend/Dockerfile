# 1. Base image: Ippo irukkura normal node-ku badhula alpine use panrom
FROM node:18-alpine

# 2. Working directory create panrom
WORKDIR /app

# 3. Dependency files-ai mattum munnadi copy panrom (Build speed-ku)
COPY package*.json ./

# 4. Libraries-ai install panrom
RUN npm install

# 5. Matha ellaa code-aiyum copy panrom
COPY . .

# 6. Backend run aaga vendiya port
EXPOSE 4000

# 7. App-ai start panna command
CMD ["npm", "start"]
