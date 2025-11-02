#!/bin/bash

# AI Persistence Package - Production Deployment Script
# This script deploys the autonomous-identity package to production

set -e

echo "🚀 Starting AI Persistence Package Production Deployment..."

# Configuration
PACKAGE_NAME="ai-persistence-package"
VERSION="1.0.0"
BUILD_DIR="./dist"
PRODUCTION_DIR="./dist/production"
ARCHIVE_NAME="${PACKAGE_NAME}-production.tar.gz"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    log_error "package.json not found. Please run this script from the package root directory."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    log_error "Node.js is not installed. Please install Node.js 18+ to continue."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    log_error "Node.js version 18+ is required. Current version: $(node --version)"
    exit 1
fi

log_info "Node.js version: $(node --version)"

# Clean previous builds
log_info "Cleaning previous builds..."
rm -rf $BUILD_DIR
rm -rf $PRODUCTION_DIR

# Install dependencies
log_info "Installing dependencies..."
npm ci --production

# Run build process
log_info "Running production build..."
npm run build

# Check if build was successful
if [ ! -d "$BUILD_DIR" ]; then
    log_error "Build failed. dist directory not found."
    exit 1
fi

# Create production directory
log_info "Creating production directory..."
mkdir -p $PRODUCTION_DIR

# Copy production files
log_info "Copying production files..."
cp -r $BUILD_DIR/* $PRODUCTION_DIR/ 2>/dev/null || true
# Copy specific files, avoiding the production subdirectory
find $BUILD_DIR -maxdepth 1 -type f -exec cp {} $PRODUCTION_DIR/ \;
find $BUILD_DIR -maxdepth 1 -type d -not -path "$BUILD_DIR/production" -exec cp -r {} $PRODUCTION_DIR/ \;

# Copy essential files
cp package.json $PRODUCTION_DIR/
cp README.md $PRODUCTION_DIR/ 2>/dev/null || true
cp LICENSE $PRODUCTION_DIR/ 2>/dev/null || true

# Create production package.json
log_info "Creating production package.json..."
cat > $PRODUCTION_DIR/package.json << EOF
{
  "name": "$PACKAGE_NAME",
  "version": "$VERSION",
  "description": "AI Persistence and Identity Package - Production Build",
  "type": "module",
  "main": "./index.js",
  "module": "./index.js",
  "types": "./index.d.ts",
  "exports": {
    ".": {
      "import": "./index.js",
      "types": "./index.d.ts"
    },
    "./server": {
      "import": "./server.js",
      "types": "./server.d.ts"
    }
  },
  "files": [
    "**/*"
  ],
  "scripts": {
    "start": "node server.js",
    "start:dev": "node --watch server.js",
    "health": "curl -s http://localhost:3000/health",
    "status": "curl -s http://localhost:3000/status"
  },
  "engines": {
    "node": ">=18.0.0"
  },
  "dependencies": {
    "uuid": "^13.0.0"
  },
  "license": "MIT"
}
EOF

# Create production archive
log_info "Creating production archive..."
cd $PRODUCTION_DIR
tar -czf "../$ARCHIVE_NAME" .
cd ..

# Create deployment script
log_info "Creating deployment script..."
cat > $PRODUCTION_DIR/deploy.sh << 'EOF'
#!/bin/bash

# Production deployment script
set -e

echo "🚀 Deploying AI Persistence Package..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ to continue."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node --version)"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --production

# Start the server
echo "🚀 Starting AI Persistence Server..."
npm start
EOF

chmod +x $PRODUCTION_DIR/deploy.sh

# Create Docker configuration
log_info "Creating Docker configuration..."
cat > $PRODUCTION_DIR/Dockerfile << 'EOF'
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --production

# Copy application files
COPY . .

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Start the application
CMD ["npm", "start"]
EOF

# Create docker-compose for production
cat > $PRODUCTION_DIR/docker-compose.prod.yml << 'EOF'
version: '3.8'

