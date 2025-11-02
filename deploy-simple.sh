#!/bin/bash

# Simple Production Deployment Script
set -e

echo "🚀 Starting Simple Production Deployment..."

# Configuration
PRODUCTION_DIR="./dist/production"
ARCHIVE_NAME="ai-persistence-package-production.tar.gz"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

# Clean and build
log_info "Cleaning and building..."
npm run clean
npm run build:core
npm run build:server

# Create production directory
log_info "Creating production directory..."
rm -rf $PRODUCTION_DIR
mkdir -p $PRODUCTION_DIR

# Copy built files
log_info "Copying built files..."
cp dist/index.js $PRODUCTION_DIR/
cp dist/index.d.ts $PRODUCTION_DIR/
cp dist/server.js $PRODUCTION_DIR/
cp dist/server.d.ts $PRODUCTION_DIR/

# Copy core files
if [ -d "dist/core" ]; then
    cp -r dist/core $PRODUCTION_DIR/
fi

# Create production package.json
log_info "Creating production package.json..."
cat > $PRODUCTION_DIR/package.json << 'EOF'
{
  "name": "ai-persistence-package",
  "version": "1.0.0",
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

# Create simple deployment script
cat > $PRODUCTION_DIR/start.sh << 'EOF'
#!/bin/bash
echo "🚀 Starting AI Persistence Server..."
npm start
EOF
chmod +x $PRODUCTION_DIR/start.sh

# Create archive
log_info "Creating production archive..."
cd $PRODUCTION_DIR
tar -czf "../$ARCHIVE_NAME" .
cd ..

# Display summary
log_success "🎉 Simple production deployment completed!"
echo ""
log_info "📦 Production files:"
echo "  📁 Directory: $PRODUCTION_DIR"
echo "  📦 Archive: $ARCHIVE_NAME"
echo ""
log_info "🚀 To deploy:"
echo "  1. Extract: tar -xzf $ARCHIVE_NAME"
echo "  2. Install: npm ci --production"
echo "  3. Start: npm start"
echo ""
log_success "Ready for deployment! 🚀"
