FROM node:alpine
HEALTHCHECK --timeout=1s --retries=66 \
        CMD wget -q --spider http://127.0.0.1:3000 \
         || exit 1
WORKDIR /src/app
COPY package.json package-lock.json ./
RUN npm i && npm cache clean --force
COPY ./ ./
CMD npm start
