/**
 * AI Persistence Communication Package
 * 
 * Main entry point for the AI persistence communication protocol
 */

// Core interfaces
export * from './CommunicationProtocol';

// Type definitions
export * from './types/communication';

// Communication classes
export class CommunicationProtocol {
  static create(config: ProtocolConfig): CommunicationProtocol {
    return new CommunicationProtocolImpl(config);
  }
}

// Re-export types for convenience
export type {
  CommunicationProtocol,
  Message,
  MessageMetadata,
  RoutingInfo,
  DeliveryInfo,
  CommunicationSession,
  Participant,
  ParticipantMetadata,
  Connection,
  ConnectionStatus,
  ProtocolStatus,
  ProtocolHealth,
  SessionConfig,
  MessageHandler,
  ErrorHandler,
  SuccessHandler
} from './types/communication';

// Communication configuration types
export interface ProtocolConfig {
  mcpConfig: MCPConfig;
  routingConfig: RoutingConfig;
  sessionConfig: SessionConfig;
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
export const PACKAGE_NAME = '@h2gnn/ai-persistence-communication';

// Default communication configuration
export const DEFAULT_COMMUNICATION_CONFIG: ProtocolConfig = {
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
    timeout: 3600000, // 1 hour
    persistence: true
  }
};
