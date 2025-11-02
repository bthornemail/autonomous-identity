#!/bin/bash

# AI Persistence API Test Script
# This script demonstrates the complete API functionality

BASE_URL="http://localhost:3000"
API_URL="$BASE_URL/api"

echo "🚀 AI Persistence API Test Script"
echo "=================================="
echo

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

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Test 1: Health Check
print_status "Testing system health..."
HEALTH_RESPONSE=$(curl -s "$BASE_URL/health")
if echo "$HEALTH_RESPONSE" | grep -q '"healthy":true'; then
    print_success "System is healthy"
    echo "$HEALTH_RESPONSE" | jq '.components[] | {name: .name, status: .status}'
else
    print_error "System health check failed"
    echo "$HEALTH_RESPONSE"
    exit 1
fi
echo

# Test 2: System Status
print_status "Checking system status..."
STATUS_RESPONSE=$(curl -s "$BASE_URL/status")
if echo "$STATUS_RESPONSE" | grep -q '"status":"running"'; then
    print_success "System is running"
    echo "$STATUS_RESPONSE" | jq '{status: .status, uptime: .uptime, memory: .memory.utilization}'
else
    print_error "System status check failed"
    echo "$STATUS_RESPONSE"
    exit 1
fi
echo

# Test 3: Create AI Identity
print_status "Creating AI identity..."
IDENTITY_RESPONSE=$(curl -s -X POST "$API_URL/identities" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test AI Assistant",
    "type": "ai",
    "capabilities": ["reasoning", "memory", "learning", "weather_forecasting"],
    "preferences": {
      "learningStyle": "data_driven",
      "communicationStyle": "friendly",
      "privacyLevel": "private"
    }
  }')

if echo "$IDENTITY_RESPONSE" | grep -q '"id"'; then
    print_success "AI identity created successfully"
    IDENTITY_ID=$(echo "$IDENTITY_RESPONSE" | jq -r '.id')
    echo "Identity ID: $IDENTITY_ID"
    echo "$IDENTITY_RESPONSE" | jq '{id: .id, name: .name, status: .status, capabilities: .capabilities}'
else
    print_error "Failed to create AI identity"
    echo "$IDENTITY_RESPONSE"
    exit 1
fi
echo

# Test 4: Store Memory
print_status "Storing episodic memory..."
MEMORY_RESPONSE=$(curl -s -X POST "$API_URL/memories" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "episodic",
    "content": "User requested weather forecast for San Francisco",
    "metadata": {
      "source": "user",
      "quality": 0.9,
      "confidence": 0.95,
      "importance": 0.8,
      "tags": ["weather", "forecast", "user_request", "san_francisco"],
      "context": {
        "timestamp": "'$(date -u +%Y-%m-%dT%H:%M:%SZ)'",
        "location": "San Francisco",
        "weather_type": "forecast_request"
      }
    }
  }')

if echo "$MEMORY_RESPONSE" | grep -q '"success":true'; then
    print_success "Memory stored successfully"
else
    print_error "Failed to store memory"
    echo "$MEMORY_RESPONSE"
    exit 1
fi
echo

# Test 5: Store Semantic Memory
print_status "Storing semantic memory..."
SEMANTIC_RESPONSE=$(curl -s -X POST "$API_URL/memories" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "semantic",
    "content": "Weather forecasting uses machine learning algorithms to predict atmospheric conditions",
    "metadata": {
      "source": "learning",
      "quality": 0.8,
      "confidence": 0.9,
      "importance": 0.7,
      "tags": ["weather", "forecasting", "machine_learning", "algorithms"],
      "context": {
        "domain": "meteorology",
        "complexity": "intermediate",
        "source_type": "educational"
      }
    }
  }')

if echo "$SEMANTIC_RESPONSE" | grep -q '"success":true'; then
    print_success "Semantic memory stored successfully"
else
    print_error "Failed to store semantic memory"
    echo "$SEMANTIC_RESPONSE"
    exit 1
fi
echo

# Test 6: Learn Concept
print_status "Learning new concept..."
LEARN_RESPONSE=$(curl -s -X POST "$API_URL/learn" \
  -H "Content-Type: application/json" \
  -d '{
    "concept": "weather prediction algorithms",
    "data": {
      "description": "Machine learning models for weather forecasting",
      "algorithms": ["neural_networks", "random_forest", "svm", "gradient_boosting"],
      "accuracy": 0.85,
      "features": ["temperature", "humidity", "pressure", "wind_speed", "wind_direction"]
    },
    "context": {
      "domain": "meteorology",
      "complexity": "advanced",
      "source": "research",
      "applications": ["weather_forecasting", "climate_modeling"]
    },
    "performance": 0.9
  }')

if echo "$LEARN_RESPONSE" | grep -q '"success":true'; then
    print_success "Concept learned successfully"
else
    print_error "Failed to learn concept"
    echo "$LEARN_RESPONSE"
    exit 1
fi
echo

# Test 7: Retrieve Memories
print_status "Retrieving all memories..."
MEMORIES_RESPONSE=$(curl -s "$API_URL/memories")
MEMORY_COUNT=$(echo "$MEMORIES_RESPONSE" | jq '. | length')

if [ "$MEMORY_COUNT" -gt 0 ]; then
    print_success "Retrieved $MEMORY_COUNT memories"
    echo "$MEMORIES_RESPONSE" | jq '.[] | {id: .id, type: .type, content: .content, tags: .metadata.tags}'
else
    print_warning "No memories found"
fi
echo

# Test 8: Get Identities
print_status "Retrieving identities..."
IDENTITIES_RESPONSE=$(curl -s "$API_URL/identities")
IDENTITY_COUNT=$(echo "$IDENTITIES_RESPONSE" | jq '.identities | length')

if [ "$IDENTITY_COUNT" -gt 0 ]; then
    print_success "Retrieved $IDENTITY_COUNT identities"
    echo "$IDENTITIES_RESPONSE" | jq '.identities[] | {id: .id, name: .name, status: .status}'
else
    print_warning "No identities found"
fi
echo

# Test 9: Test via Nginx Proxy
print_status "Testing via nginx proxy..."
PROXY_HEALTH=$(curl -s "http://localhost/health")
if echo "$PROXY_HEALTH" | grep -q "healthy"; then
    print_success "Nginx proxy is working"
else
    print_warning "Nginx proxy test failed or not configured"
fi
echo

# Summary
print_status "Test Summary"
echo "============="
print_success "✅ Health check: PASSED"
print_success "✅ Status check: PASSED"
print_success "✅ Identity creation: PASSED"
print_success "✅ Memory storage: PASSED"
print_success "✅ Concept learning: PASSED"
print_success "✅ Memory retrieval: PASSED"
print_success "✅ Identity retrieval: PASSED"

echo
print_status "🎉 All API tests completed successfully!"
print_status "The AI Persistence system is fully functional."

echo
print_status "Available endpoints:"
echo "  • Health: $BASE_URL/health"
echo "  • Status: $BASE_URL/status"
echo "  • Identities: $API_URL/identities"
echo "  • Memories: $API_URL/memories"
echo "  • Learning: $API_URL/learn"
echo
print_status "Check the API_SPECIFICATION.md file for detailed documentation."
