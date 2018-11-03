FROM node:10.13.0-alpine
HEALTHCHECK --timeout=1s --retries=99 \
        CMD wget -q --spider http://127.0.0.1:3000/health \
         || exit 1
WORKDIR /src/app
COPY package.* .
RUN npm i && npm cache clean --force
COPY index.js .
CMD npm start
