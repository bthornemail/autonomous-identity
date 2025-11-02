#!/usr/bin/env node

/**
 * AI Persistence Server
 * 
 * Simple HTTP server that exposes the AI persistence system
 */

import http from 'node:http';
import { AIPersistenceCore, DEFAULT_CONFIG } from './core/src/index.js';

// Create AI Persistence instance
const aiPersistence = AIPersistenceCore.create(DEFAULT_CONFIG);

// Initialize the system
async function initialize() {
  try {
    // Simple initialization without complex dependencies
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
  const url = new URL(req.url || '/', `http://${req.headers.host}`);
  const path = url.pathname;

  try {
    // Health check endpoint
    if (path === '/health') {
      const health = {
        healthy: true,
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        uptime: process.uptime()
      };
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(health));
      return;
    }

    // Status endpoint
    if (path === '/status') {
      const status = {
        status: 'running',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
      };
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
        // Create identity - simplified implementation
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });
        req.on('end', async () => {
          try {
            const data = JSON.parse(body);
            const identity = {
              id: `identity_${Date.now()}`,
              ...data,
              createdAt: new Date().toISOString()
            };
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(identity));
          } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: (error as Error).message }));
          }
        });
        return;
      }

      if (apiPath === '/memories' && req.method === 'GET') {
        // Get memories - simplified implementation
        const memories = {
          memories: [],
          total: 0,
          timestamp: new Date().toISOString()
        };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(memories));
        return;
      }

      if (apiPath === '/memories' && req.method === 'POST') {
        // Store memory - simplified implementation
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });
        req.on('end', async () => {
          try {
            const data = JSON.parse(body);
            const memory = {
              id: `memory_${Date.now()}`,
              ...data,
              createdAt: new Date().toISOString()
            };
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, memory }));
          } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: (error as Error).message }));
          }
        });
        return;
      }

      if (apiPath === '/learn' && req.method === 'POST') {
        // Learn concept - simplified implementation
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });
        req.on('end', async () => {
          try {
            const data = JSON.parse(body);
            const learning = {
              id: `learning_${Date.now()}`,
              ...data,
              learnedAt: new Date().toISOString()
            };
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, learning }));
          } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: (error as Error).message }));
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

server.listen(Number(PORT), HOST, () => {
  console.log(`AI Persistence Server running on http://${HOST}:${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('Received SIGTERM, shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', async () => {
  console.log('Received SIGINT, shutting down gracefully...');
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
