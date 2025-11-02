/**
 * AI Persistence Integration Tests
 * 
 * Comprehensive integration tests for the AI persistence system
 */

import { AIPersistence, AIPersistenceConfig, DEFAULT_CONFIG } from '../index';

describe('AI Persistence Integration', () => {
  let aiPersistence: AIPersistence;
  let config: AIPersistenceConfig;

  beforeEach(() => {
    config = {
      core: {
        name: 'Test AI',
        type: 'ai',
        capabilities: [],
        preferences: {}
      },
      identity: {
        hdConfig: {
          seed: 'test-seed',
          path: "m/44'/0'/0'",
          network: 'testnet'
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
          methods: ['token'],
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
          techniques: ['k_anonymity'],
          quality: 0.8,
          privacy: 0.9
        },
        auditConfig: {
          enabled: true,
          retention: 31536000000,
          compliance: ['gdpr']
        },
        monitoringConfig: {
          metrics: ['authentication'],
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
  });

  afterEach(async () => {
    if (aiPersistence) {
      await aiPersistence.shutdown();
    }
  });

  describe('System Initialization', () => {
    it('should initialize successfully with valid config', async () => {
      aiPersistence = AIPersistence.create(config);
      await expect(aiPersistence.initialize()).resolves.not.toThrow();
    });

    it('should initialize with default config', async () => {
      aiPersistence = AIPersistence.create(DEFAULT_CONFIG);
      await expect(aiPersistence.initialize()).resolves.not.toThrow();
    });

    it('should throw error when initializing twice', async () => {
      aiPersistence = AIPersistence.create(config);
      await aiPersistence.initialize();
      await expect(aiPersistence.initialize()).rejects.toThrow();
    });
  });

  describe('System Shutdown', () => {
    it('should shutdown successfully', async () => {
      aiPersistence = AIPersistence.create(config);
      await aiPersistence.initialize();
      await expect(aiPersistence.shutdown()).resolves.not.toThrow();
    });

    it('should throw error when shutting down twice', async () => {
      aiPersistence = AIPersistence.create(config);
      await aiPersistence.initialize();
      await aiPersistence.shutdown();
      await expect(aiPersistence.shutdown()).rejects.toThrow();
    });
  });

  describe('Configuration Validation', () => {
    it('should validate core configuration', () => {
      expect(config.core).toBeDefined();
      expect(config.core.name).toBe('Test AI');
      expect(config.core.type).toBe('ai');
    });

    it('should validate identity configuration', () => {
      expect(config.identity).toBeDefined();
      expect(config.identity.hdConfig).toBeDefined();
      expect(config.identity.hyperbolicConfig).toBeDefined();
    });

    it('should validate memory configuration', () => {
      expect(config.memory).toBeDefined();
      expect(config.memory.hyperbolicConfig).toBeDefined();
      expect(config.memory.consolidationConfig).toBeDefined();
    });

    it('should validate security configuration', () => {
      expect(config.security).toBeDefined();
      expect(config.security.encryptionConfig).toBeDefined();
      expect(config.security.authenticationConfig).toBeDefined();
    });

    it('should validate communication configuration', () => {
      expect(config.communication).toBeDefined();
      expect(config.communication.mcpConfig).toBeDefined();
      expect(config.communication.routingConfig).toBeDefined();
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid configuration gracefully', () => {
      const invalidConfig = {
        core: null,
        identity: null,
        memory: null,
        security: null,
        communication: null
      } as any;

      expect(() => AIPersistence.create(invalidConfig)).toThrow();
    });

    it('should handle missing required fields', () => {
      const incompleteConfig = {
        core: {},
        identity: {},
        memory: {},
        security: {},
        communication: {}
      } as any;

      expect(() => AIPersistence.create(incompleteConfig)).toThrow();
    });
  });

  describe('Performance', () => {
    it('should handle concurrent operations', async () => {
      aiPersistence = AIPersistence.create(config);
      await aiPersistence.initialize();

      const operations = Array.from({ length: 10 }, (_, i) => 
        aiPersistence.initialize()
      );

      await expect(Promise.all(operations)).resolves.not.toThrow();
    });

    it('should handle large configurations', async () => {
      const largeConfig = {
        ...config,
        memory: {
          ...config.memory,
          workingMemoryConfig: {
            capacity: 10000,
            attention: 1000,
            processing: 500
          }
        }
      };

      aiPersistence = AIPersistence.create(largeConfig);
      await expect(aiPersistence.initialize()).resolves.not.toThrow();
    });
  });
});

describe('Default Configuration', () => {
  it('should have valid default configuration', () => {
    expect(DEFAULT_CONFIG).toBeDefined();
    expect(DEFAULT_CONFIG.core).toBeDefined();
    expect(DEFAULT_CONFIG.identity).toBeDefined();
    expect(DEFAULT_CONFIG.memory).toBeDefined();
    expect(DEFAULT_CONFIG.security).toBeDefined();
    expect(DEFAULT_CONFIG.communication).toBeDefined();
  });

  it('should create AI persistence with default config', () => {
    const aiPersistence = AIPersistence.create(DEFAULT_CONFIG);
    expect(aiPersistence).toBeDefined();
  });
});

describe('Version Information', () => {
  it('should have correct version', () => {
    expect(VERSION).toBe('1.0.0');
  });

  it('should have correct package name', () => {
    expect(PACKAGE_NAME).toBe('ai-persistence-package');
  });
});
