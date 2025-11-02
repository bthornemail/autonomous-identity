#!/usr/bin/env node

/**
 * AI Persistence Server
 * 
 * Simple HTTP server that exposes the AI persistence system
 */

import http from 'http';
import { AIPersistenceCore, DEFAULT_CONFIG } from './core/index.mjs';

// Create AI Persistence instance
const aiPersistence = AIPersistenceCore.create(DEFAULT_CONFIG);

// Initialize the system
async function initialize() {
  try {
    await aiPersistence.initialize();
    console.log('AI Persistence Server initialized successfully');
  } catch (error) {
    console.error('Failed to initialize AI Persistence Server:', error);
    process.exit(1);
  }
}

// Create HTTP server
const server = http.createServer(async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Parse URL
  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname;

  try {
    // Health check endpoint
    if (path === '/health') {
      const health = await aiPersistence.getHealth();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(health));
      return;
    }

    // Status endpoint
    if (path === '/status') {
      const status = await aiPersistence.getStatus();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(status));
      return;
    }

    // API endpoints
    if (path.startsWith('/api/')) {
      const apiPath = path.replace('/api', '');
      
      if (apiPath === '/identities' && req.method === 'GET') {
        // Get all identities (placeholder)
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ identities: [] }));
        return;
      }

      if (apiPath === '/identities' && req.method === 'POST') {
        // Create identity
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });
        req.on('end', async () => {
          try {
            const data = JSON.parse(body);
            const identity = await aiPersistence.createIdentity(data);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(identity));
          } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: error.message }));
          }
        });
        return;
      }

      if (apiPath === '/memories' && req.method === 'GET') {
        // Get memories
        const memories = await aiPersistence.retrieveMemory({});
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(memories));
        return;
      }

      if (apiPath === '/memories' && req.method === 'POST') {
        // Store memory
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });
        req.on('end', async () => {
          try {
            const data = JSON.parse(body);
            await aiPersistence.storeMemory(data);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true }));
          } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: error.message }));
          }
        });
        return;
      }

      if (apiPath === '/learn' && req.method === 'POST') {
        // Learn concept
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });
        req.on('end', async () => {
          try {
            const data = JSON.parse(body);
            await aiPersistence.learnConcept(data);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true }));
          } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: error.message }));
          }
        });
        return;
      }
    }

    // Default response
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));

  } catch (error) {
    console.error('Server error:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Internal server error' }));
  }
});

// Start server
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

server.listen(PORT, HOST, () => {
  console.log(`AI Persistence Server running on http://${HOST}:${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('Received SIGTERM, shutting down gracefully...');
  await aiPersistence.shutdown();
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', async () => {
  console.log('Received SIGINT, shutting down gracefully...');
  await aiPersistence.shutdown();
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

// Initialize the system
initialize().catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
