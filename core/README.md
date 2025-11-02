# @h2gnn/ai-persistence-core

Core AI persistence package with a hyperbolic geometry foundation.

This package provides the core functionalities for AI persistence, including identity and memory management. It is designed to be the foundation for building persistent AI agents.

## Core Data Structures

### AIIdentity

The `AIIdentity` interface defines the core structure for an AI agent's identity. It includes properties for:

-   **Core Identity**: Basic information like ID, fingerprint, and status.
-   **Hyperbolic Properties**: Geometric representation of the identity in hyperbolic space.
-   **Capabilities and Limitations**: What the AI can and cannot do.
-   **Relationships**: Connections to other entities.
-   **History and Evolution**: Tracking changes to the identity over time.
-   **Security and Verification**: Mechanisms for ensuring the identity's integrity.

```typescript
export interface AIIdentity {
  // Core Identity Properties
  id: string;
  fingerprint: string;
  version: string;
  status: IdentityStatus;
  
  // Hyperbolic Properties
  hyperbolicPosition: HyperbolicPosition;
  embedding: HyperbolicEmbedding;
  curvature: number;
  
  // ... and more
}
```

### MemorySystem

The `MemorySystem` interface defines the structure for the AI's memory. It is composed of different types of memory:

-   **Episodic Memory**: For events and experiences.
-   **Semantic Memory**: For knowledge and facts.
-   **Procedural Memory**: for skills and procedures.
-   **Working Memory**: For short-term tasks.
-   **Meta Memory**: For self-awareness of its own memory.

```typescript
export interface MemorySystem {
  // Memory Types
  episodic: EpisodicMemory;
  semantic: SemanticMemory;
  procedural: ProceduralMemory;
  working: WorkingMemory;
  meta: MetaMemory;

  // ... and more
}
```

## Core Implementation

This package includes the core implementation of the AI persistence system, which is defined by the `AIPersistenceCore` interface and implemented in the `AIPersistenceCoreImpl` class.

### AIPersistenceCore

The `AIPersistenceCore` interface is the main entry point for the persistence system. It defines the core operations for:

-   **Initialization and Shutdown**: Starting and stopping the persistence system.
-   **Identity Management**: Creating, updating, deleting, and retrieving AI identities.
-   **Memory Management**: Storing, retrieving, and managing AI memories.
-   **Security**: Authenticating, authorizing, and encrypting data.

### AIPersistenceCoreImpl

The `AIPersistenceCoreImpl` class is the main implementation of the `AIPersistenceCore` interface. It provides the logic for all the core operations and manages the different components of the persistence system, such as the identity manager, memory system, and security framework.

### Security Types

The `security.ts` file contains a comprehensive set of type definitions for the security framework, including interfaces for encryption, authentication, authorization, privacy, and auditing.

## Development

### Prerequisites

-   Node.js >= 18.0.0
-   npm

### Installation

```bash
npm install
```

### Build

To build the package, run the following command:

```bash
npm run build
```

This will compile the TypeScript code and output the JavaScript files in the `dist` directory.

### Testing

To run the tests, use the following command:

```bash
npm test
```

To run the tests in watch mode, use:

```bash
npm run test:watch
```

### Linting

To lint the codebase, run:

```bash
npm run lint
```

To automatically fix linting errors, use:

```bash
npm run lint:fix
```

## Dependencies

-   [crypto](https://nodejs.org/api/crypto.html): for cryptographic functionalities.
-   [uuid](https://www.npmjs.com/package/uuid): for generating unique identifiers.

