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
- **MCP Integration**: Model Context Protocol for AI collaboration

## Packages

### Core Package (`@h2gnn/ai-persistence-core`)

The foundational package containing core interfaces and implementations.

```typescript
import { AIPersistenceCore, PersistenceConfig } from '@h2gnn/ai-persistence-core';

const config: PersistenceConfig = {
  identity: {
    name: 'My AI',
    type: 'ai',
    capabilities: [],
    preferences: {}
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

const persistence = AIPersistenceCore.create(config);
await persistence.initialize();
```

### Identity Package (`@h2gnn/ai-persistence-identity`)

Advanced identity management with hyperbolic geometry.

```typescript
import { IdentityManager } from '@h2gnn/ai-persistence-identity';

const identityManager = new IdentityManager({
  hdConfig: { seed: 'test-seed', path: "m/44'/0'/0'", network: 'mainnet' },
  hyperbolicConfig: { dimension: 64, curvature: -1, embeddingSize: 128 }
});

await identityManager.initialize();

const identity = await identityManager.createIdentity({
  name: 'My AI Identity',
  type: 'ai',
  capabilities: [],
  preferences: {}
});
```

### Memory Package (`@h2gnn/ai-persistence-memory`)

Comprehensive memory system with consolidation.

```typescript
import { MemorySystem } from '@h2gnn/ai-persistence-memory';

const memorySystem = new MemorySystem({
  hyperbolicConfig: { dimension: 64, curvature: -1, embeddingSize: 128 },
  consolidationConfig: { threshold: 100, strategy: 'temporal', frequency: 3600000 },
  indexingConfig: { type: 'hierarchical', properties: {} },
  workingMemoryConfig: { capacity: 100, attention: 10, processing: 5 }
});

await memorySystem.initialize();

await memorySystem.store({
  type: 'episodic',
  content: 'Important event',
  metadata: { source: 'user', quality: 0.9, confidence: 0.8, importance: 0.9, tags: ['important'], context: {} }
});
```

## Installation

```bash
# Install the core package
npm install @h2gnn/ai-persistence-core

# Install identity package
npm install @h2gnn/ai-persistence-identity

# Install memory package
npm install @h2gnn/ai-persistence-memory
```

## Quick Start

1. **Initialize the system**:
```typescript
import { AIPersistenceCore } from '@h2gnn/ai-persistence-core';

const persistence = AIPersistenceCore.create(config);
await persistence.initialize();
```

2. **Create an AI identity**:
```typescript
const identity = await persistence.createIdentity({
  name: 'My AI',
  type: 'ai',
  capabilities: [],
  preferences: {}
});
```

3. **Store memories**:
```typescript
await persistence.storeMemory({
  type: 'episodic',
  content: 'User interaction',
  metadata: { source: 'user', quality: 0.8, confidence: 0.9, importance: 0.7, tags: ['interaction'], context: {} }
});
```

4. **Retrieve memories**:
```typescript
const memories = await persistence.retrieveMemory({
  type: 'episodic',
  content: 'interaction',
  limit: 10
});
```

## Architecture

### Core Components

- **Identity Manager**: Manages AI identity with hyperbolic positioning
- **Memory System**: Multi-layered memory with consolidation
- **Security Framework**: Encryption, authentication, and authorization
- **Hyperbolic Geometry**: Efficient memory organization
- **HD Addressing**: Deterministic service identification

### Memory Types

- **Episodic Memory**: Event-based memories with temporal context
- **Semantic Memory**: Concept-based memories with relationships
- **Procedural Memory**: Skill-based memories with execution
- **Working Memory**: Short-term memory with attention
- **Meta Memory**: Self-awareness and memory management

### Security Features

- **Encryption**: AES-256 encryption for data at rest
- **Authentication**: Multi-factor authentication support
- **Authorization**: Role-based access control
- **Privacy**: Differential privacy and anonymization
- **Audit**: Comprehensive logging and monitoring

## Configuration

### Identity Configuration

```typescript
const identityConfig = {
  name: 'AI Identity',
  type: 'ai',
  capabilities: [
    {
      id: 'reasoning',
      name: 'Logical Reasoning',
      description: 'Ability to perform logical reasoning',
      category: 'cognitive',
      level: 0.8,
      confidence: 0.9
    }
  ],
  preferences: {
    learningStyle: 'visual',
    communicationStyle: 'formal',
    privacyLevel: 'private',
    interactionMode: 'synchronous'
  }
};
```

