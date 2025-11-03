# AI Persistence Package

A comprehensive package for AI persistence and identity management using hyperbolic geometry and HD addressing.

## Overview

The AI Persistence Package provides a complete solution for AI systems to maintain their identity, memory, and learning across sessions and deployments. It leverages hyperbolic geometry for efficient memory consolidation and HD addressing for deterministic service identification.

## Features

- **AI Identity Management**: Complete identity system with hyperbolic positioning
- **Memory System**: Multi-layered memory with consolidation and compression
- **Security Framework**: End-to-end encryption and access control
- **Hyperbolic Geometry**: Efficient memory organization and retrieval
- **HD Addressing**: Deterministic service identification
- **HTTP API Server**: Full REST API with comprehensive endpoints
- **File-Based Persistence**: JSON-based state persistence across sessions
- **Checkpoint System**: Save and restore system state at any point

## Quick Start

### Installation

```bash
npm install
npm run build
```

### Start the Server

```bash
npm start
# Server runs on http://localhost:3000
```

### Using the API

```bash
# Health check
curl http://localhost:3000/health

# Create an identity
curl -X POST http://localhost:3000/api/identities \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My AI Assistant",
    "type": "ai",
    "capabilities": ["reasoning", "learning"],
    "preferences": {"learningStyle": "visual"}
  }'

# Store a memory
curl -X POST http://localhost:3000/api/memories \
  -H "Content-Type: application/json" \
  -d '{
    "type": "episodic",
    "content": "User asked about AI persistence",
    "metadata": {
      "source": "user",
      "quality": 0.9,
      "confidence": 0.8,
      "importance": 0.7,
      "tags": ["ai", "persistence"]
    }
  }'

# Retrieve memories
curl "http://localhost:3000/api/memories?type=episodic&limit=10"

# Learn a concept
curl -X POST http://localhost:3000/api/learn \
  -H "Content-Type: application/json" \
  -d '{
    "concept": "hyperbolic geometry",
    "data": {"applications": ["memory organization"]},
    "context": {"domain": "mathematics"},
    "performance": 0.9
  }'
```

## API Endpoints

### Health & Status

- `GET /health` - System health check
- `GET /status` - Detailed system status

### Identity Management

- `GET /api/identities` - List all identities
- `POST /api/identities` - Create new identity
- `GET /api/identities/:id` - Get specific identity
- `PUT /api/identities/:id` - Update identity
- `DELETE /api/identities/:id` - Delete identity

### Memory Operations

- `GET /api/memories` - Retrieve memories (supports query params: `type`, `content`, `limit`)
- `POST /api/memories` - Store new memory
- `POST /api/memories/consolidate` - Consolidate memories
- `POST /api/memories/compress` - Compress memories

### Learning System

- `POST /api/learn` - Learn a new concept
- `GET /api/learn/progress` - Get learning progress

### Checkpoints

- `GET /api/checkpoints` - List all checkpoints
- `POST /api/checkpoints` - Create checkpoint
- `GET /api/checkpoints/last` - Get last checkpoint

### State Management

- `GET /api/state` - Get complete system state
- `POST /api/state/save` - Save current state
- `POST /api/state/restore` - Restore from saved state

### Security

- `POST /api/auth/authenticate` - Authenticate user
- `POST /api/auth/authorize` - Authorize action
- `POST /api/encrypt` - Encrypt data
- `POST /api/decrypt` - Decrypt data

## Architecture

### Core Components

- **AIPersistenceCore**: Main orchestrator for persistence operations
- **IdentityManager**: Manages AI identity with hyperbolic positioning
- **MemorySystem**: Multi-layered memory with consolidation
- **SecurityFramework**: Encryption, authentication, and authorization
- **HTTP Server**: RESTful API server exposing all functionality

### Memory Types

- **Episodic Memory**: Event-based memories with temporal context
- **Semantic Memory**: Concept-based memories with relationships
- **Procedural Memory**: Skill-based memories with execution
- **Working Memory**: Short-term memory with attention
- **Meta Memory**: Self-awareness and memory management

### Security Features

