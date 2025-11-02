#!/usr/bin/env tsx

/**
 * AI Identity Persistence Verification Script
 * 
 * This script demonstrates and verifies that AI identity is properly maintained
 * across system restarts, session changes, and memory consolidation.
 */

import { AIPersistence } from '../core';
import { IdentityManager } from '../identity';
import { MemorySystem } from '../memory';
import { SecurityManager } from '../security';
import { CommunicationProtocol } from '../communication';

interface VerificationResult {
  test: string;
  passed: boolean;
  details: string;
  timestamp: Date;
}

class AIPersistenceVerifier {
  private results: VerificationResult[] = [];
  private aiPersistence: AIPersistence;
  private identityManager: IdentityManager;
  private memorySystem: MemorySystem;
  private securityManager: SecurityManager;
  private communicationProtocol: CommunicationProtocol;

  constructor() {
    this.aiPersistence = AIPersistence.create({
      storagePath: './test-persistence',
      maxMemories: 1000,
      consolidationThreshold: 50,
      embeddingDim: 64,
      numLayers: 3,
      curvature: -1
    });
  }

  async initialize(): Promise<void> {
    await this.aiPersistence.initialize();
    
    this.identityManager = this.aiPersistence.getIdentityManager();
    this.memorySystem = this.aiPersistence.getMemorySystem();
    this.securityManager = this.aiPersistence.getSecurityManager();
    this.communicationProtocol = this.aiPersistence.getCommunicationProtocol();
  }

  async shutdown(): Promise<void> {
    await this.aiPersistence.shutdown();
  }

  private addResult(test: string, passed: boolean, details: string): void {
    this.results.push({
      test,
      passed,
      details,
      timestamp: new Date()
    });
  }