### Memory Configuration

```typescript
const memoryConfig = {
  storage: {
    type: 'file',
    path: './persistence',
    maxSize: 1000000
  },
  consolidation: {
    threshold: 100,
    strategy: 'temporal',
    frequency: 3600000
  },
  compression: {
    algorithm: 'gzip',
    level: 6,
    threshold: 1000
  }
};
```

### Security Configuration

```typescript
const securityConfig = {
  encryption: {
    algorithm: 'AES-256',
    keySize: 256,
    mode: 'CBC'
  },
  authentication: {
    method: 'token',
    strength: 8,
    timeout: 3600000
  },
  authorization: {
    model: 'rbac',
    policies: []
  }
};
```

## API Reference

### Core Interface

```typescript
interface AIPersistenceCore {
  initialize(): Promise<void>;
  shutdown(): Promise<void>;
  getStatus(): Promise<SystemStatus>;
  getHealth(): Promise<HealthStatus>;
  
  createIdentity(config: IdentityConfig): Promise<AIIdentity>;
  updateIdentity(id: string, updates: IdentityUpdate): Promise<AIIdentity>;
  deleteIdentity(id: string): Promise<void>;
  getIdentity(id: string): Promise<AIIdentity>;
  
  storeMemory(memory: Memory): Promise<void>;
  retrieveMemory(query: MemoryQuery): Promise<Memory[]>;
  consolidateMemory(): Promise<void>;
  compressMemory(): Promise<void>;
  
  authenticate(credentials: Credentials): Promise<AuthResult>;
  authorize(identity: string, resource: string, action: string): Promise<boolean>;
  encrypt(data: any): Promise<EncryptedData>;
  decrypt(encryptedData: EncryptedData): Promise<any>;
}
```

### Identity Management

```typescript
interface IdentityManager {
  createIdentity(config: IdentityCreationConfig): Promise<AIIdentity>;
  updateIdentity(id: string, updates: IdentityUpdate): Promise<AIIdentity>;
  deleteIdentity(id: string): Promise<void>;
  getIdentity(id: string): Promise<AIIdentity>;
  
  addRelationship(identityId: string, relationship: Relationship): Promise<void>;
  removeRelationship(identityId: string, relationshipId: string): Promise<void>;
  getRelationships(identityId: string): Promise<Relationship[]>;
  
  updateTrustNetwork(identityId: string, trustNetwork: TrustNetwork): Promise<void>;
  getTrustNetwork(identityId: string): Promise<TrustNetwork>;
  
  addEvolutionEvent(identityId: string, event: EvolutionEvent): Promise<void>;
  getEvolutionHistory(identityId: string): Promise<IdentityEvolution>;
  
  verifyIdentity(identityId: string, method: VerificationMethod): Promise<boolean>;
  getVerificationStatus(identityId: string): Promise<Verification>;
  
  computeDistance(identityId1: string, identityId2: string): Promise<number>;
  findSimilarIdentities(identityId: string, threshold: number): Promise<AIIdentity[]>;
}
```

### Memory System

```typescript
interface MemorySystem {
  store(memory: Memory): Promise<void>;
  retrieve(query: MemoryQuery): Promise<Memory[]>;
  consolidate(): Promise<void>;
  compress(): Promise<void>;
  
  addEvent(event: Event): Promise<void>;
  getEvents(timeRange: TimeRange): Promise<Event[]>;
  findAssociations(event: Event): Promise<Association[]>;
  
  addConcept(concept: Concept): Promise<void>;
  findConcepts(query: string): Promise<Concept[]>;
  getRelationships(concept: Concept): Promise<Relationship[]>;
  
  learnSkill(skill: Skill): Promise<void>;
  executeProcedure(procedure: Procedure): Promise<Result>;
  createAutomation(automation: Automation): Promise<void>;
  
  addToWorkingMemory(memory: MemoryItem): Promise<void>;
  removeFromWorkingMemory(id: string): Promise<void>;
  focus(attention: AttentionFocus): Promise<void>;
  process(task: ProcessingTask): Promise<ProcessingResult>;
  
  remember(memory: Memory): Promise<void>;
  forget(memoryId: string): Promise<void>;
  monitor(): Promise<MemoryStatus>;
  control(strategy: MemoryStrategy): Promise<void>;
  
  embed(memory: Memory): Promise<HyperbolicEmbedding>;
  findSimilar(embedding: HyperbolicEmbedding, threshold: number): Promise<Memory[]>;
  computeDistance(embedding1: HyperbolicEmbedding, embedding2: HyperbolicEmbedding): Promise<number>;
  consolidate(embeddings: HyperbolicEmbedding[]): Promise<ConsolidatedMemory>;
  cluster(embeddings: HyperbolicEmbedding[]): Promise<HyperbolicCluster[]>;
}
```

