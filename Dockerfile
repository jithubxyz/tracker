FROM node:10-alpine as build

WORKDIR /app

# Copy dependency-related files and install deps
COPY package.json yarn.lock /app/
RUN yarn install

# Copy build-related files and build app
COPY tsconfig.json /app
COPY ./src /app/src
RUN yarn build

FROM node:10-alpine

WORKDIR /app


# Copy dependency-related files, install production deps
COPY --from=build /app/package.json /app/yarn.lock /app/
RUN yarn install --production

# Copy code-related files
COPY --from=build /app/tsconfig.json /app/
COPY --from=build /app/build /app/build

# Configure and run app
EXPOSE 4000
CMD node build
