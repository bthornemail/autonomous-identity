# AI Persistence API - cURL Examples

Quick reference for testing the AI Persistence API with cURL commands.

## Base URLs
- **Direct**: `http://localhost:3000`
- **Via Nginx**: `http://localhost`

## System Health & Status

### Check System Health
```bash
curl http://localhost:3000/health
```

### Get System Status
```bash
curl http://localhost:3000/status
```

## Identity Management

### Create AI Identity
```bash
curl -X POST http://localhost:3000/api/identities \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Weather Assistant",
    "type": "ai",
    "capabilities": ["weather_forecasting", "data_analysis", "reasoning"],
    "preferences": {
      "learningStyle": "data_driven",
      "communicationStyle": "friendly",
      "privacyLevel": "private"
    }
  }'
```

### Get All Identities
```bash
curl http://localhost:3000/api/identities
```

## Memory Management

### Store Episodic Memory
```bash
curl -X POST http://localhost:3000/api/memories \
  -H "Content-Type: application/json" \
  -d '{
    "type": "episodic",
    "content": "User requested weather forecast for tomorrow",
    "metadata": {
      "source": "user",
      "quality": 0.9,
      "confidence": 0.95,
      "importance": 0.8,
      "tags": ["weather", "forecast", "user_request"],
      "context": {
        "timestamp": "2025-10-04T06:30:00Z",
        "location": "San Francisco"
      }
    }
  }'
```

### Store Semantic Memory
```bash
curl -X POST http://localhost:3000/api/memories \
  -H "Content-Type: application/json" \
  -d '{
    "type": "semantic",
    "content": "Weather forecasting uses machine learning algorithms",
    "metadata": {
      "source": "learning",
      "quality": 0.8,
      "confidence": 0.9,
      "importance": 0.7,
      "tags": ["weather", "forecasting", "machine_learning"],
      "context": {
        "domain": "meteorology",
        "complexity": "intermediate"
      }
    }
  }'
```

### Store Procedural Memory
```bash
curl -X POST http://localhost:3000/api/memories \
  -H "Content-Type: application/json" \
  -d '{
    "type": "procedural",
    "content": "How to analyze weather data using Python",
    "metadata": {
      "source": "experience",
      "quality": 0.9,
      "confidence": 0.95,
      "importance": 0.9,
      "tags": ["python", "data_analysis", "weather", "procedure"],
      "context": {
        "domain": "programming",
        "skill_level": "intermediate",
        "tools": ["pandas", "numpy", "matplotlib"]
      }
    }
  }'
```

### Retrieve All Memories
```bash
curl http://localhost:3000/api/memories
```

## Learning System

### Learn New Concept
```bash
curl -X POST http://localhost:3000/api/learn \
  -H "Content-Type: application/json" \
  -d '{
    "concept": "weather prediction algorithms",
    "data": {
      "description": "Machine learning models for weather forecasting",
      "algorithms": ["neural_networks", "random_forest", "svm"],
      "accuracy": 0.85,
      "features": ["temperature", "humidity", "pressure", "wind_speed"]
    },
    "context": {
      "domain": "meteorology",
      "complexity": "advanced",
      "source": "research"
    },
    "performance": 0.9
  }'
```

## Advanced Examples

### Complete Workflow
```bash
#!/bin/bash

echo "🚀 AI Persistence API Complete Workflow"
echo "======================================="

# 1. Check health
echo "1. Checking system health..."
curl -s http://localhost:3000/health | jq '.healthy'

# 2. Create identity
echo "2. Creating AI identity..."
IDENTITY=$(curl -s -X POST http://localhost:3000/api/identities \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Advanced Weather AI",
    "type": "ai",
    "capabilities": ["weather_forecasting", "data_analysis", "machine_learning"],
    "preferences": {
      "learningStyle": "data_driven",
      "communicationStyle": "technical"
    }
  }')

echo "Identity created: $(echo $IDENTITY | jq -r '.id')"

# 3. Store memories
echo "3. Storing memories..."
curl -s -X POST http://localhost:3000/api/memories \
  -H "Content-Type: application/json" \
  -d '{
    "type": "episodic",
    "content": "User asked for weather forecast",
    "metadata": {
      "source": "user",
      "quality": 0.9,
      "confidence": 0.95,
      "importance": 0.8,
      "tags": ["weather", "user_request"],
      "context": {"timestamp": "'$(date -u +%Y-%m-%dT%H:%M:%SZ)'"}
    }
  }' | jq '.success'

# 4. Learn concept
echo "4. Learning concept..."
curl -s -X POST http://localhost:3000/api/learn \
  -H "Content-Type: application/json" \
  -d '{
    "concept": "weather patterns",
    "data": {"description": "Understanding weather patterns"},
    "context": {"domain": "meteorology"},
    "performance": 0.8
  }' | jq '.success'

# 5. Retrieve memories
echo "5. Retrieving memories..."
curl -s http://localhost:3000/api/memories | jq '.[] | {type: .type, content: .content}'

echo "✅ Workflow completed successfully!"
```

### Testing with jq (JSON processor)
```bash
# Install jq if not available: sudo apt-get install jq

# Pretty print health status
curl -s http://localhost:3000/health | jq '.'

# Extract specific fields
curl -s http://localhost:3000/status | jq '{status: .status, uptime: .uptime}'

# Count memories
curl -s http://localhost:3000/api/memories | jq 'length'

# Filter memories by type
curl -s http://localhost:3000/api/memories | jq '.[] | select(.type == "episodic")'

# Extract memory tags
curl -s http://localhost:3000/api/memories | jq '.[] | {content: .content, tags: .metadata.tags}'
```

### Error Handling Examples
```bash
# Test invalid endpoint
curl -s http://localhost:3000/invalid-endpoint

# Test invalid JSON
curl -s -X POST http://localhost:3000/api/memories \
  -H "Content-Type: application/json" \
  -d '{"invalid": json}'

# Test missing required fields
curl -s -X POST http://localhost:3000/api/identities \
  -H "Content-Type: application/json" \
  -d '{}'
```

## Monitoring Commands

### Check System Metrics
```bash
# System health with component details
curl -s http://localhost:3000/health | jq '.components[] | {name: .name, status: .status, latency: .metrics.latency}'

# System performance
curl -s http://localhost:3000/status | jq '{uptime: .uptime, memory: .memory, performance: .performance}'

# Memory utilization
curl -s http://localhost:3000/status | jq '.memory'
```

### Check via Nginx Proxy
```bash
# Health through nginx
curl -s http://localhost/health

# API through nginx
curl -s http://localhost/api/memories
```

## Troubleshooting

### Check if services are running
```bash
docker ps | grep ai-persistence
```

### Check service logs
```bash
docker logs ai-persistence-core
docker logs ai-persistence-nginx
```

### Test connectivity
```bash
# Test direct connection
curl -I http://localhost:3000/health

# Test nginx proxy
curl -I http://localhost/health
```

---

*These examples demonstrate the complete functionality of the AI Persistence API. Use them as a starting point for your own integrations.*
