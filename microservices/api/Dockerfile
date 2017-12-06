FROM mhart/alpine-node:7.6.0

# Add app source files
ADD src /src

WORKDIR /src

#install node modules
RUN npm install

CMD ["node", "server.js"]