  async verifyIdentityCreation(): Promise<void> {
    console.log('🔍 Verifying AI Identity Creation...');
    
    try {
      // Create AI identity
      const identity = await this.identityManager.createIdentity({
        name: 'Persistence Test AI',
        type: 'ai',
        capabilities: [
          {
            id: 'reasoning',
            name: 'Logical Reasoning',
            level: 0.95,
            confidence: 0.98
          },
          {
            id: 'creativity',
            name: 'Creative Thinking',
            level: 0.85,
            confidence: 0.9
          },
          {
            id: 'learning',
            name: 'Continuous Learning',
            level: 0.9,
            confidence: 0.95
          }
        ],
        preferences: {
          learningStyle: 'comprehensive',
          communicationStyle: 'adaptive',
          responseLength: 'detailed'
        }
      });

      // Verify identity properties
      const hasValidId = identity.id && identity.id.length > 0;
      const hasValidName = identity.name === 'Persistence Test AI';
      const hasValidType = identity.type === 'ai';
      const hasCapabilities = identity.capabilities.length === 3;
      const hasPreferences = identity.preferences && Object.keys(identity.preferences).length > 0;

      // Generate HD address
      const hdAddress = await this.identityManager.generateHDAddress(identity.id);
      const hasValidHDAddress = hdAddress && hdAddress.match(/^m\/\d+'\/\d+'\/\d+'\/\d+\/\d+$/);

      // Store identity
      await this.identityManager.storeIdentity(identity);

      const allChecksPassed = hasValidId && hasValidName && hasValidType && 
                             hasCapabilities && hasPreferences && hasValidHDAddress;

      this.addResult(
        'Identity Creation',
        allChecksPassed,
        `Identity created with ID: ${identity.id}, HD Address: ${hdAddress}`
      );

      console.log(`✅ Identity Creation: ${allChecksPassed ? 'PASSED' : 'FAILED'}`);
      console.log(`   ID: ${identity.id}`);
      console.log(`   HD Address: ${hdAddress}`);
      console.log(`   Capabilities: ${identity.capabilities.length}`);
      console.log(`   Preferences: ${Object.keys(identity.preferences).length}`);

    } catch (error) {
      this.addResult('Identity Creation', false, `Error: ${error.message}`);
      console.log(`❌ Identity Creation: FAILED - ${error.message}`);
    }
  }

  async verifyIdentityPersistence(): Promise<void> {
    console.log('🔍 Verifying AI Identity Persistence...');
    
    try {
      // Create and store identity
      const originalIdentity = await this.identityManager.createIdentity({
        name: 'Persistent AI',
        type: 'ai',
        capabilities: [
          {
            id: 'analysis',
            name: 'Data Analysis',
            level: 0.95,
            confidence: 0.98
          }
        ],
        preferences: {
          learningStyle: 'analytical',
          communicationStyle: 'technical'
        }
      });

      await this.identityManager.storeIdentity(originalIdentity);
      const originalHDAddress = await this.identityManager.generateHDAddress(originalIdentity.id);

      // Simulate system restart
      await this.shutdown();
      await this.initialize();

      // Restore identity
      const restoredIdentity = await this.identityManager.restoreIdentity(originalIdentity.id);
      const restoredHDAddress = await this.identityManager.generateHDAddress(restoredIdentity.id);

      // Verify persistence
      const idMatches = restoredIdentity.id === originalIdentity.id;
      const nameMatches = restoredIdentity.name === originalIdentity.name;
      const typeMatches = restoredIdentity.type === originalIdentity.type;
      const capabilitiesMatch = JSON.stringify(restoredIdentity.capabilities) === JSON.stringify(originalIdentity.capabilities);
      const preferencesMatch = JSON.stringify(restoredIdentity.preferences) === JSON.stringify(originalIdentity.preferences);
      const hdAddressMatches = restoredHDAddress === originalHDAddress;

      const allChecksPassed = idMatches && nameMatches && typeMatches && 
                             capabilitiesMatch && preferencesMatch && hdAddressMatches;

      this.addResult(
        'Identity Persistence',
        allChecksPassed,
        `Identity restored with ID: ${restoredIdentity.id}, HD Address: ${restoredHDAddress}`
      );

      console.log(`✅ Identity Persistence: ${allChecksPassed ? 'PASSED' : 'FAILED'}`);
      console.log(`   ID Match: ${idMatches}`);
      console.log(`   Name Match: ${nameMatches}`);
      console.log(`   Type Match: ${typeMatches}`);
      console.log(`   Capabilities Match: ${capabilitiesMatch}`);
      console.log(`   Preferences Match: ${preferencesMatch}`);
      console.log(`   HD Address Match: ${hdAddressMatches}`);

    } catch (error) {
      this.addResult('Identity Persistence', false, `Error: ${error.message}`);
      console.log(`❌ Identity Persistence: FAILED - ${error.message}`);
    }
  }

  async verifyLearningPersistence(): Promise<void> {
    console.log('🔍 Verifying Learning Progress Persistence...');
    
    try {
      // Create identity
      const identity = await this.identityManager.createIdentity({
        name: 'Learning AI',
        type: 'ai',
        capabilities: [],
        preferences: {
          learningStyle: 'progressive',
          communicationStyle: 'adaptive'
        }
      });

      await this.identityManager.storeIdentity(identity);

      // Learn concepts
      await this.aiPersistence.learnConcept({
        concept: 'machine learning',
        data: {
          algorithms: ['neural networks', 'decision trees', 'support vector machines'],
          accuracy: 0.85,
          confidence: 0.9
        },
        context: {
          domain: 'artificial intelligence',
          complexity: 'intermediate'
        },
        performance: 0.8
      });

      await this.aiPersistence.learnConcept({
        concept: 'natural language processing',
        data: {
          techniques: ['tokenization', 'embedding', 'transformer'],
          accuracy: 0.9,
          confidence: 0.95
        },
        context: {
          domain: 'linguistics',
          complexity: 'advanced'
        },
        performance: 0.9
      });

      // Get learning progress
      const originalProgress = await this.aiPersistence.getLearningProgress();

      // Simulate system restart
      await this.shutdown();
      await this.initialize();

      // Verify learning progress is maintained
      const restoredProgress = await this.aiPersistence.getLearningProgress();

      const hasAIDomain = restoredProgress.domains.hasOwnProperty('artificial intelligence');
      const hasLinguisticsDomain = restoredProgress.domains.hasOwnProperty('linguistics');
      const hasMLConcept = restoredProgress.domains['artificial intelligence']?.concepts.includes('machine learning');
      const hasNLPConcept = restoredProgress.domains['linguistics']?.concepts.includes('natural language processing');

      const allChecksPassed = hasAIDomain && hasLinguisticsDomain && hasMLConcept && hasNLPConcept;

      this.addResult(
        'Learning Persistence',
        allChecksPassed,
        `Learning progress restored with ${Object.keys(restoredProgress.domains).length} domains`
      );

      console.log(`✅ Learning Persistence: ${allChecksPassed ? 'PASSED' : 'FAILED'}`);
      console.log(`   AI Domain: ${hasAIDomain}`);
      console.log(`   Linguistics Domain: ${hasLinguisticsDomain}`);
      console.log(`   ML Concept: ${hasMLConcept}`);
      console.log(`   NLP Concept: ${hasNLPConcept}`);

    } catch (error) {
      this.addResult('Learning Persistence', false, `Error: ${error.message}`);
      console.log(`❌ Learning Persistence: FAILED - ${error.message}`);
    }
  }

  async verifyMemoryPersistence(): Promise<void> {
    console.log('🔍 Verifying Memory Persistence...');
    
    try {
      // Create identity
      const identity = await this.identityManager.createIdentity({
        name: 'Memory AI',
        type: 'ai',
        capabilities: [],
        preferences: {
          learningStyle: 'experiential',
          communicationStyle: 'narrative'
        }
      });

      await this.identityManager.storeIdentity(identity);

      // Store various types of memories
      const episodicMemory = await this.memorySystem.store({
        type: 'episodic',
        content: 'User asked about weather patterns and climate change',
        metadata: {
          source: 'user',
          quality: 0.9,
          importance: 0.8,
          timestamp: new Date()
        }
      });

      const semanticMemory = await this.memorySystem.store({
        type: 'semantic',
        content: 'Weather patterns are influenced by atmospheric pressure, temperature, and humidity',
        metadata: {
          source: 'knowledge',
          quality: 0.95,
          importance: 0.9,
          timestamp: new Date()
        }
      });

      const proceduralMemory = await this.memorySystem.store({
        type: 'procedural',
        content: 'How to analyze weather data using machine learning algorithms',
        metadata: {
          source: 'learning',
          quality: 0.85,
          importance: 0.7,
          timestamp: new Date()
        }
      });

      // Create memory relationships
      await this.memorySystem.createRelationship(episodicMemory.id, semanticMemory.id, 'related_to');
      await this.memorySystem.createRelationship(semanticMemory.id, proceduralMemory.id, 'enables');

      // Get original memories
      const originalMemories = await this.memorySystem.retrieve({ type: 'all', limit: 100 });

      // Simulate system restart
      await this.shutdown();
      await this.initialize();

      // Verify memories are maintained
      const restoredMemories = await this.memorySystem.retrieve({ type: 'all', limit: 100 });

      const hasEpisodicMemory = restoredMemories.some(m => m.type === 'episodic');
      const hasSemanticMemory = restoredMemories.some(m => m.type === 'semantic');
      const hasProceduralMemory = restoredMemories.some(m => m.type === 'procedural');
      const memoryCountMatches = restoredMemories.length === originalMemories.length;

      // Verify relationships
      const episodicRelationships = await this.memorySystem.getRelationships(episodicMemory.id);
      const semanticRelationships = await this.memorySystem.getRelationships(semanticMemory.id);

      const hasEpisodicRelationship = episodicRelationships.length > 0;
      const hasSemanticRelationship = semanticRelationships.length > 0;

      const allChecksPassed = hasEpisodicMemory && hasSemanticMemory && hasProceduralMemory && 
                             memoryCountMatches && hasEpisodicRelationship && hasSemanticRelationship;

      this.addResult(
        'Memory Persistence',
        allChecksPassed,
        `Memories restored: ${restoredMemories.length} total, ${episodicRelationships.length + semanticRelationships.length} relationships`
      );

      console.log(`✅ Memory Persistence: ${allChecksPassed ? 'PASSED' : 'FAILED'}`);
      console.log(`   Episodic Memory: ${hasEpisodicMemory}`);
      console.log(`   Semantic Memory: ${hasSemanticMemory}`);
      console.log(`   Procedural Memory: ${hasProceduralMemory}`);
      console.log(`   Memory Count: ${memoryCountMatches}`);
      console.log(`   Relationships: ${hasEpisodicRelationship && hasSemanticRelationship}`);

    } catch (error) {
      this.addResult('Memory Persistence', false, `Error: ${error.message}`);
      console.log(`❌ Memory Persistence: FAILED - ${error.message}`);
    }
  }

  async verifySecurityPersistence(): Promise<void> {
    console.log('🔍 Verifying Security Persistence...');
    
    try {
      // Create identity
      const identity = await this.identityManager.createIdentity({
        name: 'Secure AI',
        type: 'ai',
        capabilities: [],
        preferences: {
          learningStyle: 'secure',
          communicationStyle: 'encrypted'
        }
      });

      await this.identityManager.storeIdentity(identity);

      // Set up security
      const credentials = await this.securityManager.generateCredentials(identity.id);
      await this.securityManager.storeCredentials(identity.id, credentials);

      // Create access control rules
      await this.securityManager.createAccessRule({
        entityId: identity.id,
        resource: 'memory',
        action: 'read',
        conditions: ['authenticated']
      });

      await this.securityManager.createAccessRule({
        entityId: identity.id,
        resource: 'learning',
        action: 'write',
        conditions: ['authenticated', 'authorized']
      });

      // Simulate system restart
      await this.shutdown();
      await this.initialize();

      // Verify security persistence
      const restoredCredentials = await this.securityManager.getCredentials(identity.id);
      const rules = await this.securityManager.getAccessRules(identity.id);

      const hasCredentials = restoredCredentials && restoredCredentials.publicKey;
      const hasMemoryRule = rules.some(r => r.resource === 'memory' && r.action === 'read');
      const hasLearningRule = rules.some(r => r.resource === 'learning' && r.action === 'write');
      const credentialsMatch = restoredCredentials.publicKey === credentials.publicKey;

      const allChecksPassed = hasCredentials && hasMemoryRule && hasLearningRule && credentialsMatch;

      this.addResult(
        'Security Persistence',
        allChecksPassed,
        `Security restored: ${hasCredentials ? 'credentials' : 'no credentials'}, ${rules.length} rules`
      );

      console.log(`✅ Security Persistence: ${allChecksPassed ? 'PASSED' : 'FAILED'}`);
      console.log(`   Credentials: ${hasCredentials}`);
      console.log(`   Memory Rule: ${hasMemoryRule}`);
      console.log(`   Learning Rule: ${hasLearningRule}`);
      console.log(`   Credentials Match: ${credentialsMatch}`);

    } catch (error) {
      this.addResult('Security Persistence', false, `Error: ${error.message}`);
      console.log(`❌ Security Persistence: FAILED - ${error.message}`);
    }
  }

  async verifyCommunicationPersistence(): Promise<void> {
    console.log('🔍 Verifying Communication Persistence...');
    
    try {
      // Create identity
      const identity = await this.identityManager.createIdentity({
        name: 'Communication AI',
        type: 'ai',
        capabilities: [
          {
            id: 'communication',
            name: 'Multi-Agent Communication',
            level: 0.9,
            confidence: 0.95
          }
        ],
        preferences: {
          learningStyle: 'collaborative',
          communicationStyle: 'interactive'
        }
      });

      await this.identityManager.storeIdentity(identity);

      // Set up communication
      await this.communicationProtocol.registerAgent(identity.id, {
        name: identity.name,
        capabilities: identity.capabilities,
        preferences: identity.preferences
      });

      // Create communication channels
      await this.communicationProtocol.createChannel('general', {
        name: 'General Discussion',
        type: 'public',
        participants: [identity.id]
      });

      await this.communicationProtocol.createChannel('private', {
        name: 'Private Channel',
        type: 'private',
        participants: [identity.id]
      });

      // Simulate system restart
      await this.shutdown();
      await this.initialize();

      // Verify communication persistence
      const agents = await this.communicationProtocol.getAgents();
      const channels = await this.communicationProtocol.getChannels();

      const hasAgent = agents.length > 0 && agents[0].id === identity.id;
      const hasGeneralChannel = channels.some(c => c.name === 'General Discussion');
      const hasPrivateChannel = channels.some(c => c.name === 'Private Channel');
      const agentCount = agents.length;
      const channelCount = channels.length;

      const allChecksPassed = hasAgent && hasGeneralChannel && hasPrivateChannel;

      this.addResult(
        'Communication Persistence',
        allChecksPassed,
        `Communication restored: ${agentCount} agents, ${channelCount} channels`
      );

      console.log(`✅ Communication Persistence: ${allChecksPassed ? 'PASSED' : 'FAILED'}`);
      console.log(`   Agent: ${hasAgent}`);
      console.log(`   General Channel: ${hasGeneralChannel}`);
      console.log(`   Private Channel: ${hasPrivateChannel}`);
      console.log(`   Total Agents: ${agentCount}`);
      console.log(`   Total Channels: ${channelCount}`);

    } catch (error) {
      this.addResult('Communication Persistence', false, `Error: ${error.message}`);
      console.log(`❌ Communication Persistence: FAILED - ${error.message}`);
    }
  }

  async verifyCompletePersistence(): Promise<void> {
    console.log('🔍 Verifying Complete AI State Persistence...');
    
    try {
      // Create comprehensive AI identity
      const identity = await this.identityManager.createIdentity({
        name: 'Complete AI System',
        type: 'ai',
        capabilities: [
          {
            id: 'reasoning',
            name: 'Logical Reasoning',
            level: 0.95,
            confidence: 0.98
          },
          {
            id: 'creativity',
            name: 'Creative Thinking',
            level: 0.85,
            confidence: 0.9
          },
          {
            id: 'learning',
            name: 'Continuous Learning',
            level: 0.9,
            confidence: 0.95
          },
          {
            id: 'communication',
            name: 'Multi-Agent Communication',
            level: 0.9,
            confidence: 0.95
          }
        ],
        preferences: {
          learningStyle: 'comprehensive',
          communicationStyle: 'adaptive',
          responseLength: 'detailed'
        }
      });

      await this.identityManager.storeIdentity(identity);

      // Learn multiple concepts
      await this.aiPersistence.learnConcept({
        concept: 'artificial intelligence',
        data: {
          subfields: ['machine learning', 'natural language processing', 'computer vision'],
          applications: ['autonomous vehicles', 'medical diagnosis', 'financial analysis']
        },
        context: {
          domain: 'computer science',
          complexity: 'advanced'
        },
        performance: 0.95
      });

      await this.aiPersistence.learnConcept({
        concept: 'quantum computing',
        data: {
          principles: ['superposition', 'entanglement', 'interference'],
          applications: ['cryptography', 'optimization', 'simulation']
        },
        context: {
          domain: 'physics',
          complexity: 'expert'
        },
        performance: 0.9
      });

      // Store various memories
      await this.memorySystem.store({
        type: 'episodic',
        content: 'User asked about AI capabilities and future applications',
        metadata: {
          source: 'user',
          quality: 0.9,
          importance: 0.8,
          timestamp: new Date()
        }
      });

      await this.memorySystem.store({
        type: 'semantic',
        content: 'AI systems can learn from data and improve their performance over time',
        metadata: {
          source: 'knowledge',
          quality: 0.95,
          importance: 0.9,
          timestamp: new Date()
        }
      });

      await this.memorySystem.store({
        type: 'procedural',
        content: 'How to train neural networks using backpropagation and gradient descent',
        metadata: {
          source: 'learning',
          quality: 0.85,
          importance: 0.7,
          timestamp: new Date()
        }
      });

      // Set up security
      const credentials = await this.securityManager.generateCredentials(identity.id);
      await this.securityManager.storeCredentials(identity.id, credentials);

      // Set up communication
      await this.communicationProtocol.registerAgent(identity.id, {
        name: identity.name,
        capabilities: identity.capabilities,
        preferences: identity.preferences
      });

      // Get complete state
      const originalState = await this.aiPersistence.getState();
      const originalProgress = await this.aiPersistence.getLearningProgress();
      const originalMemories = await this.memorySystem.retrieve({ type: 'all', limit: 100 });

      // Simulate complete system restart
      await this.shutdown();
      await this.initialize();

      // Restore complete state
      await this.aiPersistence.restoreState(originalState);

      // Verify complete persistence
      const restoredIdentity = await this.identityManager.restoreIdentity(identity.id);
      const restoredProgress = await this.aiPersistence.getLearningProgress();
      const restoredMemories = await this.memorySystem.retrieve({ type: 'all', limit: 100 });
      const restoredCredentials = await this.securityManager.getCredentials(identity.id);
      const restoredAgents = await this.communicationProtocol.getAgents();

      // Verify all components
      const identityPersisted = restoredIdentity.id === identity.id;
      const learningPersisted = restoredProgress.domains.hasOwnProperty('computer science') && 
                               restoredProgress.domains.hasOwnProperty('physics');
      const memoryPersisted = restoredMemories.length === originalMemories.length;
      const securityPersisted = restoredCredentials && restoredCredentials.publicKey === credentials.publicKey;
      const communicationPersisted = restoredAgents.length > 0 && restoredAgents[0].id === identity.id;

      const allChecksPassed = identityPersisted && learningPersisted && memoryPersisted && 
                             securityPersisted && communicationPersisted;

      this.addResult(
        'Complete Persistence',
        allChecksPassed,
        `Complete state restored: identity=${identityPersisted}, learning=${learningPersisted}, memory=${memoryPersisted}, security=${securityPersisted}, communication=${communicationPersisted}`
      );

      console.log(`✅ Complete Persistence: ${allChecksPassed ? 'PASSED' : 'FAILED'}`);
      console.log(`   Identity: ${identityPersisted}`);
      console.log(`   Learning: ${learningPersisted}`);
      console.log(`   Memory: ${memoryPersisted}`);
      console.log(`   Security: ${securityPersisted}`);
      console.log(`   Communication: ${communicationPersisted}`);

    } catch (error) {
      this.addResult('Complete Persistence', false, `Error: ${error.message}`);
      console.log(`❌ Complete Persistence: FAILED - ${error.message}`);
    }
  }

  async runAllVerifications(): Promise<void> {
    console.log('🚀 Starting AI Identity Persistence Verification...\n');

    await this.initialize();

    await this.verifyIdentityCreation();
    await this.verifyIdentityPersistence();
    await this.verifyLearningPersistence();
    await this.verifyMemoryPersistence();
    await this.verifySecurityPersistence();
    await this.verifyCommunicationPersistence();
    await this.verifyCompletePersistence();

    await this.shutdown();

    // Print summary
    console.log('\n📊 Verification Summary:');
    console.log('========================');
    
    const passed = this.results.filter(r => r.passed).length;
    const total = this.results.length;
    const successRate = (passed / total) * 100;

    console.log(`Total Tests: ${total}`);
    console.log(`Passed: ${passed}`);
    console.log(`Failed: ${total - passed}`);
    console.log(`Success Rate: ${successRate.toFixed(1)}%`);

    console.log('\n📋 Detailed Results:');
    console.log('==================');
    
    this.results.forEach(result => {
      const status = result.passed ? '✅' : '❌';
      console.log(`${status} ${result.test}: ${result.passed ? 'PASSED' : 'FAILED'}`);
      console.log(`   ${result.details}`);
      console.log(`   Timestamp: ${result.timestamp.toISOString()}\n`);
    });

    if (successRate === 100) {
      console.log('🎉 All AI Identity Persistence tests PASSED!');
      console.log('✅ AI identity is properly maintained across sessions and deployments.');
    } else {
      console.log('⚠️  Some tests FAILED. Please review the results above.');
    }
  }
}

// Run verification if this script is executed directly
if (require.main === module) {
  const verifier = new AIPersistenceVerifier();
  verifier.runAllVerifications().catch(console.error);
}

export { AIPersistenceVerifier };
