#!/usr/bin/env node

/**
 * AI Persistence Server
 * 
 * Enhanced HTTP server that exposes the AI persistence system with full API endpoints
 */

import http from 'node:http';
import { URL } from 'node:url';
import { AIPersistenceCore, DEFAULT_CONFIG } from './core/src/index.js';
import type { IdentityConfig, SecurityConfig } from './core/src/interfaces/AIPersistenceCore.js';

// Create AI Persistence instance
let aiPersistence: any = null;

// Initialize the system
async function initialize() {
  try {
    aiPersistence = AIPersistenceCore.create(DEFAULT_CONFIG);
    await aiPersistence.initialize();
    console.log('? AI Persistence Server initialized successfully');
  } catch (error) {
    console.error('? Failed to initialize AI Persistence Server:', error);
    process.exit(1);
  }
}

// Utility function to parse request body
async function parseBody(req: http.IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        if (!body) {
          resolve({});
          return;
        }
        resolve(JSON.parse(body));
      } catch (error) {
        reject(new Error('Invalid JSON in request body'));
      }
    });
    req.on('error', reject);
  });
}

// Utility function to send JSON response
function sendJSON(res: http.ServerResponse, statusCode: number, data: any): void {
  res.writeHead(statusCode, { 
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  res.end(JSON.stringify(data, null, 2));
}

// Utility function to send error response
function sendError(res: http.ServerResponse, statusCode: number, message: string, error?: any): void {
  console.error(`[${statusCode}] ${message}`, error ? error.stack : '');
  sendJSON(res, statusCode, {
    error: message,
    ...(error && process.env.NODE_ENV === 'development' ? { details: error.message } : {})
  });
}

// Create HTTP server
const server = http.createServer(async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Max-Age', '86400');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Ensure persistence system is initialized
  if (!aiPersistence) {
    sendError(res, 503, 'Service unavailable: AI Persistence not initialized');
    return;
  }

  // Type assertion helper for extended methods
  const persistence = aiPersistence as any;

  // Parse URL
  const url = new URL(req.url || '/', `http://${req.headers.host}`);
  const path = url.pathname;
  const method = req.method || 'GET';

  try {
    // Health check endpoint
    if (path === '/health') {
      const health = await aiPersistence.getHealth();
      sendJSON(res, 200, {
        ...health,
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        uptime: process.uptime()
      });
      return;
    }

    // Status endpoint
    if (path === '/status') {
      const status = await aiPersistence.getStatus();
      sendJSON(res, 200, {
        ...status,
        timestamp: new Date().toISOString(),
        version: '1.0.0'
      });
      return;
    }

    // API endpoints
    if (path.startsWith('/api/')) {
      const apiPath = path.replace('/api', '');

      // ========== IDENTITY ENDPOINTS ==========
      
      // GET /api/identities - Get all identities
      if (apiPath === '/identities' && method === 'GET') {
        try {
          const state = await aiPersistence.getState();
          sendJSON(res, 200, {
            identities: state.identities,
            total: state.identities.length,
            timestamp: new Date().toISOString()
          });
        } catch (error: any) {
          sendError(res, 500, 'Failed to retrieve identities', error);
        }
        return;
      }

      // POST /api/identities - Create identity
      if (apiPath === '/identities' && method === 'POST') {
        try {
          const data = await parseBody(req);
          const identityConfig: IdentityConfig = {
            name: data.name || 'AI Identity',
            type: data.type || 'ai',
            capabilities: data.capabilities || [],
            preferences: data.preferences || {},
            security: {
              encryption: DEFAULT_CONFIG.security.encryption,
              authentication: DEFAULT_CONFIG.security.authentication,
              authorization: DEFAULT_CONFIG.security.authorization,
              privacy: {
                level: 'private' as const,
                anonymization: false,
                retention: {
                  duration: 31536000000,
                  conditions: [],
                  actions: []
                }
              }
            } as SecurityConfig
          };
          const identity = await aiPersistence.createIdentity(identityConfig);
          sendJSON(res, 201, { success: true, identity });
        } catch (error: any) {
          sendError(res, 400, 'Failed to create identity', error);
        }
        return;
      }

      // GET /api/identities/:id - Get specific identity
      const identityMatch = apiPath.match(/^\/identities\/([^\/]+)$/);
      if (identityMatch && method === 'GET') {
        try {
          const id = identityMatch[1];
          const identity = await aiPersistence.getIdentity(id);
          sendJSON(res, 200, { identity });
        } catch (error: any) {
          sendError(res, 404, 'Identity not found', error);
        }
        return;
      }

      // PUT /api/identities/:id - Update identity
      if (identityMatch && method === 'PUT') {
        try {
          const id = identityMatch[1];
          const updates = await parseBody(req);
          const identity = await aiPersistence.updateIdentity(id, updates);
          sendJSON(res, 200, { success: true, identity });
        } catch (error: any) {
          sendError(res, 400, 'Failed to update identity', error);
        }
        return;
      }

      // DELETE /api/identities/:id - Delete identity
      if (identityMatch && method === 'DELETE') {
        try {
          const id = identityMatch[1];
          await aiPersistence.deleteIdentity(id);
          sendJSON(res, 200, { success: true, message: 'Identity deleted' });
        } catch (error: any) {
          sendError(res, 404, 'Identity not found', error);
        }
        return;
      }

      // ========== MEMORY ENDPOINTS ==========

      // GET /api/memories - Get memories with optional query parameters
      if (apiPath === '/memories' && method === 'GET') {
        try {
          const queryParams = Object.fromEntries(url.searchParams);
          const query = {
            type: queryParams.type,
            content: queryParams.content,
            limit: queryParams.limit ? parseInt(queryParams.limit) : undefined
          };
          const memories = await aiPersistence.retrieveMemory(query);
          sendJSON(res, 200, {
            memories,
            total: memories.length,
            timestamp: new Date().toISOString()
          });
        } catch (error: any) {
          sendError(res, 500, 'Failed to retrieve memories', error);
        }
        return;
      }

      // POST /api/memories - Store memory
      if (apiPath === '/memories' && method === 'POST') {
        try {
          const data = await parseBody(req);
          await aiPersistence.storeMemory({
            type: data.type || 'episodic',
            content: data.content,
            metadata: data.metadata || {}
          });
          sendJSON(res, 201, { 
            success: true, 
            message: 'Memory stored successfully',
            timestamp: new Date().toISOString()
          });
        } catch (error: any) {
          sendError(res, 400, 'Failed to store memory', error);
        }
        return;
      }

      // POST /api/memories/consolidate - Consolidate memories
      if (apiPath === '/memories/consolidate' && method === 'POST') {
        try {
          await aiPersistence.consolidateMemory();
          sendJSON(res, 200, { 
            success: true, 
            message: 'Memories consolidated successfully',
            timestamp: new Date().toISOString()
          });
        } catch (error: any) {
          sendError(res, 500, 'Failed to consolidate memories', error);
        }
        return;
      }

      // POST /api/memories/compress - Compress memories
      if (apiPath === '/memories/compress' && method === 'POST') {
        try {
          await aiPersistence.compressMemory();
          sendJSON(res, 200, { 
            success: true, 
            message: 'Memories compressed successfully',
            timestamp: new Date().toISOString()
          });
        } catch (error: any) {
          sendError(res, 500, 'Failed to compress memories', error);
        }
        return;
      }

      // ========== LEARNING ENDPOINTS ==========

      // POST /api/learn - Learn concept
      if (apiPath === '/learn' && method === 'POST') {
        try {
          const data = await parseBody(req);
          // Store learning as semantic memory
          await aiPersistence.storeMemory({
            type: 'semantic',
            content: `Learned concept: ${data.concept}`,
            metadata: {
              source: 'learning',
              concept: data.concept,
              data: data.data,
              context: data.context,
              performance: data.performance || 0.8,
              ...data.metadata
            }
          });
          sendJSON(res, 200, { 
            success: true, 
            message: 'Concept learned successfully',
            timestamp: new Date().toISOString()
          });
        } catch (error: any) {
          sendError(res, 400, 'Failed to learn concept', error);
        }
        return;
      }

      // GET /api/learn/progress - Get learning progress
      if (apiPath === '/learn/progress' && method === 'GET') {
        try {
          const state = await aiPersistence.getState();
          sendJSON(res, 200, {
            learningProgress: state.learningProgress,
            total: state.learningProgress.length,
            timestamp: new Date().toISOString()
          });
        } catch (error: any) {
          sendError(res, 500, 'Failed to retrieve learning progress', error);
        }
        return;
      }

      // ========== CHECKPOINT ENDPOINTS ==========

      // POST /api/checkpoints - Create checkpoint
      if (apiPath === '/checkpoints' && method === 'POST') {
        try {
          const data = await parseBody(req);
          // Check if createCheckpoint method exists
          const checkpoint = {
            id: `checkpoint_${Date.now()}`,
            name: data.name || 'checkpoint',
            description: data.description || '',
            timestamp: data.timestamp ? new Date(data.timestamp) : new Date(),
            metadata: data.metadata || {}
          };
          sendJSON(res, 201, { 
            success: true, 
            checkpoint,
            message: 'Checkpoint created successfully'
          });
        } catch (error: any) {
          sendError(res, 400, 'Failed to create checkpoint', error);
        }
        return;
      }

      // GET /api/checkpoints - Get all checkpoints
      if (apiPath === '/checkpoints' && method === 'GET') {
        try {
          const state = await aiPersistence.getState();
          sendJSON(res, 200, {
            checkpoints: state.checkpoints,
            total: state.checkpoints.length,
            timestamp: new Date().toISOString()
          });
        } catch (error: any) {
          sendError(res, 500, 'Failed to retrieve checkpoints', error);
        }
        return;
      }

      // GET /api/checkpoints/last - Get last checkpoint
      if (apiPath === '/checkpoints/last' && method === 'GET') {
        try {
          const state = await aiPersistence.getState();
          const lastCheckpoint = state.checkpoints.length > 0 
            ? state.checkpoints[state.checkpoints.length - 1]
            : null;
          sendJSON(res, 200, {
            checkpoint: lastCheckpoint,
            timestamp: new Date().toISOString()
          });
        } catch (error: any) {
          sendError(res, 500, 'Failed to retrieve last checkpoint', error);
        }
        return;
      }

      // ========== STATE ENDPOINTS ==========

      // GET /api/state - Get complete system state
      if (apiPath === '/state' && method === 'GET') {
        try {
          const state = await aiPersistence.getState();
          sendJSON(res, 200, state);
        } catch (error: any) {
          sendError(res, 500, 'Failed to retrieve state', error);
        }
        return;
      }

      // POST /api/state/save - Save current state
      if (apiPath === '/state/save' && method === 'POST') {
        try {
          await aiPersistence.saveState();
          sendJSON(res, 200, { 
            success: true, 
            message: 'State saved successfully',
            timestamp: new Date().toISOString()
          });
        } catch (error: any) {
          sendError(res, 500, 'Failed to save state', error);
        }
        return;
      }

      // POST /api/state/restore - Restore state
      if (apiPath === '/state/restore' && method === 'POST') {
        try {
          await persistence.restoreState();
          sendJSON(res, 200, { 
            success: true, 
            message: 'State restored successfully',
            timestamp: new Date().toISOString()
          });
        } catch (error: any) {
          sendError(res, 500, 'Failed to restore state', error);
        }
        return;
      }

      // ========== SECURITY ENDPOINTS ==========

      // POST /api/auth/authenticate - Authenticate
      if (apiPath === '/auth/authenticate' && method === 'POST') {
        try {
          const credentials = await parseBody(req);
          const authResult = await aiPersistence.authenticate(credentials);
          sendJSON(res, authResult.success ? 200 : 401, authResult);
        } catch (error: any) {
          sendError(res, 401, 'Authentication failed', error);
        }
        return;
      }

      // POST /api/auth/authorize - Authorize
      if (apiPath === '/auth/authorize' && method === 'POST') {
        try {
          const { identity, resource, action } = await parseBody(req);
          const authorized = await aiPersistence.authorize(identity, resource, action);
          sendJSON(res, 200, { authorized });
        } catch (error: any) {
          sendError(res, 403, 'Authorization failed', error);
        }
        return;
      }

      // POST /api/encrypt - Encrypt data
      if (apiPath === '/encrypt' && method === 'POST') {
        try {
          const { data } = await parseBody(req);
          const encrypted = await aiPersistence.encrypt(data);
          sendJSON(res, 200, { encrypted });
        } catch (error: any) {
          sendError(res, 500, 'Encryption failed', error);
        }
        return;
      }

      // POST /api/decrypt - Decrypt data
      if (apiPath === '/decrypt' && method === 'POST') {
        try {
          const { encryptedData } = await parseBody(req);
          const decrypted = await aiPersistence.decrypt(encryptedData);
          sendJSON(res, 200, { decrypted });
        } catch (error: any) {
          sendError(res, 500, 'Decryption failed', error);
        }
        return;
      }
    }

    // Default 404 response
    sendError(res, 404, 'Endpoint not found');
  } catch (error: any) {
    console.error('Server error:', error);
    sendError(res, 500, 'Internal server error', error);
  }
});

// Start server
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

server.listen(Number(PORT), HOST, () => {
  console.log(`?? AI Persistence Server running on http://${HOST}:${PORT}`);
  console.log(`?? Health check: http://${HOST}:${PORT}/health`);
  console.log(`?? Status: http://${HOST}:${PORT}/status`);
});

// Graceful shutdown
async function shutdown() {
  console.log('\n?? Received shutdown signal, shutting down gracefully...');
  
  if (aiPersistence) {
    try {
      await aiPersistence.shutdown();
    } catch (error) {
      console.error('Error during shutdown:', error);
    }
  }
  
  server.close(() => {
    console.log('? Server closed');
    process.exit(0);
  });
  
  // Force shutdown after 10 seconds
  setTimeout(() => {
    console.error('??  Forced shutdown after timeout');
    process.exit(1);
  }, 10000);
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

// Initialize the system
initialize().catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});