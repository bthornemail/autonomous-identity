/**
 * AI Persistence Core Interface
 * 
 * Main interface for the AI persistence system
 */

import { AIIdentity } from '../types/identity';
import { MemorySystem } from '../types/memory';
import { SecurityFramework } from '../types/security';

export interface AIPersistenceCore {
  // Core Components
  identity: AIIdentity;
  memory: MemorySystem;
  security: SecurityFramework;
  
  // Core Operations
  initialize(): Promise<void>;
  shutdown(): Promise<void>;
  getStatus(): Promise<SystemStatus>;
  getHealth(): Promise<HealthStatus>;
  
  // Identity Operations
  createIdentity(config: IdentityConfig): Promise<AIIdentity>;
  updateIdentity(id: string, updates: IdentityUpdate): Promise<AIIdentity>;
  deleteIdentity(id: string): Promise<void>;
  getIdentity(id: string): Promise<AIIdentity>;
  
  // Memory Operations
  storeMemory(memory: Memory): Promise<void>;
  retrieveMemory(query: MemoryQuery): Promise<Memory[]>;
  consolidateMemory(): Promise<void>;
  compressMemory(): Promise<void>;
  
  // Security Operations
  authenticate(credentials: Credentials): Promise<AuthResult>;
  authorize(identity: string, resource: string, action: string): Promise<boolean>;
  encrypt(data: any): Promise<EncryptedData>;
  decrypt(encryptedData: EncryptedData): Promise<any>;
}

export interface IdentityConfig {
  name: string;
  type: string;
  capabilities: string[];
  preferences: Record<string, any>;
  security: SecurityConfig;
}

export interface IdentityUpdate {
  name?: string;
  capabilities?: string[];
  preferences?: Record<string, any>;
  security?: SecurityConfig;
}

export interface MemoryQuery {
  type?: string;
  content?: string;
  limit?: number;
}

export interface SystemStatus {
  status: 'running' | 'shutdown';
  uptime: number;
  memory: MemoryStatus;
  performance: PerformanceStatus;
  security: SecurityStatus;
  lastUpdated: Date;
}

export interface HealthStatus {
  healthy: boolean;
  components: ComponentHealth[];
  metrics: HealthMetrics;
  alerts: HealthAlert[];
  lastChecked: Date;
}

export interface MemoryStatus {
  total: number;
  used: number;
  available: number;
  utilization: number;
}

export interface PerformanceStatus {
  latency: number;
  throughput: number;
  errorRate: number;
  responseTime: number;
}

export interface SecurityStatus {
  authenticated: boolean;
  authorized: boolean;
  encrypted: boolean;
  monitored: boolean;
}

export interface ComponentHealth {
  name: string;
  status: 'healthy' | 'degraded' | 'unhealthy';
  metrics: ComponentMetrics;
  lastChecked: Date;
}

export interface HealthMetrics {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
}

export interface HealthAlert {
  id: string;
  type: AlertType;
  severity: Severity;
  message: string;
  timestamp: Date;
}

export interface ComponentMetrics {
  latency: number;
  throughput: number;
  errors: number;
  availability: number;
}

// Supporting Types
export interface Memory {
  id: string;
  type: string;
  content: string;
  metadata: Record<string, any>;
  timestamp: Date;
}

export interface MemoryMetadata {
  source: string;
  quality: number;
  confidence: number;
  importance: number;
  tags: string[];
}

export interface TimeRange {
  start: Date;
  end: Date;
}

export interface SecurityConfig {
  encryption: EncryptionConfig;
  authentication: AuthenticationConfig;
  authorization: AuthorizationConfig;
  privacy: PrivacyConfig;
}

export interface EncryptionConfig {
  algorithm: string;
  keySize: number;
  mode: string;
}

export interface AuthenticationConfig {
  method: string;
  strength: number;
  timeout: number;
}

export interface AuthorizationConfig {
  model: string;
  policies: Policy[];
}

export interface PrivacyConfig {
  level: PrivacyLevel;
  anonymization: boolean;
  retention: RetentionPolicy;
}

export interface Policy {
  id: string;
  name: string;
  rules: Rule[];
  enforcement: Enforcement;
}

export interface Rule {
  id: string;
  condition: Condition;
  action: Action;
  priority: number;
}

export interface Enforcement {
  type: string;
  severity: string;
  actions: Action[];
}

export interface Condition {
  type: string;
  value: any;
  operator: string;
}

export interface Action {
  type: string;
  parameters: Record<string, any>;
}

export interface RetentionPolicy {
  duration: number;
  conditions: Condition[];
  actions: Action[];
}

export interface EncryptedData {
  data: string;
  algorithm: string;
  keyId: string;
  timestamp: Date;
}

export interface Credentials {
  username: string;
  password: string;
}

export interface AuthResult {
  success: boolean;
  token?: string;
  expiresAt?: Date;
  identity?: string;
}

export interface Permission {
  id: string;
  resource: string;
  action: string;
  conditions: Condition[];
}

// Enums
export enum IdentityType {
  AI = 'ai',
  HUMAN = 'human',
  SYSTEM = 'system',
  ORGANIZATION = 'organization'
}

export enum MemoryType {
  EPISODIC = 'episodic',
  SEMANTIC = 'semantic',
  PROCEDURAL = 'procedural',
  WORKING = 'working',
  META = 'meta'
}

export enum SystemStatusType {
  INITIALIZING = 'initializing',
  RUNNING = 'running',
  MAINTENANCE = 'maintenance',
  ERROR = 'error',
  SHUTDOWN = 'shutdown'
}

export enum ComponentStatus {
  HEALTHY = 'healthy',
  WARNING = 'warning',
  ERROR = 'error',
  UNKNOWN = 'unknown'
}

export enum AlertType {
  SECURITY = 'security',
  PERFORMANCE = 'performance',
  SYSTEM = 'system',
  HEALTH = 'health'
}

export enum Severity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export enum PrivacyLevel {
  PUBLIC = 'public',
  PROTECTED = 'protected',
  PRIVATE = 'private',
  CONFIDENTIAL = 'confidential'
}
