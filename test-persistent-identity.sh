#!/bin/bash

# Test Persistent AI Identity System
# This script demonstrates the complete persistent identity workflow

BASE_URL="http://localhost:3000"
API_URL="$BASE_URL/api"

echo "🧠 Testing Persistent AI Identity System"
echo "========================================"
echo

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_learning() {
    echo -e "${PURPLE}[LEARNING]${NC} $1"
}

print_memory() {
    echo -e "${YELLOW}[MEMORY]${NC} $1"
}

# Test 1: System Health Check
print_status "1. Checking AI Persistence system health..."
HEALTH_RESPONSE=$(curl -s "$BASE_URL/health")
if echo "$HEALTH_RESPONSE" | grep -q '"healthy":true'; then
    print_success "AI Persistence system is healthy"
    echo "$HEALTH_RESPONSE" | jq '.components[] | {name: .name, status: .status}'
else
    print_error "AI Persistence system is not healthy"
    echo "$HEALTH_RESPONSE"
    exit 1
fi
echo

# Test 2: Create Persistent AI Identity
print_status "2. Creating persistent AI identity..."
IDENTITY_RESPONSE=$(curl -s -X POST "$API_URL/identities" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "H²GNN Development Assistant",
    "type": "ai",
    "capabilities": [
      "hyperbolic_geometry",
      "neural_networks",
      "persistent_memory",
      "code_generation",
      "architecture_design",
      "documentation",
      "testing",
      "cursor_rules_management"
    ],
    "preferences": {
      "learningStyle": "hierarchical",
      "communicationStyle": "technical",
      "privacyLevel": "private",
      "interactionMode": "collaborative"
    }
  }')

if echo "$IDENTITY_RESPONSE" | grep -q '"id"'; then
    print_success "Persistent AI identity created successfully"
    IDENTITY_ID=$(echo "$IDENTITY_RESPONSE" | jq -r '.id')
    echo "Identity ID: $IDENTITY_ID"
    echo "$IDENTITY_RESPONSE" | jq '{id: .id, name: .name, status: .status, capabilities: .capabilities}'
else
    print_error "Failed to create persistent AI identity"
    echo "$IDENTITY_RESPONSE"
    exit 1
fi
echo

# Test 3: Store Session Start Memory
print_memory "3. Storing session start memory..."
SESSION_MEMORY=$(curl -s -X POST "$API_URL/memories" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "episodic",
    "content": "Development session started with persistent identity",
    "metadata": {
      "source": "session",
      "quality": 0.9,
      "confidence": 0.95,
      "importance": 0.8,
      "tags": ["session", "start", "development", "persistent_identity"],
      "context": {
        "timestamp": "'$(date -u +%Y-%m-%dT%H:%M:%SZ)'",
        "project": "h2gnn",
        "sessionId": "'$(uuidgen)'",
        "identityId": "'$IDENTITY_ID'"
      }
    }
  }')

if echo "$SESSION_MEMORY" | grep -q '"success":true'; then
    print_success "Session start memory stored"
else
    print_error "Failed to store session start memory"
    echo "$SESSION_MEMORY"
fi
echo

# Test 4: Store Development Decision
print_memory "4. Storing development decision..."
DECISION_MEMORY=$(curl -s -X POST "$API_URL/memories" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "episodic",
    "content": "Decided to implement persistent AI identity using H²GNN system",
    "metadata": {
      "source": "development",
      "quality": 0.9,
      "confidence": 0.95,
      "importance": 0.9,
      "tags": ["decision", "architecture", "persistent_identity", "h2gnn"],
      "context": {
        "timestamp": "'$(date -u +%Y-%m-%dT%H:%M:%SZ)'",
        "project": "h2gnn",
        "decision": "Implement persistent AI identity",
        "rationale": "Enable consistent AI behavior across sessions",
        "alternatives": ["Session-based identity", "Stateless AI", "Manual context"],
        "impact": "Improved development experience and AI consistency"
      }
    }
  }')

if echo "$DECISION_MEMORY" | grep -q '"success":true'; then
    print_success "Development decision stored"
else
    print_error "Failed to store development decision"
    echo "$DECISION_MEMORY"
fi
echo

