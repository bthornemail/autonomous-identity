/**
 * Communication Protocol Types
 * 
 * Type definitions for AI persistence communication
 */

export interface CommunicationProtocol {
  // Message Operations
  sendMessage(message: Message): Promise<void>;
  receiveMessage(messageId: string): Promise<Message>;
  broadcastMessage(message: Message, participants: string[]): Promise<void>;
  
  // Session Management
  createSession(config: SessionConfig): Promise<CommunicationSession>;
  joinSession(sessionId: string, participant: Participant): Promise<void>;
  leaveSession(sessionId: string, participantId: string): Promise<void>;
  getSession(sessionId: string): Promise<CommunicationSession>;
  
  // Participant Management
  registerParticipant(participant: Participant): Promise<void>;
  unregisterParticipant(participantId: string): Promise<void>;
  getParticipant(participantId: string): Promise<Participant>;
  
  // Protocol Operations
  establishConnection(participantId: string): Promise<Connection>;
  closeConnection(connectionId: string): Promise<void>;
  getConnectionStatus(connectionId: string): Promise<ConnectionStatus>;
  
  // Message Handlers
  registerMessageHandler(type: MessageType, handler: MessageHandler): Promise<void>;
  unregisterMessageHandler(type: MessageType): Promise<void>;
  registerErrorHandler(handler: ErrorHandler): Promise<void>;
  registerSuccessHandler(handler: SuccessHandler): Promise<void>;
  
  // Protocol Status
  getProtocolStatus(): Promise<ProtocolStatus>;
  getProtocolHealth(): Promise<ProtocolHealth>;
}

export interface Message {
  id: string;
  type: MessageType;
  sender: string;
  recipient: string;
  content: any;
  metadata: MessageMetadata;
  timestamp: Date;
}

export interface MessageMetadata {
  priority: MessagePriority;
  encryption: boolean;
  compression: boolean;
  routing: RoutingInfo;
  delivery: DeliveryInfo;
}

export interface RoutingInfo {
  strategy: string;
  hops: number;
  timeout: number;
  retries: number;
}

export interface DeliveryInfo {
  guaranteed: boolean;
  ordered: boolean;
  persistent: boolean;
  expiration: Date;
}

export interface CommunicationSession {
  id: string;
  name: string;
  description: string;
  participants: Participant[];
  messages: Message[];
  created: Date;
  lastActivity: Date;
}

export interface Participant {
  id: string;
  name: string;
  type: ParticipantType;
  capabilities: Capability[];
  status: ParticipantStatus;
  metadata: ParticipantMetadata;
}

export interface ParticipantMetadata {
  version: string;
  platform: string;
  location: string;
  preferences: Record<string, any>;
}

export interface Connection {
  id: string;
  participant: string;
  status: ConnectionStatus;
  established: Date;
  lastActivity: Date;
}

export interface ConnectionStatus {
  connected: boolean;
  latency: number;
  throughput: number;
  errors: number;
}

export interface ProtocolStatus {
  status: string;
  connections: number;
  sessions: number;
  participants: number;
  lastUpdated: Date;
}

export interface ProtocolHealth {
  healthy: boolean;
  status: ProtocolStatus;
  lastChecked: Date;
}

export interface SessionConfig {
  name: string;
  description: string;
  maxParticipants: number;
  timeout: number;
  persistence: boolean;
}

// Message Handlers
export type MessageHandler = (message: Message) => Promise<void>;
export type ErrorHandler = (error: Error, message: Message) => Promise<void>;
export type SuccessHandler = (message: Message) => Promise<void>;

// Enums
export enum MessageType {
  TEXT = 'text',
  BINARY = 'binary',
  COMMAND = 'command',
  RESPONSE = 'response',
  NOTIFICATION = 'notification',
  HEARTBEAT = 'heartbeat',
  ERROR = 'error'
}

export enum MessagePriority {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export enum ParticipantType {
  AI = 'ai',
  HUMAN = 'human',
  SYSTEM = 'system',
  SERVICE = 'service'
}

export enum ParticipantStatus {
  ONLINE = 'online',
  OFFLINE = 'offline',
  BUSY = 'busy',
  AWAY = 'away'
}

export enum Capability {
  TEXT_MESSAGING = 'text_messaging',
  BINARY_TRANSFER = 'binary_transfer',
  VOICE_CALL = 'voice_call',
  VIDEO_CALL = 'video_call',
  FILE_SHARING = 'file_sharing',
  SCREEN_SHARING = 'screen_sharing',
  COLLABORATION = 'collaboration'
}
