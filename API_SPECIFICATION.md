# AI Persistence API Specification

## Overview

The AI Persistence API provides a comprehensive system for AI identity management, memory storage, and learning capabilities using hyperbolic geometry and HD addressing. The API is accessible via HTTP endpoints and supports JSON data exchange.

## Base URL

- **Direct Access**: `http://localhost:3000`
- **Via Nginx Proxy**: `http://localhost`

## Authentication

Currently, the API does not require authentication for localhost development. In production, authentication headers may be required.

## Response Format

All responses are in JSON format with appropriate HTTP status codes.

## Endpoints

### System Health & Status

#### GET /health
Get the health status of the AI Persistence system.

**Response:**
```json
{
  "healthy": true,
  "components": [
    {
      "name": "identity",
      "status": "healthy",
      "metrics": {
        "latency": 10,
        "throughput": 100,
        "errors": 0,
        "availability": 99.9
      },
      "lastChecked": "2025-10-04T06:29:29.274Z"
    },
    {
      "name": "memory",
      "status": "healthy",
      "metrics": {
        "latency": 20,
        "throughput": 500,
        "errors": 0,
        "availability": 99.8
      },
      "lastChecked": "2025-10-04T06:29:29.274Z"
    },
    {
      "name": "security",
      "status": "healthy",
      "metrics": {
        "latency": 15,
        "throughput": 200,
        "errors": 0,
        "availability": 99.9
      },
      "lastChecked": "2025-10-04T06:29:29.274Z"
    }
  ],
  "metrics": {
    "cpu": 25,
    "memory": 60,
    "disk": 40,
    "network": 80
  },
  "alerts": [],
  "lastChecked": "2025-10-04T06:29:29.274Z"
}
```

#### GET /status
Get the current system status and performance metrics.

**Response:**
```json
{
  "status": "running",
  "uptime": 543041,
  "memory": {
    "total": 0,
    "used": 0,
    "available": 10000,
    "utilization": 0
  },
  "performance": {
    "latency": 50,
    "throughput": 1000,
    "errorRate": 0.01,
    "responseTime": 100
  },
  "security": {
    "authenticated": true,
    "authorized": true,
    "encrypted": true,
    "monitored": true
  },
  "lastUpdated": "2025-10-04T06:29:31.408Z"
}
```

### Identity Management

#### POST /api/identities
Create a new AI identity.

**Request Body:**
```json
{
  "name": "My AI Assistant",
  "type": "ai",
  "capabilities": ["reasoning", "memory", "learning"],
  "preferences": {
    "learningStyle": "visual",
    "communicationStyle": "friendly",
    "privacyLevel": "private"
  }
}
```

**Response (201 Created):**
```json
{
  "id": "cef70435-0d17-4628-8926-451acdcf552b",
  "fingerprint": "IntcIm5hbWVcIjpcIlRlc3QgQUlcIixcInR5cGVcIjpcImFpXCIsXCJjYXBhYmlsaXRpZXNcIjpbXCJyZWFzb25pbmdcIl0sXCJwcmVmZXJlbmNlc1wiOntcImxlYXJuaW5nU3R5bGVcIjpcInZpc3VhbFwifX0i",
  "version": "1.0.0",
  "status": "active",
  "hyperbolicPosition": {
    "coordinates": [-0.5911654386510423, -0.9303353738075613, -0.4178251119051408],
    "norm": 0.9,
    "curvature": -1,
    "timestamp": "2025-10-04T06:29:37.965Z"
  },
  "embedding": {
    "id": "1e85734a-4dd1-4539-8576-c12f667ccd49",
    "vector": [-0.0062297827193895875, -0.024432680156860787, ...],
    "norm": 0.9,
    "curvature": -1,
    "timestamp": "2025-10-04T06:29:37.965Z",
    "metadata": {
      "dimension": 64,
      "quality": 0.8,
      "confidence": 0.9,
      "source": "identity_generation"
    }
  },
  "curvature": -1,
  "capabilities": ["reasoning"],
  "limitations": [],
  "preferences": {
    "learningStyle": "visual"
  },
  "relationships": [],
  "trustNetwork": {
    "nodes": [],
    "edges": [],
    "centrality": {
      "degree": 0,
      "betweenness": 0,
      "closeness": 0,
      "eigenvector": 0
    },
    "clustering": {
      "coefficient": 0,
      "modularity": 0,
      "communities": []
    },
    "resilience": {
      "robustness": 0,
      "recovery": 0,
      "adaptation": 0
    }
  },
  "history": {
    "events": [],
    "timeline": {
      "start": "2025-10-04T06:29:37.965Z",
      "end": "2025-10-04T06:29:37.965Z",
      "events": [],
      "phases": []
    },
    "milestones": []
  },
  "evolution": {
    "stages": [],
    "adaptations": [],
    "learnings": [],
    "transformations": []
  },
  "verification": {
    "status": "pending",
    "methods": [],
    "level": "basic",
    "lastVerified": "2025-10-04T06:29:37.965Z"
  },
  "certificates": [],
  "permissions": [],
  "createdAt": "2025-10-04T06:29:37.965Z",
  "updatedAt": "2025-10-04T06:29:37.965Z",
  "lastAccessed": "2025-10-04T06:29:37.965Z"
}
```

#### GET /api/identities
Get all identities (currently returns empty array).

