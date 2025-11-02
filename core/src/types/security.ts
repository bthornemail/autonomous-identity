/**
 * Security Types
 * 
 * Core type definitions for AI persistence security
 */

export interface SecurityFramework {
  encrypt(data: any): Promise<EncryptedData>;
  decrypt(encryptedData: EncryptedData): Promise<any>;
  authenticate(credentials: Credentials): Promise<AuthResult>;
  authorize(identity: string, resource: string, action: string): Promise<boolean>;
  initialize(): Promise<void>;
  shutdown(): Promise<void>;
}

export interface EncryptionService {
  // Encryption Operations
  encrypt(data: any, key: string): Promise<EncryptedData>;
  decrypt(encryptedData: EncryptedData, key: string): Promise<any>;
  
  // Key Management
  generateKey(): Promise<string>;
  rotateKey(oldKey: string, newKey: string): Promise<void>;
  
  // Secure Communication
  establishSecureChannel(peer: string): Promise<SecureChannel>;
  sendSecureMessage(channel: SecureChannel, message: any): Promise<void>;
}

export interface AuthenticationService {
  // Authentication Methods
  authenticate(credentials: Credentials): Promise<AuthResult>;
  refreshToken(token: string): Promise<AuthResult>;
  revokeToken(token: string): Promise<void>;
  
  // Multi-Factor Authentication
  enableMFA(identityId: string, method: string): Promise<void>;
  verifyMFA(identityId: string, code: string): Promise<boolean>;
  
  // Biometric Authentication
  registerBiometric(identityId: string, biometric: Biometric): Promise<void>;
  authenticateBiometric(identityId: string, biometric: Biometric): Promise<boolean>;
}

export interface AuthorizationService {
  // Authorization Operations
  authorize(identity: Identity, resource: Resource, action: Action): Promise<AuthResult>;
  checkPermission(identity: Identity, permission: Permission): Promise<boolean>;
  grantPermission(identity: Identity, permission: Permission): Promise<void>;
  revokePermission(identity: Identity, permission: Permission): Promise<void>;
  
  // Role-Based Access Control
  assignRole(identity: Identity, role: Role): Promise<void>;
  removeRole(identity: Identity, role: Role): Promise<void>;
  checkRole(identity: Identity, role: Role): Promise<boolean>;
}

export interface PrivacyService {
  // Privacy Operations
  anonymize(data: any): Promise<AnonymizedData>;
  pseudonymize(data: any): Promise<PseudonymizedData>;
  applyDifferentialPrivacy(data: any, epsilon: number): Promise<PrivateData>;
  removePII(data: any): Promise<CleanedData>;
  
  // Privacy Controls
  setPrivacyLevel(data: any, level: PrivacyLevel): Promise<void>;
  enforcePrivacyPolicy(data: any, policy: PrivacyPolicy): Promise<void>;
  auditPrivacyCompliance(data: any): Promise<ComplianceReport>;
}

export interface AnonymizationService {
  // Anonymization Operations
  anonymize(data: any): Promise<AnonymizedData>;
  deAnonymize(anonymizedData: AnonymizedData): Promise<any>;
  addNoise(data: any, noiseLevel: number): Promise<NoisyData>;
  removeNoise(noisyData: NoisyData): Promise<any>;
  
  // Anonymization Techniques
  kAnonymity(data: any, k: number): Promise<AnonymizedData>;
  lDiversity(data: any, l: number): Promise<AnonymizedData>;
  tCloseness(data: any, t: number): Promise<AnonymizedData>;
}

export interface AuditService {
  // Audit Operations
  logEvent(event: SecurityEvent): Promise<void>;
  generateAuditReport(period: TimePeriod): Promise<AuditReport>;
  analyzeSecurityEvents(events: SecurityEvent[]): Promise<SecurityAnalysis>;
  detectAnomalies(events: SecurityEvent[]): Promise<Anomaly[]>;
  
