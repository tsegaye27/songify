From node:18
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
EXPOSE 8000
CMD ["node", "src/server.js"]
