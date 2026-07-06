FROM node:22-alpine AS base
WORKDIR /app

FROM base AS build
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/package.json /app/./package.json
COPY --from=build /app/dist /app/./dist
COPY --from=build /app/prisma /app/./prisma
COPY --from=build /app/prisma.config.ts /app/./prisma.config.ts
COPY --from=build /app/healthcheck.js /app/./healthcheck.js
EXPOSE 3001
CMD ["sh", "-c", "npx prisma migrate deploy && (node dist/main.js || node dist/src/main.js)"]
