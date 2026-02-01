FROM nginx:alpine

# Unga frontend folder-kulla irukura files-ah copy panrom
COPY frontend/ /usr/share/nginx/html/

EXPOSE 80