services:
  ai-persistence:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
      - HOST=0.0.0.0
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
EOF

# Create systemd service file
log_info "Creating systemd service file..."
cat > $PRODUCTION_DIR/ai-persistence.service << 'EOF'
[Unit]
Description=AI Persistence Package
After=network.target

[Service]
Type=simple
User=ai-persistence
WorkingDirectory=/opt/ai-persistence
ExecStart=/usr/bin/node server.js
Restart=always
RestartSec=10
Environment=NODE_ENV=production
Environment=PORT=3000
Environment=HOST=0.0.0.0

[Install]
WantedBy=multi-user.target
EOF

# Create health check script
log_info "Creating health check script..."
cat > $PRODUCTION_DIR/health-check.sh << 'EOF'
#!/bin/bash

# Health check script for AI Persistence Package
HEALTH_URL="http://localhost:3000/health"
STATUS_URL="http://localhost:3000/status"

echo "🔍 Checking AI Persistence Package health..."

# Check health endpoint
if curl -s -f "$HEALTH_URL" > /dev/null; then
    echo "✅ Health check passed"
    curl -s "$HEALTH_URL" | jq .
else
    echo "❌ Health check failed"
    exit 1
fi

# Check status endpoint
if curl -s -f "$STATUS_URL" > /dev/null; then
    echo "✅ Status check passed"
    curl -s "$STATUS_URL" | jq .
else
    echo "❌ Status check failed"
    exit 1
fi

echo "🎉 All checks passed!"
EOF

chmod +x $PRODUCTION_DIR/health-check.sh

# Create README for production
log_info "Creating production README..."
cat > $PRODUCTION_DIR/README.md << 'EOF'
# AI Persistence Package - Production

This is the production build of the AI Persistence Package.

## Quick Start

### Using npm
```bash
npm start
```

### Using Docker
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Using systemd
```bash
sudo cp ai-persistence.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable ai-persistence
sudo systemctl start ai-persistence
```

## Health Checks

### Manual Health Check
```bash
./health-check.sh
```

### API Endpoints
- Health: `GET /health`
- Status: `GET /status`
- Identities: `GET /api/identities`
- Memories: `GET /api/memories`

## Configuration

Environment variables:
- `NODE_ENV`: production
- `PORT`: 3000 (default)
- `HOST`: 0.0.0.0 (default)

## Monitoring

The service includes built-in health checks and monitoring endpoints.

## Support

For issues and support, please refer to the main documentation.
EOF

# Display build summary
log_success "🎉 Production deployment completed successfully!"

echo ""
log_info "📊 Build Summary:"
echo "  ✅ TypeScript compilation: PASSED"
echo "  ✅ Core package build: COMPLETED"
echo "  ✅ Server build: COMPLETED"
echo "  ✅ Production bundle: CREATED"
echo "  ✅ Docker configuration: CREATED"
echo "  ✅ Systemd service: CREATED"
echo "  ✅ Health checks: CONFIGURED"

echo ""
log_info "📦 Build Artifacts:"
echo "  📁 Production directory: $PRODUCTION_DIR"
echo "  📦 Production archive: $ARCHIVE_NAME"
echo "  🐳 Docker configuration: $PRODUCTION_DIR/Dockerfile"
echo "  🔧 Systemd service: $PRODUCTION_DIR/ai-persistence.service"

echo ""
log_info "🚀 Deployment Options:"
echo "  1. Direct deployment: cd $PRODUCTION_DIR && ./deploy.sh"
echo "  2. Docker deployment: cd $PRODUCTION_DIR && docker-compose -f docker-compose.prod.yml up -d"
echo "  3. Systemd deployment: sudo cp $PRODUCTION_DIR/ai-persistence.service /etc/systemd/system/ && sudo systemctl start ai-persistence"

echo ""
log_success "🎉 AI Persistence Package Production Deployment Complete!"
echo ""
log_info "Ready for deployment! 🚀"