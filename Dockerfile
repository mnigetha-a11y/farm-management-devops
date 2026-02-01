# Nginx Alpine image-ah use panrom (Very Small Size)
FROM nginx:alpine

# Unga GitHub-la irukura 'frontend' folder-ah Nginx server-kulla copy panrom
COPY ./frontend /usr/share/nginx/html/

# Port 80-ah expose panrom
EXPOSE 80