- **Encryption**: AES-256 encryption for data at rest
- **Authentication**: Token-based authentication support
- **Authorization**: Role-based access control
- **Privacy**: Privacy controls and data retention policies
- **Audit**: Comprehensive logging and monitoring

## Workflow

See [WALKTHROUGH.canvas](./WALKTHROUGH.canvas) for a visual workflow diagram (viewable in Obsidian or any JSON Canvas viewer).

The typical workflow:

1. **Initialize System** ? Create persistence instance and initialize components
2. **Create Identity** ? Define AI identity with capabilities and preferences
3. **Store Memories** ? Save episodic, semantic, and procedural memories
4. **Learn Concepts** ? Track learning progress and mastery
5. **Create Checkpoints** ? Save system state at milestones
6. **Consolidate** ? Periodically consolidate and compress memories
7. **Persist State** ? Save complete state to file
8. **Restore** ? Load state on next session

## Configuration

### Default Configuration

```typescript
import { AIPersistenceCore, DEFAULT_CONFIG } from './core/src/index.js';

const persistence = AIPersistenceCore.create(DEFAULT_CONFIG);
await persistence.initialize();
```

### Custom Configuration

```typescript
const config: PersistenceConfig = {
  identity: {
    name: 'My AI',
    type: 'ai',
    capabilities: ['reasoning', 'learning'],
    preferences: { learningStyle: 'visual' },
    security: {
      encryption: { algorithm: 'AES-256', keySize: 256, mode: 'CBC' },
      authentication: { method: 'token', strength: 8, timeout: 3600000 },
      authorization: { model: 'rbac', policies: [] }
    }
  },
  memory: {
    storage: { type: 'file', path: './persistence', maxSize: 1000000 },
    consolidation: { threshold: 100, strategy: 'temporal', frequency: 3600000 },
    compression: { algorithm: 'gzip', level: 6, threshold: 1000 }
  },
  security: {
    encryption: { algorithm: 'AES-256', keySize: 256, mode: 'CBC' },
    authentication: { method: 'token', strength: 8, timeout: 3600000 },
    authorization: { model: 'rbac', policies: [] }
  }
};
```

## Development

### Build

```bash
npm run build
```

### Development Mode

```bash
npm run dev
```

### Testing

```bash
npm test
npm run test:coverage
```

### Type Checking

```bash
npm run type-check
```

## File Structure

```
packages/autonomous-identity/
??? core/                    # Core persistence package
?   ??? src/
?       ??? implementations/ # Core implementations
?       ??? interfaces/      # Type definitions
?       ??? types/          # Type definitions
??? identity/               # Identity management
??? memory/                 # Memory system
??? security/               # Security framework
??? communication/          # Communication protocol
??? server.ts               # HTTP API server
??? index.ts                # Main entry point
??? README.md               # This file
```

## Persistence

The system uses file-based persistence by default:

- **State File**: `persistence/state.json` - Encrypted complete system state
- **Auto-Restore**: System automatically restores state on initialization
- **Auto-Save**: State saved on shutdown or explicit save call

## Examples

### Basic Usage

```typescript
import { AIPersistenceCore, DEFAULT_CONFIG } from './core/src/index.js';

// Create and initialize
const persistence = AIPersistenceCore.create(DEFAULT_CONFIG);
await persistence.initialize();

// Create identity
const identity = await persistence.createIdentity({
  name: 'My AI',
  type: 'ai',
  capabilities: ['reasoning'],
  preferences: {}
});

// Store memory
await persistence.storeMemory({
  type: 'episodic',
  content: 'User interaction',
  metadata: {
    source: 'user',
    quality: 0.8,
    confidence: 0.9,
    importance: 0.7,
    tags: ['interaction'],
    context: {}
  }
});

// Retrieve memories
const memories = await persistence.retrieveMemory({
  type: 'episodic',
  limit: 10
});

// Save state
await persistence.saveState();

// Shutdown
await persistence.shutdown();
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

- Documentation: See `IMPLEMENTATION_GUIDE.md` and `API_SPECIFICATION.md`
- Issues: [GitHub Issues](https://github.com/h2gnn/ai-persistence-package/issues)
- Discussions: [GitHub Discussions](https://github.com/h2gnn/ai-persistence-package/discussions)