  // Compliance
  checkCompliance(standard: ComplianceStandard): Promise<ComplianceReport>;
  generateComplianceReport(): Promise<ComplianceReport>;
  trackComplianceViolations(): Promise<Violation[]>;
}

export interface MonitoringService {
  // Monitoring Operations
  monitor(metric: any): Promise<any>;
  alert(alert: SecurityAlert): Promise<void>;
  track(activity: SecurityActivity): Promise<void>;
  report(incident: SecurityIncident): Promise<void>;
  
  // Security Metrics
  collectMetrics(): Promise<SecurityMetrics>;
  analyzeTrends(metrics: SecurityMetrics[]): Promise<TrendAnalysis>;
  predictThreats(metrics: SecurityMetrics[]): Promise<ThreatPrediction[]>;
}

// Core Security Types
export interface EncryptedData {
  data: string;
  algorithm: string;
  keyId: string;
  iv: string;
  timestamp: Date;
}

export interface SecureChannel {
  id: string;
  peer: string;
  encryption: EncryptionConfig;
  authentication: AuthConfig;
  established: Date;
  expires: Date;
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

export interface Biometric {
  type: BiometricType;
  data: string;
  quality: number;
  confidence: number;
  timestamp: Date;
}

export interface Identity {
  id: string;
  type: IdentityType;
  attributes: IdentityAttribute[];
  permissions: Permission[];
  roles: Role[];
}

export interface Resource {
  id: string;
  type: ResourceType;
  permissions: Permission[];
  metadata: ResourceMetadata;
}

export interface Action {
  id: string;
  type: ActionType;
  resource: string;
  conditions: Condition[];
  effects: Effect[];
}

export interface Permission {
  id: string;
  resource: string;
  action: string;
  conditions: Condition[];
  grantedBy: string;
  grantedAt: Date;
  expiresAt?: Date;
}

export interface Role {
  id: string;
  name: string;
  permissions: Permission[];
  description: string;
  created: Date;
  updated: Date;
}

export interface AnonymizedData {
  original: string;
  anonymized: string;
  technique: AnonymizationTechnique;
  quality: number;
  timestamp: Date;
}

export interface PseudonymizedData {
  original: string;
  pseudonym: string;
  mapping: string;
  reversible: boolean;
  timestamp: Date;
}

export interface PrivateData {
  original: any;
  private: any;
  epsilon: number;
  delta: number;
  quality: number;
  timestamp: Date;
}

export interface CleanedData {
  original: any;
  cleaned: any;
  removed: string[];
  quality: number;
  timestamp: Date;
}

export interface PrivacyPolicy {
  id: string;
  name: string;
  rules: PrivacyRule[];
  enforcement: Enforcement;
  compliance: ComplianceStandard[];
}

export interface ComplianceReport {
  standard: ComplianceStandard;
  status: ComplianceStatus;
  violations: Violation[];
  recommendations: Recommendation[];
  timestamp: Date;
}

export interface SecurityEvent {
  id: string;
  type: SecurityEventType;
  timestamp: Date;
  source: string;
  target: string;
  severity: Severity;
  description: string;
  metadata: Record<string, any>;
}

export interface AuditReport {
  id: string;
  period: TimePeriod;
  events: SecurityEvent[];
  summary: AuditSummary;
  recommendations: Recommendation[];
  timestamp: Date;
}

export interface SecurityAnalysis {
  threats: Threat[];
  vulnerabilities: Vulnerability[];
  risks: Risk[];
  recommendations: Recommendation[];
  timestamp: Date;
}

export interface Anomaly {
  id: string;
  type: AnomalyType;
  severity: Severity;
  description: string;
  evidence: Evidence[];
  timestamp: Date;
}

export interface SecurityAlert {
  id: string;
  type: AlertType;
  severity: Severity;
  message: string;
  source: string;
  timestamp: Date;
  acknowledged: boolean;
  resolved: boolean;
}

export interface SecurityActivity {
  id: string;
  type: ActivityType;
  actor: string;
  resource: string;
  action: string;
  timestamp: Date;
  metadata: Record<string, any>;
}

export interface SecurityIncident {
  id: string;
  type: IncidentType;
  severity: Severity;
  description: string;
  affected: string[];
  timeline: IncidentTimeline;
  status: IncidentStatus;
  resolution: Resolution;
}

export interface SecurityMetrics {
  timestamp: Date;
  metrics: Metric[];
  trends: Trend[];
  anomalies: Anomaly[];
}

export interface TrendAnalysis {
  period: TimePeriod;
  trends: Trend[];
  predictions: Prediction[];
  confidence: number;
}

export interface ThreatPrediction {
  threat: Threat;
  probability: number;
  timeframe: TimeFrame;
  impact: Impact;
  mitigation: Mitigation[];
}

// Enums
export enum CredentialType {
  PASSWORD = 'password',
  TOKEN = 'token',
  CERTIFICATE = 'certificate',
  BIOMETRIC = 'biometric',
  MULTI_FACTOR = 'multi_factor'
}

export enum BiometricType {
  FINGERPRINT = 'fingerprint',
  VOICE = 'voice',
  FACE = 'face',
  IRIS = 'iris',
  BEHAVIORAL = 'behavioral'
}

export enum IdentityType {
  USER = 'user',
  SYSTEM = 'system',
  SERVICE = 'service',
  DEVICE = 'device'
}

export enum ResourceType {
  DATA = 'data',
  SERVICE = 'service',
  API = 'api',
  FILE = 'file',
  MEMORY = 'memory'
}

export enum ActionType {
  READ = 'read',
  WRITE = 'write',
  DELETE = 'delete',
  EXECUTE = 'execute',
  ADMIN = 'admin'
}

export enum PrivacyLevel {
  PUBLIC = 'public',
  PROTECTED = 'protected',
  PRIVATE = 'private',
  CONFIDENTIAL = 'confidential'
}

export enum AnonymizationTechnique {
  K_ANONYMITY = 'k_anonymity',
  L_DIVERSITY = 'l_diversity',
  T_CLOSENESS = 't_closeness',
  DIFFERENTIAL_PRIVACY = 'differential_privacy',
  NOISE_ADDITION = 'noise_addition'
}

export enum ComplianceStandard {
  GDPR = 'gdpr',
  CCPA = 'ccpa',
  HIPAA = 'hipaa',
  SOC2 = 'soc2',
  ISO27001 = 'iso27001'
}

export enum ComplianceStatus {
  COMPLIANT = 'compliant',
  NON_COMPLIANT = 'non_compliant',
  PARTIALLY_COMPLIANT = 'partially_compliant',
  UNKNOWN = 'unknown'
}

export enum SecurityEventType {
  LOGIN = 'login',
  LOGOUT = 'logout',
  ACCESS = 'access',
  MODIFICATION = 'modification',
  DELETION = 'deletion',
  UNAUTHORIZED = 'unauthorized',
  SUSPICIOUS = 'suspicious'
}

export enum Severity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export enum AnomalyType {
  BEHAVIORAL = 'behavioral',
  TEMPORAL = 'temporal',
  SPATIAL = 'spatial',
  STATISTICAL = 'statistical'
}

export enum AlertType {
  SECURITY = 'security',
  PERFORMANCE = 'performance',
  COMPLIANCE = 'compliance',
  SYSTEM = 'system'
}

export enum ActivityType {
  AUTHENTICATION = 'authentication',
  AUTHORIZATION = 'authorization',
  DATA_ACCESS = 'data_access',
  DATA_MODIFICATION = 'data_modification',
  SYSTEM_ADMIN = 'system_admin'
}

export enum IncidentType {
  BREACH = 'breach',
  UNAUTHORIZED_ACCESS = 'unauthorized_access',
  DATA_LEAK = 'data_leak',
  SYSTEM_COMPROMISE = 'system_compromise',
  MALWARE = 'malware'
}

export enum IncidentStatus {
  OPEN = 'open',
  INVESTIGATING = 'investigating',
  CONTAINED = 'contained',
  RESOLVED = 'resolved',
  CLOSED = 'closed'
}

// Supporting Types
export interface CredentialMetadata {
  source: string;
  quality: number;
  confidence: number;
  timestamp: Date;
}

export interface AuthMetadata {
  sessionId: string;
  ipAddress: string;
  userAgent: string;
  location: string;
  timestamp: Date;
}

export interface IdentityAttribute {
  name: string;
  value: any;
  type: string;
  sensitive: boolean;
  verified: boolean;
}

export interface ResourceMetadata {
  owner: string;
  created: Date;
  updated: Date;
  size: number;
  type: string;
}

export interface Condition {
  type: string;
  value: any;
  operator: string;
}

export interface Effect {
  type: string;
  value: any;
  probability: number;
}

export interface PrivacyRule {
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

export interface Violation {
  id: string;
  type: string;
  severity: Severity;
  description: string;
  timestamp: Date;
  resolved: boolean;
}

export interface Recommendation {
  id: string;
  type: string;
  priority: number;
  description: string;
  implementation: string;
  impact: Impact;
}

// ComplianceStandard is already defined as enum above

export interface AuditSummary {
  totalEvents: number;
  criticalEvents: number;
  violations: number;
  compliance: number;
  recommendations: number;
}

export interface Evidence {
  type: string;
  value: any;
  confidence: number;
  timestamp: Date;
}

export interface IncidentTimeline {
  events: TimelineEvent[];
  start: Date;
  end?: Date;
  duration?: number;
}

export interface Resolution {
  method: string;
  description: string;
  timestamp: Date;
  verified: boolean;
}

export interface Metric {
  name: string;
  value: number;
  unit: string;
  timestamp: Date;
}

export interface Trend {
  metric: string;
  direction: TrendDirection;
  magnitude: number;
  confidence: number;
  timeframe: TimeFrame;
}

export interface Prediction {
  metric: string;
  value: number;
  confidence: number;
  timeframe: TimeFrame;
}

export interface Threat {
  id: string;
  type: string;
  severity: Severity;
  probability: number;
  impact: Impact;
  description: string;
}

export interface Vulnerability {
  id: string;
  type: string;
  severity: Severity;
  exploitability: number;
  impact: Impact;
  description: string;
}

export interface Risk {
  id: string;
  threat: string;
  vulnerability: string;
  likelihood: number;
  impact: Impact;
  level: RiskLevel;
}

export interface Impact {
  type: string;
  severity: Severity;
  scope: string;
  duration: number;
  cost: number;
}

export interface Mitigation {
  id: string;
  type: string;
  description: string;
  effectiveness: number;
  cost: number;
  implementation: string;
}

export interface TimePeriod {
  start: Date;
  end: Date;
}

export interface TimeFrame {
  start: Date;
  end: Date;
}

export interface TimelineEvent {
  timestamp: Date;
  type: string;
  description: string;
  actor: string;
  metadata: Record<string, any>;
}

export enum TrendDirection {
  UP = 'up',
  DOWN = 'down',
  STABLE = 'stable',
  VOLATILE = 'volatile'
}

export enum RiskLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export interface EncryptionConfig {
  algorithm: string;
  keySize: number;
  mode: string;
  padding: string;
}

export interface AuthConfig {
  method: string;
  strength: number;
  timeout: number;
  retries: number;
}

export interface NoisyData {
  original: any;
  noisy: any;
  noiseLevel: number;
  quality: number;
  timestamp: Date;
}

export interface Requirement {
  id: string;
  description: string;
  mandatory: boolean;
  evidence: string[];
}

export interface Control {
  id: string;
  name: string;
  description: string;
  implementation: string;
  testing: string;
}
