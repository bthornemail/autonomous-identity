/**
 * File-Based Persistence Integration Tests
 * 
 * Tests the complete file-based persistence system integration
 */

import { AIPersistenceCore, PersistenceConfig, DEFAULT_CONFIG } from '../core';
import { promises as fs } from 'fs';
import { join } from 'path';

describe('File-Based Persistence Integration', () => {
  let aiPersistence: AIPersistenceCore;
  let config: PersistenceConfig;
  const stateFile = 'state.json';

  beforeEach(() => {
    config = {
      identity: {
        name: 'File Persistence AI',
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
    if (aiPersistence) {
      await aiPersistence.shutdown();
    }
    
    // Clean up state file
    try {
      await fs.unlink(stateFile);
    } catch (error) {
      // File might not exist, ignore error
    }
  });

  describe('File-Based State Persistence', () => {
    it('should save state to file and load it back', async () => {
      aiPersistence = AIPersistenceCore.create(config);
      await aiPersistence.initialize();

      // Create some data
      const identity = await aiPersistence.createIdentity({
        name: 'Test AI',
        type: 'ai',
        capabilities: [],
        preferences: {}
      });

      await aiPersistence.learnConcept({
        concept: 'machine learning',
        data: { algorithms: ['neural networks'] },
        context: { domain: 'ai' },
        performance: 0.9
      });

      await aiPersistence.storeMemory({
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

      // Save state
      await aiPersistence.saveState();

      // Verify file was created
      const fileExists = await fs.access(stateFile).then(() => true).catch(() => false);
      expect(fileExists).toBe(true);

      // Read and verify file content
      const fileContent = await fs.readFile(stateFile, 'utf8');
      const stateData = JSON.parse(fileContent);
      expect(stateData).toBeDefined();
      expect(stateData.data).toBeDefined();
    });

    it('should restore state from file on initialization', async () => {
      // First session - create and save data
      aiPersistence = AIPersistenceCore.create(config);
      await aiPersistence.initialize();

      const identity = await aiPersistence.createIdentity({
        name: 'Persistent AI',
        type: 'ai',
        capabilities: [],
        preferences: {}
      });

      await aiPersistence.learnConcept({
        concept: 'quantum computing',
        data: { complexity: 'advanced' },
        context: { domain: 'physics' },
        performance: 0.95
      });

      await aiPersistence.storeMemory({
        type: 'semantic',
        content: 'Quantum algorithms',
        metadata: {
          source: 'learning',
          quality: 0.9,
          confidence: 0.95,
          importance: 0.9,
          tags: ['quantum', 'algorithms'],
          context: {}
        }
      });

      await aiPersistence.saveState();
      await aiPersistence.shutdown();

      // Second session - restore and verify
      const aiPersistence2 = AIPersistenceCore.create(config);
      await aiPersistence2.initialize();

      // Verify identity was restored
      const restoredIdentity = await aiPersistence2.getIdentity(identity.id);
      expect(restoredIdentity).toBeDefined();
      expect(restoredIdentity.name).toBe('Persistent AI');

      // Verify learning progress was restored
      const progress = await aiPersistence2.getLearningProgress();
      expect(progress.length).toBeGreaterThan(0);
      expect(progress.some(p => p.concept === 'quantum computing')).toBe(true);

      // Verify memories were restored
      const memories = await aiPersistence2.retrieveMemory({
        type: 'semantic',
        content: 'Quantum',
        limit: 10
      });
      expect(memories.length).toBeGreaterThan(0);
      expect(memories[0].content).toContain('Quantum algorithms');

      await aiPersistence2.shutdown();
    });

    it('should handle missing state file gracefully', async () => {
      // Ensure no state file exists
      try {
        await fs.unlink(stateFile);
      } catch (error) {
        // File might not exist, ignore
      }

      aiPersistence = AIPersistenceCore.create(config);
      await expect(aiPersistence.initialize()).resolves.not.toThrow();
      
      // Should start with empty state
      const state = await aiPersistence.getState();
      expect(state.identities).toHaveLength(0);
      expect(state.memories).toHaveLength(0);
      expect(state.learningProgress).toHaveLength(0);
    });

    it('should handle corrupted state file gracefully', async () => {
      // Create a corrupted state file
      await fs.writeFile(stateFile, 'invalid json content', 'utf8');

      aiPersistence = AIPersistenceCore.create(config);
      await expect(aiPersistence.initialize()).resolves.not.toThrow();
      
      // Should start with empty state
      const state = await aiPersistence.getState();
      expect(state.identities).toHaveLength(0);
    });
  });

  describe('Memory System Integration', () => {
    beforeEach(async () => {
      aiPersistence = AIPersistenceCore.create(config);
      await aiPersistence.initialize();
    });

    it('should integrate memory system with file persistence', async () => {
      // Store memories through the core system
      await aiPersistence.storeMemory({
        type: 'episodic',
        content: 'Important meeting',
        metadata: {
          source: 'user',
          quality: 0.9,
          confidence: 0.8,
          importance: 0.9,
          tags: ['meeting', 'important'],
          context: {}
        }
      });

      await aiPersistence.storeMemory({
        type: 'semantic',
        content: 'Business concepts',
        metadata: {
          source: 'learning',
          quality: 0.8,
          confidence: 0.9,
          importance: 0.7,
          tags: ['business', 'concepts'],
          context: {}
        }
      });

      // Save state
      await aiPersistence.saveState();

      // Verify memories are in the system
      const memories = await aiPersistence.retrieveMemory({
        type: 'episodic',
        content: 'meeting',
        limit: 10
      });
      expect(memories.length).toBeGreaterThan(0);

      // Shutdown and restart
      await aiPersistence.shutdown();
      
      const aiPersistence2 = AIPersistenceCore.create(config);
      await aiPersistence2.initialize();

      // Verify memories were restored
      const restoredMemories = await aiPersistence2.retrieveMemory({
        type: 'episodic',
        content: 'meeting',
        limit: 10
      });
      expect(restoredMemories.length).toBeGreaterThan(0);
      expect(restoredMemories[0].content).toContain('Important meeting');

      await aiPersistence2.shutdown();
    });

    it('should maintain memory consolidation across sessions', async () => {
      // Store multiple memories
      for (let i = 0; i < 5; i++) {
        await aiPersistence.storeMemory({
          type: 'episodic',
          content: `Event ${i}`,
          metadata: {
            source: 'user',
            quality: 0.8,
            confidence: 0.9,
            importance: 0.7,
            tags: [`event-${i}`],
            context: {}
          }
        });
      }

      // Consolidate memories
      await aiPersistence.consolidateMemory();

      // Save state
      await aiPersistence.saveState();

      // Restart and verify consolidation is maintained
      await aiPersistence.shutdown();
      
      const aiPersistence2 = AIPersistenceCore.create(config);
      await aiPersistence2.initialize();

      const memories = await aiPersistence2.retrieveMemory({
        type: 'episodic',
        limit: 10
      });
      expect(memories.length).toBe(5);
    });
  });

  describe('Checkpoint Persistence', () => {
    beforeEach(async () => {
      aiPersistence = AIPersistenceCore.create(config);
      await aiPersistence.initialize();
    });

    it('should persist checkpoints to file', async () => {
      // Create a checkpoint
      const checkpoint = await aiPersistence.createCheckpoint({
        name: 'milestone_checkpoint',
        description: 'Major learning milestone',
        timestamp: new Date()
      });

      // Save state (includes checkpoints)
      await aiPersistence.saveState();

      // Restart and verify checkpoint is restored
      await aiPersistence.shutdown();
      
      const aiPersistence2 = AIPersistenceCore.create(config);
      await aiPersistence2.initialize();

      const lastCheckpoint = await aiPersistence2.getLastCheckpoint();
      expect(lastCheckpoint).toBeDefined();
      expect(lastCheckpoint?.name).toBe('milestone_checkpoint');
    });

    it('should restore from checkpoint', async () => {
      // Create some data
      await aiPersistence.learnConcept({
        concept: 'test concept',
        data: { test: true },
        context: { domain: 'testing' },
        performance: 0.8
      });

      // Create checkpoint
      const checkpoint = await aiPersistence.createCheckpoint({
        name: 'test_checkpoint',
        description: 'Test checkpoint',
        timestamp: new Date()
      });

      // Save state
      await aiPersistence.saveState();

      // Restart and restore from checkpoint
      await aiPersistence.shutdown();
      
      const aiPersistence2 = AIPersistenceCore.create(config);
      await aiPersistence2.initialize();

      const lastCheckpoint = await aiPersistence2.getLastCheckpoint();
      if (lastCheckpoint) {
        await aiPersistence2.restoreFromCheckpoint(lastCheckpoint);
        
        // Verify data was restored
        const progress = await aiPersistence2.getLearningProgress();
        expect(progress.length).toBeGreaterThan(0);
        expect(progress[0].concept).toBe('test concept');
      }
    });
  });

  describe('Error Handling', () => {
    it('should handle file system errors gracefully', async () => {
      // Mock fs.writeFile to throw an error
      const originalWriteFile = fs.writeFile;
      fs.writeFile = jest.fn().mockRejectedValue(new Error('File system error'));

      aiPersistence = AIPersistenceCore.create(config);
      await aiPersistence.initialize();

      await aiPersistence.learnConcept({
        concept: 'test',
        data: {},
        context: {},
        performance: 0.5
      });

      // Should not throw error even if file write fails
      await expect(aiPersistence.saveState()).resolves.not.toThrow();

      // Restore original function
      fs.writeFile = originalWriteFile;
    });

    it('should handle file read errors gracefully', async () => {
      // Mock fs.readFile to throw an error
      const originalReadFile = fs.readFile;
      fs.readFile = jest.fn().mockRejectedValue(new Error('File read error'));

      aiPersistence = AIPersistenceCore.create(config);
      await expect(aiPersistence.initialize()).resolves.not.toThrow();

      // Should start with empty state
      const state = await aiPersistence.getState();
      expect(state.identities).toHaveLength(0);

      // Restore original function
      fs.readFile = originalReadFile;
    });
  });

  describe('Performance', () => {
    it('should handle large state files efficiently', async () => {
      aiPersistence = AIPersistenceCore.create(config);
      await aiPersistence.initialize();

      // Create large amount of data
      for (let i = 0; i < 100; i++) {
        await aiPersistence.storeMemory({
          type: 'episodic',
          content: `Memory ${i}`,
          metadata: {
            source: 'test',
            quality: 0.8,
            confidence: 0.9,
            importance: 0.7,
            tags: [`memory-${i}`],
            context: {}
          }
        });
      }

      // Measure save time
      const startTime = Date.now();
      await aiPersistence.saveState();
      const saveTime = Date.now() - startTime;

      expect(saveTime).toBeLessThan(5000); // Should complete within 5 seconds

      // Measure load time
      await aiPersistence.shutdown();
      
      const loadStartTime = Date.now();
      const aiPersistence2 = AIPersistenceCore.create(config);
      await aiPersistence2.initialize();
      const loadTime = Date.now() - loadStartTime;

      expect(loadTime).toBeLessThan(5000); // Should complete within 5 seconds

      await aiPersistence2.shutdown();
    });
  });
});
