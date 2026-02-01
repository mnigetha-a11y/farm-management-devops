# Alpine base image use panrom
FROM alpine:latest

# Working directory set panrom
WORKDIR /app

# Unga project files-ah copy panrom
COPY . .

# Just oru confirmation message
CMD ["echo", "Farm Management App built on Alpine!"]
