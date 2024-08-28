FROM public.ecr.aws/docker/library/node:18-alpine AS base
WORKDIR /base

ARG BUILD_ENV

# install additional linux packages
RUN apk add --no-cache libc6-compat

# Install pnpm
RUN npm install -g pnpm

# Make env files
COPY .env.* ./
RUN rm -rf .env
RUN if [ -z "$BUILD_ENV" ] ; then \
    echo "dev"; \
    rm -rf .env.production; \
    rm -rf .env.local; \
    mv .env.development .env ; \
  else \
    echo "prd"; \
    rm -rf .env.development; \
    rm -rf .env.local; \
    mv .env.production .env ; \
    rm public/swagger.json; \
    echo "HIDE_API_DOCS=true" >> .env; \
  fi


FROM base AS dependencies
WORKDIR /dep

COPY package.json pnpm-lock.yaml ./
# 패치가 있는경우 아래 주석 해제
#COPY patches ./patches
COPY --from=base /base/.env ./

#RUN ls -al
RUN pnpm install


FROM base AS build
WORKDIR /build

# 빌드에 필요한 파일을 복사합니다.
COPY tsconfig.json package.json next.config.js ./
#COPY patches ./patches
#COPY prisma ./prisma
COPY src ./src
# 아이콘 svg 파일 빌드에 포함
COPY public/assets/images/icons ./public/assets/images/icons

COPY --from=dependencies /dep/node_modules ./node_modules
COPY --from=base /base/.env ./

RUN pnpm run build
RUN pnpm prune --prod

#ARG CACHEBUST=1
#RUN ls -al


FROM base AS deploy
WORKDIR /app

COPY --from=build /build/.next ./.next
COPY --from=build /build/node_modules ./node_modules
COPY --from=base /base/.env ./
COPY public/ ./public/
COPY package.json ./
#
#ARG CACHEBUST=1
#RUN ls -al
#
#
EXPOSE 3200
CMD ["pnpm", "start"]
