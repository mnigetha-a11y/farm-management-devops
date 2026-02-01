FROM nginx:alpine

# Puriyura maari sollanum na: frontend folder-kulla irukkura 
# index.html-ah sariyaa nginx-oda default folder-ku thallu nu solrom.
COPY frontend/index.html /usr/share/nginx/html/index.html

EXPOSE 80