**Response:**
```json
{
  "identities": []
}
```

### Memory Management

#### POST /api/memories
Store a new memory in the system.

**Request Body:**
```json
{
  "type": "episodic",
  "content": "User asked about weather",
  "metadata": {
    "source": "user",
    "quality": 0.8,
    "confidence": 0.9,
    "importance": 0.7,
    "tags": ["weather", "user"],
    "context": {
      "timestamp": "2025-10-04T06:29:00Z"
    }
  }
}
```

**Response (201 Created):**
```json
{
  "success": true
}
```

#### GET /api/memories
Retrieve all memories from the system.

**Response:**
```json
[
  {
    "id": "475adbd4-b390-48fb-9f74-35255bf6f0fc",
    "type": "episodic",
    "content": "User asked about weather",
    "metadata": {
      "source": "user",
      "quality": 0.8,
      "confidence": 0.9,
      "importance": 0.7,
      "tags": ["weather", "user"],
      "context": {
        "timestamp": "2025-10-04T06:29:00Z"
      }
    },
    "timestamp": "2025-10-04T06:29:41.166Z"
  }
]
```

### Learning System

#### POST /api/learn
Learn a new concept and store it in the system.

**Request Body:**
```json
{
  "concept": "weather patterns",
  "data": {
    "description": "Understanding weather patterns and forecasting",
    "examples": ["rain", "sunshine", "clouds"],
    "relationships": ["meteorology", "climate"]
  },
  "context": {
    "domain": "meteorology",
    "complexity": "intermediate",
    "source": "user_interaction"
  },
  "performance": 0.8
}
```

**Response (200 OK):**
```json
{
  "success": true
}
```

## Data Types

### Identity Types

- **AI Identity**: `"ai"`
- **Human Identity**: `"human"`
- **System Identity**: `"system"`
- **Organization Identity**: `"organization"`

### Memory Types

- **Episodic**: `"episodic"` - Event-based memories with temporal context
- **Semantic**: `"semantic"` - Concept-based memories with relationships
- **Procedural**: `"procedural"` - Skill-based memories with execution
- **Working**: `"working"` - Short-term memory with attention
- **Meta**: `"meta"` - Self-awareness and memory management

### Hyperbolic Geometry

The system uses hyperbolic geometry for efficient memory organization:

- **Coordinates**: 3D hyperbolic coordinates
- **Norm**: Distance from origin (0-1)
- **Curvature**: -1 (negative curvature for hyperbolic space)
- **Embedding**: High-dimensional vector representations

## Error Handling

### Standard Error Response
```json
{
  "error": "Error message description"
}
```

### HTTP Status Codes

- **200 OK**: Successful request
- **201 Created**: Resource created successfully
- **400 Bad Request**: Invalid request data
- **404 Not Found**: Endpoint not found
- **500 Internal Server Error**: Server error

## CORS Support

The API supports Cross-Origin Resource Sharing (CORS) with the following headers:

- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS`
- `Access-Control-Allow-Headers: Content-Type, Authorization`

## Rate Limiting

The API implements rate limiting through nginx:

- **API endpoints**: 10 requests/second with burst of 20
- **Login endpoints**: 1 request/second with burst of 5

## Examples

### Complete Workflow Example

```bash
# 1. Check system health
curl http://localhost:3000/health

# 2. Create an AI identity
curl -X POST http://localhost:3000/api/identities \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Weather Assistant",
    "type": "ai",
    "capabilities": ["weather_forecasting", "data_analysis"],
    "preferences": {
      "learningStyle": "data_driven",
      "communicationStyle": "technical"
    }
  }'

# 3. Store a memory
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

# 4. Learn a concept
curl -X POST http://localhost:3000/api/learn \
  -H "Content-Type: application/json" \
  -d '{
    "concept": "weather prediction algorithms",
    "data": {
      "description": "Machine learning models for weather forecasting",
      "algorithms": ["neural_networks", "random_forest", "svm"],
      "accuracy": 0.85
    },
    "context": {
      "domain": "meteorology",
      "complexity": "advanced",
      "source": "research"
    },
    "performance": 0.9
  }'

# 5. Retrieve memories
curl http://localhost:3000/api/memories
```

## Monitoring

### Health Check Endpoints

- **System Health**: `GET /health`
- **System Status**: `GET /status`

### Metrics Available

- **Component Health**: Identity, Memory, Security systems
- **Performance Metrics**: Latency, throughput, error rates
- **Resource Usage**: CPU, memory, disk, network utilization
- **Security Status**: Authentication, authorization, encryption status

## Security Features

- **Encryption**: AES-256 encryption for data at rest
- **Authentication**: Token-based authentication (configurable)
- **Authorization**: Role-based access control
- **Privacy**: Data anonymization and privacy controls
- **Audit**: Comprehensive logging and monitoring

## Future Enhancements

Planned API extensions:

- **Identity Updates**: `PUT /api/identities/{id}`
- **Identity Deletion**: `DELETE /api/identities/{id}`
- **Memory Queries**: Advanced search and filtering
- **Memory Consolidation**: `POST /api/memories/consolidate`
- **Learning Progress**: `GET /api/learn/progress`
- **Trust Network**: Identity relationship management
- **Evolution Tracking**: Identity evolution over time

---

*This API specification is based on the current implementation and may be updated as new features are added.*
