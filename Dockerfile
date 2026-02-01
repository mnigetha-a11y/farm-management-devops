# Nginx use panna thaan app browser-la live-ah run aagum
FROM nginx:alpine

# Unga project files-ah Nginx server folder-kulla copy panrom
COPY . /usr/share/nginx/html/

# Port 80-ah container-kaaga open panrom
EXPOSE 80
