/**
 * Simplified AI Persistence Tests
 * 
 * Tests the simplified AI persistence implementation
 */

import { SimplifiedAIPersistence, createAIPersistence, DEFAULT_CONFIG } from '../core/src/implementations/SimplifiedAIPersistence';
import { promises as fs } from 'fs';
import { join } from 'path';

describe('Simplified AI Persistence', () => {
  let aiPersistence: SimplifiedAIPersistence;
  const testStoragePath = './test-persistence';

  beforeEach(async () => {
    // Clean up test storage
    try {
      await fs.rmdir(testStoragePath, { recursive: true });
    } catch (error) {
      // Directory might not exist, ignore
    }

    // Create AI persistence with test config
    aiPersistence = createAIPersistence({
      ...DEFAULT_CONFIG,
      storagePath: testStoragePath
    });
  });

  afterEach(async () => {
    if (aiPersistence) {
      await aiPersistence.shutdown();
    }
    
    // Clean up test storage
    try {
      await fs.rmdir(testStoragePath, { recursive: true });
    } catch (error) {
      // Ignore cleanup errors
    }
  });

  describe('Initialization', () => {
    it('should initialize successfully', async () => {
      await expect(aiPersistence.initialize()).resolves.not.toThrow();
      
      const status = await aiPersistence.getStatus();
      expect(status.initialized).toBe(true);
    });

    it('should not initialize twice', async () => {
      await aiPersistence.initialize();
      await expect(aiPersistence.initialize()).rejects.toThrow('AI Persistence is already initialized');
    });
  });

  describe('Identity Management', () => {
    beforeEach(async () => {
      await aiPersistence.initialize();
    });

    it('should create an AI identity', async () => {
      const identity = await aiPersistence.createIdentity({
        name: 'Test AI',
        type: 'ai',
        capabilities: ['learning', 'reasoning'],
        preferences: { language: 'en' }
      });

      expect(identity.id).toBeDefined();
      expect(identity.name).toBe('Test AI');
      expect(identity.type).toBe('ai');
      expect(identity.capabilities).toEqual(['learning', 'reasoning']);
    });

    it('should get an AI identity', async () => {
      const identity = await aiPersistence.createIdentity({
        name: 'Test AI',
        type: 'ai',
        capabilities: ['learning'],
        preferences: {}
      });

      const retrieved = await aiPersistence.getIdentity(identity.id);
      expect(retrieved).toBeDefined();
      expect(retrieved?.name).toBe('Test AI');
    });

    it('should update an AI identity', async () => {
      const identity = await aiPersistence.createIdentity({
        name: 'Test AI',
        type: 'ai',
        capabilities: ['learning'],
        preferences: {}
      });

      const updated = await aiPersistence.updateIdentity(identity.id, {
        name: 'Updated AI',
        capabilities: ['learning', 'reasoning']
      });

      expect(updated?.name).toBe('Updated AI');
      expect(updated?.capabilities).toEqual(['learning', 'reasoning']);
    });
  });

  describe('Memory Management', () => {
    beforeEach(async () => {
      await aiPersistence.initialize();
    });

    it('should store a memory', async () => {
      const memory = await aiPersistence.storeMemory({
        type: 'episodic',
        content: 'User asked about AI',
        metadata: { source: 'user', importance: 0.8 }
      });

      expect(memory.id).toBeDefined();
      expect(memory.type).toBe('episodic');
      expect(memory.content).toBe('User asked about AI');
    });

    it('should retrieve memories', async () => {
      await aiPersistence.storeMemory({
        type: 'episodic',
        content: 'First memory',
        metadata: {}
      });

      await aiPersistence.storeMemory({
        type: 'semantic',
        content: 'Second memory',
        metadata: {}
      });

      const memories = await aiPersistence.retrieveMemory({ type: 'episodic' });
      expect(memories).toHaveLength(1);
      expect(memories[0].content).toBe('First memory');
    });

    it('should filter memories by content', async () => {
      await aiPersistence.storeMemory({
        type: 'episodic',
        content: 'AI learning session',
        metadata: {}
      });

      await aiPersistence.storeMemory({
        type: 'episodic',
        content: 'User interaction',
        metadata: {}
      });

      const memories = await aiPersistence.retrieveMemory({ content: 'AI' });
      expect(memories).toHaveLength(1);
      expect(memories[0].content).toBe('AI learning session');
    });
  });

  describe('Learning Progress', () => {
    beforeEach(async () => {
      await aiPersistence.initialize();
    });

    it('should learn a concept', async () => {
      const progress = await aiPersistence.learnConcept({
        concept: 'machine learning',
        data: { algorithms: ['neural networks'] },
        context: { domain: 'ai' },
        performance: 0.9
      });

      expect(progress.id).toBeDefined();
      expect(progress.concept).toBe('machine learning');
      expect(progress.performance).toBe(0.9);
    });

    it('should get learning progress', async () => {
      await aiPersistence.learnConcept({
        concept: 'concept1',
        data: {},
        context: {},
        performance: 0.8
      });

      await aiPersistence.learnConcept({
        concept: 'concept2',
        data: {},
        context: {},
        performance: 0.9
      });

      const progress = await aiPersistence.getLearningProgress();
      expect(progress).toHaveLength(2);
      expect(progress[0].concept).toBe('concept2'); // Should be sorted by timestamp
    });
  });

  describe('Checkpoints', () => {
    beforeEach(async () => {
      await aiPersistence.initialize();
    });

    it('should create a checkpoint', async () => {
      const checkpoint = await aiPersistence.createCheckpoint({
        name: 'milestone',
        description: 'Important milestone',
        data: { version: '1.0' }
      });

      expect(checkpoint.id).toBeDefined();
      expect(checkpoint.name).toBe('milestone');
    });

    it('should get the last checkpoint', async () => {
      await aiPersistence.createCheckpoint({
        name: 'first',
        description: 'First checkpoint',
        data: {}
      });

      await aiPersistence.createCheckpoint({
        name: 'second',
        description: 'Second checkpoint',
        data: {}
      });

      const lastCheckpoint = await aiPersistence.getLastCheckpoint();
      expect(lastCheckpoint?.name).toBe('second');
    });
  });

  describe('State Persistence', () => {
    it('should save and load state', async () => {
      await aiPersistence.initialize();

      // Create some data
      const identity = await aiPersistence.createIdentity({
        name: 'Test AI',
        type: 'ai',
        capabilities: ['learning'],
        preferences: {}
      });

      await aiPersistence.storeMemory({
        type: 'episodic',
        content: 'Test memory',
        metadata: {}
      });

      await aiPersistence.learnConcept({
        concept: 'test concept',
        data: {},
        context: {},
        performance: 0.8
      });

      // Save state
      await aiPersistence.saveState();
      await aiPersistence.shutdown();

      // Create new instance and load state
      const newAIPersistence = createAIPersistence({
        ...DEFAULT_CONFIG,
        storagePath: testStoragePath
      });

      await newAIPersistence.initialize();

      // Verify data was restored
      const state = await newAIPersistence.getState();
      expect(state.identities).toHaveLength(1);
      expect(state.memories).toHaveLength(1);
      expect(state.learningProgress).toHaveLength(1);

      await newAIPersistence.shutdown();
    });

    it('should handle missing state file gracefully', async () => {
      // Should not throw error when no state file exists
      await expect(aiPersistence.initialize()).resolves.not.toThrow();
      
      const status = await aiPersistence.getStatus();
      expect(status.initialized).toBe(true);
      expect(status.identities).toBe(0);
    });
  });

  describe('System Status', () => {
    beforeEach(async () => {
      await aiPersistence.initialize();
    });

    it('should return correct status', async () => {
      const status = await aiPersistence.getStatus();
      
      expect(status.initialized).toBe(true);
      expect(status.identities).toBe(0);
      expect(status.memories).toBe(0);
      expect(status.learningProgress).toBe(0);
      expect(status.checkpoints).toBe(0);
    });

    it('should update status after operations', async () => {
      await aiPersistence.createIdentity({
        name: 'Test AI',
        type: 'ai',
        capabilities: [],
        preferences: {}
      });

      await aiPersistence.storeMemory({
        type: 'episodic',
        content: 'Test',
        metadata: {}
      });

      const status = await aiPersistence.getStatus();
      expect(status.identities).toBe(1);
      expect(status.memories).toBe(1);
    });
  });

  describe('Error Handling', () => {
    it('should throw error for operations before initialization', async () => {
      await expect(aiPersistence.createIdentity({
        name: 'Test',
        type: 'ai',
        capabilities: [],
        preferences: {}
      })).rejects.toThrow('AI Persistence is not initialized');
    });

    it('should throw error for operations after shutdown', async () => {
      await aiPersistence.initialize();
      await aiPersistence.shutdown();

      await expect(aiPersistence.createIdentity({
        name: 'Test',
        type: 'ai',
        capabilities: [],
        preferences: {}
      })).rejects.toThrow('AI Persistence is not initialized');
    });
  });
});
