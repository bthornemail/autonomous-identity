#!/bin/bash

# Simplified AI Persistence Package - Production Deployment Script
# Streamlined deployment with Docker

set -e

echo "🚀 Deploying Simplified AI Persistence Package to Production..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create environment file if it doesn't exist
if [ ! -f .env ]; then
    print_status "Creating environment file..."
    cat > .env << EOF
# Simplified AI Persistence Package - Production Environment
NODE_ENV=production
H2GNN_STORAGE_PATH=/app/persistence
H2GNN_STATE_FILE=/app/state/state.json
H2GNN_LOG_LEVEL=info
H2GNN_MAX_MEMORIES=10000
H2GNN_ENCRYPTION_KEY=$(openssl rand -hex 32)
EOF
    print_success "Environment file created with secure random encryption key"
fi

# Load environment variables
source .env

# Build the simplified application
print_status "Building simplified AI persistence package..."
./build-simplified.sh

# Build Docker images
print_status "Building Docker images..."
docker-compose -f docker-compose.simplified.yml build --no-cache

# Start services
print_status "Starting services..."
docker-compose -f docker-compose.simplified.yml up -d

# Wait for services to be ready
print_status "Waiting for services to be ready..."
sleep 30

# Check service health
print_status "Checking service health..."

# Check AI Persistence service
if docker-compose -f docker-compose.simplified.yml ps ai-persistence-simplified | grep -q "Up"; then
    print_success "AI Persistence service is running"
else
    print_error "AI Persistence service failed to start"
    docker-compose -f docker-compose.simplified.yml logs ai-persistence-simplified
    exit 1
fi

# Check Nginx
if docker-compose -f docker-compose.simplified.yml ps nginx | grep -q "Up"; then
    print_success "Nginx service is running"
else
    print_error "Nginx service failed to start"
    docker-compose -f docker-compose.simplified.yml logs nginx
    exit 1
fi

# Test API endpoints
print_status "Testing API endpoints..."

# Test health endpoint
if curl -f http://localhost/health > /dev/null 2>&1; then
    print_success "Health endpoint is responding"
else
    print_warning "Health endpoint is not responding"
fi

# Display deployment summary
echo ""
print_success "🎉 Simplified AI Persistence Package Deployment Complete!"
echo ""
echo "📊 Deployment Summary:"
echo "  ✅ AI Persistence Core: RUNNING"
echo "  ✅ Nginx Reverse Proxy: RUNNING"
echo "  ✅ File-Based Storage: CONFIGURED"
echo "  ✅ State Persistence: ENABLED"
echo ""
echo "🌐 Service URLs:"
echo "  🔗 AI Persistence API: http://localhost/api"
echo "  🔗 Health Check: http://localhost/health"
echo ""
echo "🔐 Security Information:"
echo "  🔑 Encryption Key: ${H2GNN_ENCRYPTION_KEY:0:16}..."
echo ""
echo "📝 Useful Commands:"
echo "  📋 View logs: docker-compose -f docker-compose.simplified.yml logs -f"
echo "  📋 View specific service logs: docker-compose -f docker-compose.simplified.yml logs -f ai-persistence-simplified"
echo "  📋 Stop services: docker-compose -f docker-compose.simplified.yml down"
echo "  📋 Restart services: docker-compose -f docker-compose.simplified.yml restart"
echo "  📋 Update services: docker-compose -f docker-compose.simplified.yml pull && docker-compose -f docker-compose.simplified.yml up -d"
echo ""
echo "🚀 Simplified AI Persistence Package is ready for production use!"