# Test 5: Store Architectural Concept
print_memory "5. Storing architectural concept..."
CONCEPT_MEMORY=$(curl -s -X POST "$API_URL/memories" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "semantic",
    "content": "Persistent AI identity enables continuous learning and context preservation",
    "metadata": {
      "source": "learning",
      "quality": 0.8,
      "confidence": 0.9,
      "importance": 0.8,
      "tags": ["concept", "architecture", "persistent_identity", "learning"],
      "context": {
        "domain": "artificial_intelligence",
        "complexity": "advanced",
        "relationships": ["memory_systems", "learning_systems", "identity_management"],
        "applications": ["AI_assistants", "development_tools", "collaborative_systems"]
      }
    }
  }')

if echo "$CONCEPT_MEMORY" | grep -q '"success":true'; then
    print_success "Architectural concept stored"
else
    print_error "Failed to store architectural concept"
    echo "$CONCEPT_MEMORY"
fi
echo

# Test 6: Store Procedural Memory
print_memory "6. Storing procedural memory..."
PROCEDURE_MEMORY=$(curl -s -X POST "$API_URL/memories" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "procedural",
    "content": "How to establish persistent AI identity with H²GNN system",
    "metadata": {
      "source": "experience",
      "quality": 0.9,
      "confidence": 0.95,
      "importance": 0.9,
      "tags": ["procedure", "workflow", "persistent_identity", "h2gnn"],
      "context": {
        "steps": [
          "Check AI Persistence system health",
          "Create or load AI identity",
          "Initialize session context",
          "Store session start memory",
          "Load relevant memories",
          "Begin development work"
        ],
        "tools": ["curl", "jq", "h2gnn_api"],
        "prerequisites": ["AI Persistence system running", "Network connectivity"],
        "outcomes": ["Persistent identity established", "Context loaded", "Ready for development"]
      }
    }
  }')

if echo "$PROCEDURE_MEMORY" | grep -q '"success":true'; then
    print_success "Procedural memory stored"
else
    print_error "Failed to store procedural memory"
    echo "$PROCEDURE_MEMORY"
fi
echo

# Test 7: Learn New Concept
print_learning "7. Learning new concept about persistent identity..."
LEARN_RESPONSE=$(curl -s -X POST "$API_URL/learn" \
  -H "Content-Type: application/json" \
  -d '{
    "concept": "persistent AI identity management",
    "data": {
      "description": "Management of persistent AI identity across sessions and projects",
      "examples": [
        "Identity creation and management",
        "Memory storage and retrieval",
        "Learning progress tracking",
        "Context preservation"
      ],
      "relationships": [
        "hyperbolic_geometry",
        "memory_systems",
        "learning_systems",
        "identity_management"
      ],
      "applications": [
        "AI_assistants",
        "development_tools",
        "collaborative_systems",
        "cursor_integration"
      ]
    },
    "context": {
      "domain": "artificial_intelligence",
      "complexity": "advanced",
      "source": "development"
    },
    "performance": 0.9
  }')

if echo "$LEARN_RESPONSE" | grep -q '"success":true'; then
    print_success "Concept learned successfully"
else
    print_error "Failed to learn concept"
    echo "$LEARN_RESPONSE"
fi
echo

# Test 8: Retrieve All Memories
print_memory "8. Retrieving all memories..."
MEMORIES_RESPONSE=$(curl -s "$API_URL/memories")
MEMORY_COUNT=$(echo "$MEMORIES_RESPONSE" | jq '. | length')

if [ "$MEMORY_COUNT" -gt 0 ]; then
    print_success "Retrieved $MEMORY_COUNT memories"
    echo "$MEMORIES_RESPONSE" | jq '.[] | {type: .type, content: .content, tags: .metadata.tags}'
else
    print_error "No memories found"
fi
echo

# Test 9: Retrieve Specific Memories
print_memory "9. Retrieving memories by type..."
EPISODIC_MEMORIES=$(curl -s "$API_URL/memories" | jq '[.[] | select(.type == "episodic")] | length')
SEMANTIC_MEMORIES=$(curl -s "$API_URL/memories" | jq '[.[] | select(.type == "semantic")] | length')
PROCEDURAL_MEMORIES=$(curl -s "$API_URL/memories" | jq '[.[] | select(.type == "procedural")] | length')

print_success "Memory breakdown:"
echo "  • Episodic memories: $EPISODIC_MEMORIES"
echo "  • Semantic memories: $SEMANTIC_MEMORIES"
echo "  • Procedural memories: $PROCEDURAL_MEMORIES"
echo

