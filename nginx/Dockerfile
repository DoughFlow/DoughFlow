FROM nginx
LABEL org.opencontainers.image.source https://github.com/DoughFlow/DoughFlow

COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
