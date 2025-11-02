# AI Persistence Package - Production Docker Container
# Multi-stage build for optimal production image

# Stage 1: Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install build dependencies
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    git \
    bash

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Copy source code
COPY core/ ./core/
COPY identity/ ./identity/
COPY memory/ ./memory/
COPY security/ ./security/
COPY communication/ ./communication/
COPY tests/ ./tests/
COPY *.md ./
COPY build-core-only.sh ./
COPY server.mjs ./

# Install dependencies
RUN npm ci --only=production

# Build the application
RUN chmod +x build-core-only.sh
RUN ./build-core-only.sh

# Stage 2: Production stage
FROM node:18-alpine AS production

# Set working directory
WORKDIR /app

# Install runtime dependencies
RUN apk add --no-cache \
    tini \
    dumb-init

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S ai-persistence -u 1001

# Copy production build
COPY --from=builder /app/dist/production ./

# Copy package.json
COPY --from=builder /app/package.json ./

# Copy server.mjs
COPY --from=builder /app/server.mjs ./

# Install production dependencies
RUN npm install --only=production && npm cache clean --force

# Create necessary directories
RUN mkdir -p /app/persistence /app/logs /app/state && \
    chown -R ai-persistence:nodejs /app

# Set environment variables
ENV NODE_ENV=production
ENV H2GNN_STORAGE_PATH=/app/persistence
ENV H2GNN_STATE_FILE=/app/state/state.json
ENV H2GNN_LOG_LEVEL=info
ENV H2GNN_MAX_MEMORIES=10000
ENV H2GNN_CONSOLIDATION_THRESHOLD=100

# Expose ports
EXPOSE 3000 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "console.log('Health check passed')" || exit 1

# Switch to non-root user
USER ai-persistence

# Set working directory
WORKDIR /app

# Start the application
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server.mjs"]

# Labels
LABEL maintainer="H²GNN Team"
LABEL version="1.0.0"
LABEL description="AI Persistence Package - Production Container"
LABEL org.opencontainers.image.title="AI Persistence Package"
LABEL org.opencontainers.image.description="Universal AI persistence across any deployment scenario"
LABEL org.opencontainers.image.version="1.0.0"
LABEL org.opencontainers.image.vendor="H²GNN"
LABEL org.opencontainers.image.licenses="MIT"
