/**
 * AI Persistence Package
 * 
 * Main entry point for the AI persistence system
 */

// Core package - simplified exports to avoid conflicts
export { AIPersistenceCore } from './core/src/index.js';

// Main AI Persistence class
export class AIPersistence {
  static create(config: AIPersistenceConfig): AIPersistence {
    return new AIPersistenceImpl(config);
  }
}

// Configuration types
export interface AIPersistenceConfig {
  core: CoreConfig;
  identity: IdentityConfig;
  memory: MemoryConfig;
  security: SecurityConfig;
  communication: CommunicationConfig;
}

export interface CoreConfig {
  name: string;
  type: string;
  capabilities: any[];
  preferences: any;
}

export interface IdentityConfig {
  hdConfig: HDConfig;
  hyperbolicConfig: HyperbolicConfig;
}

export interface MemoryConfig {
  hyperbolicConfig: HyperbolicConfig;
  consolidationConfig: ConsolidationConfig;
  indexingConfig: IndexingConfig;
  workingMemoryConfig: WorkingMemoryConfig;
}

export interface SecurityConfig {
  encryptionConfig: EncryptionConfig;
  keyManagementConfig: KeyManagementConfig;
  authenticationConfig: AuthenticationConfig;
  authorizationConfig: AuthorizationConfig;
  privacyConfig: PrivacyConfig;
  anonymizationConfig: AnonymizationConfig;
  auditConfig: AuditConfig;
  monitoringConfig: MonitoringConfig;
}

export interface CommunicationConfig {
  mcpConfig: MCPConfig;
  routingConfig: RoutingConfig;
  sessionConfig: SessionConfig;
}

export interface HDConfig {
  seed: string;
  path: string;
  network: string;
}

export interface HyperbolicConfig {
  dimension: number;
  curvature: number;
  embeddingSize: number;
}

export interface ConsolidationConfig {
  threshold: number;
  strategy: string;
  frequency: number;
}

export interface IndexingConfig {
  type: string;
  properties: Record<string, any>;
}

export interface WorkingMemoryConfig {
  capacity: number;
  attention: number;
  processing: number;
}

export interface EncryptionConfig {
  algorithm: string;
  keySize: number;
  mode: string;
  padding: string;
}

export interface KeyManagementConfig {
  storage: string;
  rotation: number;
  backup: boolean;
  recovery: boolean;
}

export interface AuthenticationConfig {
  methods: string[];
  strength: number;
  timeout: number;
  retries: number;
}

export interface AuthorizationConfig {
  model: string;
  policies: any[];
  enforcement: any;
}

export interface PrivacyConfig {
  level: string;
  anonymization: boolean;
  retention: any;
}

export interface AnonymizationConfig {
  techniques: string[];
  quality: number;
  privacy: number;
}

export interface AuditConfig {
  enabled: boolean;
  retention: number;
  compliance: string[];
}

export interface MonitoringConfig {
  metrics: string[];
  alerts: any[];
  dashboards: any[];
}

export interface MCPConfig {
  server: string;
  port: number;
  protocol: string;
  timeout: number;
  retries: number;
}

export interface RoutingConfig {
  strategy: string;
  loadBalancing: boolean;
  failover: boolean;
}

export interface SessionConfig {
  maxParticipants: number;
  timeout: number;
  persistence: boolean;
}

// Version information
export const VERSION = '1.0.0';
export const PACKAGE_NAME = 'ai-persistence-package';

// Default configuration
export const DEFAULT_CONFIG: AIPersistenceConfig = {
  core: {
    name: 'AI Persistence System',
    type: 'ai',
    capabilities: [],
    preferences: {}
  },
  identity: {
    hdConfig: {
      seed: 'default-seed',
      path: "m/44'/0'/0'",
      network: 'mainnet'
    },
    hyperbolicConfig: {
      dimension: 64,
      curvature: -1,
      embeddingSize: 128
    }
  },
  memory: {
    hyperbolicConfig: {
      dimension: 64,
      curvature: -1,
      embeddingSize: 128
    },
    consolidationConfig: {
      threshold: 100,
      strategy: 'temporal',
      frequency: 3600000
    },
    indexingConfig: {
      type: 'hierarchical',
      properties: {}
    },
    workingMemoryConfig: {
      capacity: 100,
      attention: 10,
      processing: 5
    }
  },
  security: {
    encryptionConfig: {
      algorithm: 'AES-256',
      keySize: 256,
      mode: 'CBC',
      padding: 'PKCS7'
    },
    keyManagementConfig: {
      storage: 'file',
      rotation: 86400000,
      backup: true,
      recovery: true
    },
    authenticationConfig: {
      methods: ['token', 'biometric', 'mfa'],
      strength: 8,
      timeout: 3600000,
      retries: 3
    },
    authorizationConfig: {
      model: 'rbac',
      policies: [],
      enforcement: {
        type: 'strict',
        severity: 'high',
        actions: []
      }
    },
    privacyConfig: {
      level: 'private',
      anonymization: true,
      retention: {
        duration: 31536000000,
        conditions: [],
        actions: []
      }
    },
    anonymizationConfig: {
      techniques: ['k_anonymity', 'l_diversity', 'differential_privacy'],
      quality: 0.8,
      privacy: 0.9
    },
    auditConfig: {
      enabled: true,
      retention: 31536000000,
      compliance: ['gdpr', 'ccpa', 'hipaa']
    },
    monitoringConfig: {
      metrics: ['authentication', 'authorization', 'encryption', 'privacy'],
      alerts: [],
      dashboards: []
    }
  },
  communication: {
    mcpConfig: {
      server: 'localhost',
      port: 3000,
      protocol: 'ws',
      timeout: 30000,
      retries: 3
    },
    routingConfig: {
      strategy: 'round_robin',
      loadBalancing: true,
      failover: true
    },
    sessionConfig: {
      maxParticipants: 100,
      timeout: 3600000,
      persistence: true
    }
  }
};

// Mock implementation
class AIPersistenceImpl implements AIPersistence {
  constructor(private config: AIPersistenceConfig) {}

  async initialize(): Promise<void> {
    console.log('AI Persistence System initialized');
  }

  async shutdown(): Promise<void> {
    console.log('AI Persistence System shutdown');
  }
}