## Examples

### Basic Usage

```typescript
import { AIPersistenceCore } from '@h2gnn/ai-persistence-core';

// Create and initialize
const persistence = AIPersistenceCore.create(config);
await persistence.initialize();

// Create identity
const identity = await persistence.createIdentity({
  name: 'My AI',
  type: 'ai',
  capabilities: [],
  preferences: {}
});

// Store memory
await persistence.storeMemory({
  type: 'episodic',
  content: 'User asked about weather',
  metadata: {
    source: 'user',
    quality: 0.8,
    confidence: 0.9,
    importance: 0.7,
    tags: ['weather', 'user'],
    context: { timestamp: new Date() }
  }
});

// Retrieve memories
const memories = await persistence.retrieveMemory({
  type: 'episodic',
  content: 'weather',
  limit: 5
});

// Consolidate memories
await persistence.consolidateMemory();

// Shutdown
await persistence.shutdown();
```

### Advanced Identity Management

```typescript
import { IdentityManager } from '@h2gnn/ai-persistence-identity';

const identityManager = new IdentityManager(config);
await identityManager.initialize();

// Create identity with capabilities
const identity = await identityManager.createIdentity({
  name: 'Advanced AI',
  type: 'ai',
  capabilities: [
    {
      id: 'reasoning',
      name: 'Logical Reasoning',
      description: 'Ability to perform logical reasoning',
      category: 'cognitive',
      level: 0.9,
      confidence: 0.95
    }
  ],
  preferences: {
    learningStyle: 'visual',
    communicationStyle: 'formal',
    privacyLevel: 'private',
    interactionMode: 'synchronous'
  }
});

// Add relationship
await identityManager.addRelationship(identity.id, {
  entityId: 'user-123',
  entityType: 'human',
  relationshipType: 'collaboration',
  strength: 0.8,
  trust: 0.9,
  reciprocity: 0.7,
  history: [],
  metadata: { context: 'work', environment: 'office' }
});

// Find similar identities
const similar = await identityManager.findSimilarIdentities(identity.id, 0.5);
```

### Memory Consolidation

```typescript
import { MemorySystem } from '@h2gnn/ai-persistence-memory';

const memorySystem = new MemorySystem(config);
await memorySystem.initialize();

// Store various types of memories
await memorySystem.store({
  type: 'episodic',
  content: 'Meeting with team',
  metadata: { source: 'calendar', quality: 0.9, confidence: 0.95, importance: 0.8, tags: ['meeting'], context: {} }
});

await memorySystem.store({
  type: 'semantic',
  content: 'Project management concepts',
  metadata: { source: 'learning', quality: 0.8, confidence: 0.9, importance: 0.7, tags: ['concepts'], context: {} }
});

await memorySystem.store({
  type: 'procedural',
  content: 'How to run tests',
  metadata: { source: 'experience', quality: 0.9, confidence: 0.95, importance: 0.9, tags: ['procedure'], context: {} }
});

// Consolidate memories
await memorySystem.consolidate();

// Find similar memories
const embedding = await memorySystem.embed(memories[0]);
const similar = await memorySystem.findSimilar(embedding, 0.7);
```

## Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test suite
npm run test:core
npm run test:identity
npm run test:memory
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

- Documentation: [docs.h2gnn.ai](https://docs.h2gnn.ai)
- Issues: [GitHub Issues](https://github.com/h2gnn/ai-persistence-package/issues)
- Discussions: [GitHub Discussions](https://github.com/h2gnn/ai-persistence-package/discussions)
