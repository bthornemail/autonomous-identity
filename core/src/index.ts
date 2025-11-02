/**
 * AI Persistence Core Package
 * 
 * Main entry point for the AI persistence system
 */

// Core interfaces
export * from './interfaces/AIPersistenceCore';

// Core implementations
export * from './implementations/AIPersistenceCoreImpl';

// Type definitions
// Export only specific types to avoid conflicts
export type { AIIdentity, IdentityStatus, HyperbolicPosition, HyperbolicEmbedding } from './types/identity';
export type { Memory, MemoryType, MemoryMetadata } from './types/memory';
export type { SecurityFramework, EncryptedData, Credentials, AuthResult } from './types/security';

// Core classes
export class AIPersistenceCore {
  static create(config: PersistenceConfig): AIPersistenceCore {
    return new AIPersistenceCoreImpl(config);
  }
}

// Import the implementation
import { AIPersistenceCoreImpl } from './implementations/AIPersistenceCoreImpl';

// Types are already exported above

// Core configuration types
export interface PersistenceConfig {
  identity: IdentityConfig;
  memory: MemoryConfig;
  security: SecurityConfig;
}

export interface IdentityConfig {
  name: string;
  type: string;
  capabilities: string[];
  preferences: Record<string, any>;
  security: SecurityConfig;
}

export interface MemoryConfig {
  storage: StorageConfig;
  consolidation: ConsolidationConfig;
  compression: CompressionConfig;
}

export interface SecurityConfig {
  encryption: EncryptionConfig;
  authentication: AuthenticationConfig;
  authorization: AuthorizationConfig;
}

export interface StorageConfig {
  type: string;
  path: string;
  maxSize: number;
}

export interface ConsolidationConfig {
  threshold: number;
  strategy: string;
  frequency: number;
}

export interface CompressionConfig {
  algorithm: string;
  level: number;
  threshold: number;
}

export interface EncryptionConfig {
  algorithm: string;
  keySize: number;
  mode: string;
}

export interface AuthenticationConfig {
  method: string;
  strength: number;
  timeout: number;
}

export interface AuthorizationConfig {
  model: string;
  policies: any[];
}

// Version information
export const VERSION = '1.0.0';
export const PACKAGE_NAME = '@h2gnn/ai-persistence-core';

// Default configuration
export const DEFAULT_CONFIG: PersistenceConfig = {
  identity: {
    name: 'AI Identity',
    type: 'ai',
    capabilities: [],
    preferences: {},
    security: {
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
    }
  },
  memory: {
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
  },
  security: {
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
  }
};