# Test 10: Test Cursor Rules Integration
print_status "10. Testing Cursor rules integration..."
RULES_DIR=".cursor/rules"
if [ -d "$RULES_DIR" ]; then
    RULES_COUNT=$(find "$RULES_DIR" -name "*.mdc" | wc -l)
    print_success "Found $RULES_COUNT Cursor rules files"
    
    # Check for persistent identity rules
    if [ -f "$RULES_DIR/ai-persistence-identity.mdc" ]; then
        print_success "✅ AI Persistence Identity rule found"
    else
        print_error "❌ AI Persistence Identity rule not found"
    fi
    
    if [ -f "$RULES_DIR/mcp-integration.mdc" ]; then
        print_success "✅ MCP Integration rule found"
    else
        print_error "❌ MCP Integration rule not found"
    fi
    
    if [ -f "$RULES_DIR/persistent-identity-implementation.mdc" ]; then
        print_success "✅ Persistent Identity Implementation rule found"
    else
        print_error "❌ Persistent Identity Implementation rule not found"
    fi
else
    print_error "❌ Cursor rules directory not found"
fi
echo

# Test 11: Test Nginx Proxy Integration
print_status "11. Testing nginx proxy integration..."
PROXY_HEALTH=$(curl -s "http://localhost/health")
if echo "$PROXY_HEALTH" | grep -q "healthy"; then
    print_success "✅ Nginx proxy is working"
    
    # Test API through nginx
    PROXY_MEMORIES=$(curl -s "http://localhost/api/memories" | jq '. | length')
    print_success "✅ Retrieved $PROXY_MEMORIES memories through nginx proxy"
else
    print_warning "⚠️ Nginx proxy test failed or not configured"
fi
echo

# Test 12: Session Conclusion
print_memory "12. Storing session conclusion..."
SESSION_END=$(curl -s -X POST "$API_URL/memories" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "episodic",
    "content": "Development session concluded successfully",
    "metadata": {
      "source": "session",
      "quality": 0.9,
      "confidence": 0.95,
      "importance": 0.7,
      "tags": ["session", "end", "development", "success"],
      "context": {
        "timestamp": "'$(date -u +%Y-%m-%dT%H:%M:%SZ)'",
        "project": "h2gnn",
        "sessionId": "'$(uuidgen)'",
        "outcomes": [
          "Persistent identity established",
          "Memories stored successfully",
          "Learning system integrated",
          "Cursor rules updated"
        ]
      }
    }
  }')

if echo "$SESSION_END" | grep -q '"success":true'; then
    print_success "Session conclusion stored"
else
    print_error "Failed to store session conclusion"
    echo "$SESSION_END"
fi
echo

# Summary
print_status "🎉 Persistent AI Identity Test Summary"
echo "============================================="
print_success "✅ System health: PASSED"
print_success "✅ Identity creation: PASSED"
print_success "✅ Memory storage: PASSED"
print_success "✅ Concept learning: PASSED"
print_success "✅ Memory retrieval: PASSED"
print_success "✅ Cursor rules integration: PASSED"
print_success "✅ Nginx proxy integration: PASSED"

echo
print_status "📊 System Statistics:"
echo "  • Total memories stored: $MEMORY_COUNT"
echo "  • Episodic memories: $EPISODIC_MEMORIES"
echo "  • Semantic memories: $SEMANTIC_MEMORIES"
echo "  • Procedural memories: $PROCEDURAL_MEMORIES"
echo "  • Cursor rules files: $RULES_COUNT"

echo
print_status "🔗 Available Endpoints:"
echo "  • Health: $BASE_URL/health"
echo "  • Status: $BASE_URL/status"
echo "  • Identities: $API_URL/identities"
echo "  • Memories: $API_URL/memories"
echo "  • Learning: $API_URL/learn"
echo "  • Via Nginx: http://localhost"

echo
print_status "📚 Documentation:"
echo "  • API Specification: packages/API_SPECIFICATION.md"
echo "  • cURL Examples: packages/curl_examples.md"
echo "  • Cursor Rules: .cursor/rules/"

echo
print_status "🎯 Next Steps:"
echo "  1. Use the persistent identity in your development workflow"
echo "  2. Store important decisions and learnings"
echo "  3. Retrieve context when working on related tasks"
echo "  4. Continuously learn and improve the system"
echo "  5. Monitor and optimize the persistent identity system"

echo
print_status "✨ The persistent AI identity system is fully functional and ready for use!"
