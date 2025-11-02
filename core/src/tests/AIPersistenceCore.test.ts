/**
 * AI Persistence Core Tests
 * 
 * Comprehensive test suite for the AI persistence system
 */

import { AIPersistenceCore, PersistenceConfig, DEFAULT_CONFIG } from '../index';
import { IdentityConfig, MemoryConfig, SecurityConfig } from '../types/identity';

describe('AIPersistenceCore', () => {
  let persistenceCore: AIPersistenceCore;
  let config: PersistenceConfig;

  beforeEach(() => {
    config = {
      identity: {
        name: 'Test AI',
        type: 'ai',
        capabilities: [],
        preferences: {}
      },
      memory: {
        storage: {
          type: 'file',
          path: './test-persistence',
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
  });

  afterEach(async () => {
    if (persistenceCore) {
      await persistenceCore.shutdown();
    }
  });

  describe('Initialization', () => {
    it('should initialize successfully with valid config', async () => {
      persistenceCore = AIPersistenceCore.create(config);
      await expect(persistenceCore.initialize()).resolves.not.toThrow();
    });

    it('should throw error when initializing twice', async () => {
      persistenceCore = AIPersistenceCore.create(config);
      await persistenceCore.initialize();
      await expect(persistenceCore.initialize()).rejects.toThrow('AI Persistence Core is already initialized');
    });

    it('should throw error when operating before initialization', async () => {
      persistenceCore = AIPersistenceCore.create(config);
      await expect(persistenceCore.getStatus()).rejects.toThrow('AI Persistence Core is not initialized');
    });
  });

  describe('System Status', () => {
    beforeEach(async () => {
      persistenceCore = AIPersistenceCore.create(config);
      await persistenceCore.initialize();
    });

    it('should return system status', async () => {
      const status = await persistenceCore.getStatus();
      expect(status).toBeDefined();
      expect(status.status).toBe('running');
      expect(status.uptime).toBeGreaterThan(0);
      expect(status.memory).toBeDefined();
      expect(status.performance).toBeDefined();
      expect(status.security).toBeDefined();
    });

    it('should return health status', async () => {
      const health = await persistenceCore.getHealth();
      expect(health).toBeDefined();
      expect(health.healthy).toBe(true);
      expect(health.components).toBeDefined();
      expect(health.metrics).toBeDefined();
      expect(health.alerts).toBeDefined();
    });
  });

  describe('Identity Management', () => {
    beforeEach(async () => {
      persistenceCore = AIPersistenceCore.create(config);
      await persistenceCore.initialize();
    });

    it('should create identity successfully', async () => {
      const identityConfig = {
        name: 'Test AI Identity',
        type: 'ai',
        capabilities: [],
        preferences: {}
      };

      const identity = await persistenceCore.createIdentity(identityConfig);
      expect(identity).toBeDefined();
      expect(identity.id).toBeDefined();
      expect(identity.name).toBe('Test AI Identity');
      expect(identity.status).toBe('active');
    });

    it('should retrieve identity successfully', async () => {
      const identityConfig = {
        name: 'Test AI Identity',
        type: 'ai',
        capabilities: [],
        preferences: {}
      };

      const createdIdentity = await persistenceCore.createIdentity(identityConfig);
      const retrievedIdentity = await persistenceCore.getIdentity(createdIdentity.id);
      
      expect(retrievedIdentity).toBeDefined();
      expect(retrievedIdentity.id).toBe(createdIdentity.id);
      expect(retrievedIdentity.name).toBe('Test AI Identity');
    });

    it('should update identity successfully', async () => {
      const identityConfig = {
        name: 'Test AI Identity',
        type: 'ai',
        capabilities: [],
        preferences: {}
      };

      const identity = await persistenceCore.createIdentity(identityConfig);
      const updates = {
        name: 'Updated AI Identity',
        capabilities: [{ id: 'test', name: 'Test Capability', level: 0.8 }]
      };

      const updatedIdentity = await persistenceCore.updateIdentity(identity.id, updates);
      expect(updatedIdentity.name).toBe('Updated AI Identity');
      expect(updatedIdentity.capabilities).toHaveLength(1);
    });

    it('should delete identity successfully', async () => {
      const identityConfig = {
        name: 'Test AI Identity',
        type: 'ai',
        capabilities: [],
        preferences: {}
      };

      const identity = await persistenceCore.createIdentity(identityConfig);
      await expect(persistenceCore.deleteIdentity(identity.id)).resolves.not.toThrow();
      await expect(persistenceCore.getIdentity(identity.id)).rejects.toThrow();
    });

    it('should throw error when getting non-existent identity', async () => {
      await expect(persistenceCore.getIdentity('non-existent-id')).rejects.toThrow();
    });
  });

  describe('Memory Management', () => {
    beforeEach(async () => {
      persistenceCore = AIPersistenceCore.create(config);
      await persistenceCore.initialize();
    });

    it('should store memory successfully', async () => {
      const memory = {
        type: 'episodic',
        content: 'Test memory content',
        metadata: {
          source: 'test',
          quality: 0.8,
          confidence: 0.9,
          importance: 0.7,
          tags: ['test'],
          context: {}
        }
      };

      await expect(persistenceCore.storeMemory(memory)).resolves.not.toThrow();
    });

    it('should retrieve memories successfully', async () => {
      const memory = {
        type: 'episodic',
        content: 'Test memory content',
        metadata: {
          source: 'test',
          quality: 0.8,
          confidence: 0.9,
          importance: 0.7,
          tags: ['test'],
          context: {}
        }
      };

      await persistenceCore.storeMemory(memory);
      const query = {
        type: 'episodic',
        content: 'Test',
        limit: 10
      };

      const memories = await persistenceCore.retrieveMemory(query);
      expect(memories).toBeDefined();
      expect(Array.isArray(memories)).toBe(true);
    });

    it('should consolidate memories successfully', async () => {
      await expect(persistenceCore.consolidateMemory()).resolves.not.toThrow();
    });

    it('should compress memories successfully', async () => {
      await expect(persistenceCore.compressMemory()).resolves.not.toThrow();
    });
  });

  describe('Security Operations', () => {
    beforeEach(async () => {
      persistenceCore = AIPersistenceCore.create(config);
      await persistenceCore.initialize();
    });

    it('should authenticate successfully', async () => {
      const credentials = {
        type: 'token',
        value: 'test-token',
        metadata: {}
      };

      const result = await persistenceCore.authenticate(credentials);
      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.token).toBeDefined();
    });

    it('should authorize successfully', async () => {
      const authorized = await persistenceCore.authorize('test-identity', 'test-resource', 'read');
      expect(authorized).toBe(true);
    });

    it('should encrypt data successfully', async () => {
      const data = { test: 'data' };
      const encrypted = await persistenceCore.encrypt(data);
      expect(encrypted).toBeDefined();
      expect(encrypted.data).toBeDefined();
      expect(encrypted.algorithm).toBeDefined();
    });

    it('should decrypt data successfully', async () => {
      const data = { test: 'data' };
      const encrypted = await persistenceCore.encrypt(data);
      const decrypted = await persistenceCore.decrypt(encrypted);
      expect(decrypted).toEqual(data);
    });
  });

  describe('Shutdown', () => {
    it('should shutdown successfully', async () => {
      persistenceCore = AIPersistenceCore.create(config);
      await persistenceCore.initialize();
      await expect(persistenceCore.shutdown()).resolves.not.toThrow();
    });

    it('should throw error when shutting down twice', async () => {
      persistenceCore = AIPersistenceCore.create(config);
      await persistenceCore.initialize();
      await persistenceCore.shutdown();
      await expect(persistenceCore.shutdown()).rejects.toThrow('AI Persistence Core is not initialized');
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid configuration gracefully', async () => {
      const invalidConfig = {
        identity: null,
        memory: null,
        security: null
      } as any;

      expect(() => AIPersistenceCore.create(invalidConfig)).toThrow();
    });

    it('should handle memory operations with invalid data', async () => {
      persistenceCore = AIPersistenceCore.create(config);
      await persistenceCore.initialize();

      const invalidMemory = {
        type: 'invalid',
        content: null,
        metadata: null
      } as any;

      await expect(persistenceCore.storeMemory(invalidMemory)).resolves.not.toThrow();
    });
  });

  describe('Performance', () => {
    beforeEach(async () => {
      persistenceCore = AIPersistenceCore.create(config);
      await persistenceCore.initialize();
    });

    it('should handle multiple concurrent operations', async () => {
      const operations = Array.from({ length: 10 }, (_, i) => 
        persistenceCore.createIdentity({
          name: `Test AI ${i}`,
          type: 'ai',
          capabilities: [],
          preferences: {}
        })
      );

      const identities = await Promise.all(operations);
      expect(identities).toHaveLength(10);
      identities.forEach(identity => {
        expect(identity).toBeDefined();
        expect(identity.id).toBeDefined();
      });
    });

    it('should handle large memory operations', async () => {
      const memories = Array.from({ length: 100 }, (_, i) => ({
        type: 'episodic',
        content: `Test memory ${i}`,
        metadata: {
          source: 'test',
          quality: 0.8,
          confidence: 0.9,
          importance: 0.7,
          tags: ['test'],
          context: {}
        }
      }));

      const storePromises = memories.map(memory => persistenceCore.storeMemory(memory));
      await expect(Promise.all(storePromises)).resolves.not.toThrow();
    });
  });
});

describe('Default Configuration', () => {
  it('should have valid default configuration', () => {
    expect(DEFAULT_CONFIG).toBeDefined();
    expect(DEFAULT_CONFIG.identity).toBeDefined();
    expect(DEFAULT_CONFIG.memory).toBeDefined();
    expect(DEFAULT_CONFIG.security).toBeDefined();
  });

  it('should create persistence core with default config', () => {
    const persistenceCore = AIPersistenceCore.create(DEFAULT_CONFIG);
    expect(persistenceCore).toBeDefined();
  });
});

describe('Version Information', () => {
  it('should have correct version', () => {
    expect(VERSION).toBe('1.0.0');
  });

  it('should have correct package name', () => {
    expect(PACKAGE_NAME).toBe('@h2gnn/ai-persistence-core');
  });
});
