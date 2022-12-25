
# START DEPS IMAGE

FROM node:16-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./


RUN npm i

# END DEPS IMAGE

# START BUILD IMAGE

FROM node:16-alpine AS build
WORKDIR /app
ARG SENTRY_AUTH_TOKEN_ARG

COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV SENTRY_AUTH_TOKEN=$SENTRY_AUTH_TOKEN_ARG
ENV DATABASE_URL=$DATABASE_URL
RUN apk update && apk add openssl1.1-compat
RUN npm run prisma-generate
RUN npm run build

# END BUILD IMAGE

# START RUNNER IMAGE

FROM node:16-alpine AS runner

ENV NODE_ENV production
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
RUN apk update && apk add curl
RUN apk update && apk add openssl1.1-compat

WORKDIR /app
COPY --from=build --chown=nextjs:nodejs /app ./
COPY --from=build --chown=nextjs:nodejs /app/.bin/app_run.sh ./app_run.sh

USER nextjs

EXPOSE 3000
CMD sh ./app_run.sh

# END RUNNER IMAGE
