##BUILD##
FROM node:16-alpine as build

COPY package*.json ./

# clean install of dependencies
RUN npm install

COPY ./ ./

RUN npm run build && npm prune --production

##RUN##
FROM node:16-alpine as production
LABEL org.opencontainers.image.source https://github.com/noblepierre/bot-channel-generator

# Create app directory for node user 
RUN mkdir /bot-channel-generator && \
    chown -R node:node /bot-channel-generator

# Répertoire de base pour toutes les commandes RUN, CMD, ENTRYPOINT, COPY et ADD
WORKDIR /bot-channel-generator

# By default, if you don't specify a USER instruction in your Dockerfile, the image will run using the root permissions.
# This is a security risk, so we'll add a USER instruction to our Dockerfile
# The node image we're using already has a user created for us called node
USER node

COPY --chown=node:node --from=build /dist ./dist
COPY --chown=node:node --from=build /node_modules ./node_modules
COPY --chown=node:node --from=build /package*.json ./

# Many libraries have optimizations built in when the NODE_ENV environment variable is set to production
ENV NODE_ENV production

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]
