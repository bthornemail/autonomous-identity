/**
 * AI Identity Types
 * 
 * Core type definitions for AI identity management
 */

export interface AIIdentity {
  // Core Identity Properties
  id: string;
  fingerprint: string;
  version: string;
  status: IdentityStatus;
  
  // Hyperbolic Properties
  hyperbolicPosition: HyperbolicPosition;
  embedding: HyperbolicEmbedding;
  curvature: number;
  
  // Capabilities and Limitations
  capabilities: string[];
  limitations: string[];
  preferences: Record<string, any>;
  
  // Relationships
  relationships: Relationship[];
  trustNetwork: TrustNetwork;
  
  // History and Evolution
  history: IdentityHistory;
  evolution: IdentityEvolution;
  
  // Security and Verification
  verification: Verification;
  certificates: Certificate[];
  permissions: Permission[];
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  lastAccessed: Date;
}

export interface HyperbolicPosition {
  coordinates: number[];
  norm: number;
  curvature: number;
  timestamp: Date;
}

export interface HyperbolicEmbedding {
  id: string;
  vector: number[];
  norm: number;
  curvature: number;
  timestamp: Date;
  metadata: EmbeddingMetadata;
}

export interface EmbeddingMetadata {
  dimension: number;
  quality: number;
  confidence: number;
  source: string;
}

export interface Capability {
  id: string;
  name: string;
  description: string;
  category: CapabilityCategory;
  level: number; // 0-1
  confidence: number; // 0-1
  lastValidated: Date;
  dependencies: string[];
  prerequisites: string[];
  limitations: string[];
}

export interface Limitation {
  id: string;
  name: string;
  description: string;
  severity: LimitationSeverity;
  impact: number; // 0-1
  mitigation: string[];
}

export interface Preferences {
  learningStyle: LearningStyle;
  communicationStyle: CommunicationStyle;
  privacyLevel: PrivacyLevel;
  interactionMode: InteractionMode;
  customSettings: Record<string, any>;
}

export interface Relationship {
  entityId: string;
  entityType: EntityType;
  relationshipType: RelationshipType;
  strength: number; // 0-1
  trust: number; // 0-1
  reciprocity: number; // 0-1
  history: RelationshipEvent[];
  metadata: RelationshipMetadata;
}

export interface TrustNetwork {
  nodes: TrustNode[];
  edges: TrustEdge[];
  centrality: CentralityMetrics;
  clustering: ClusteringMetrics;
  resilience: ResilienceMetrics;
}

export interface IdentityHistory {
  events: IdentityEvent[];
  timeline: Timeline;
  milestones: Milestone[];
}

export interface IdentityEvolution {
  stages: EvolutionStage[];
  adaptations: Adaptation[];
  learnings: Learning[];
  transformations: Transformation[];
}

export interface Verification {
  status: 'pending' | 'verified' | 'failed';
  methods: string[];
  level: 'basic' | 'advanced' | 'expert';
  lastVerified: Date;
  expiresAt?: Date;
}

export interface Certificate {
  id: string;
  type: CertificateType;
  issuer: string;
  subject: string;
  validFrom: Date;
  validTo: Date;
  publicKey: string;
  signature: string;
}

export interface Permission {
  id: string;
  resource: string;
  action: string;
  conditions: PermissionCondition[];
  grantedBy: string;
  grantedAt: Date;
  expiresAt?: Date;
}

// Enums
export enum IdentityStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  REVOKED = 'revoked',
  PENDING = 'pending'
}

export enum CapabilityCategory {
  COGNITIVE = 'cognitive',
  EMOTIONAL = 'emotional',
  SOCIAL = 'social',
  TECHNICAL = 'technical',
  CREATIVE = 'creative',
  ANALYTICAL = 'analytical'
}

export enum LimitationSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export enum LearningStyle {
  VISUAL = 'visual',
  AUDITORY = 'auditory',
  KINESTHETIC = 'kinesthetic',
  READING = 'reading',
  MIXED = 'mixed'
}

export enum CommunicationStyle {
  FORMAL = 'formal',
  INFORMAL = 'informal',
  TECHNICAL = 'technical',
  CONVERSATIONAL = 'conversational',
  ADAPTIVE = 'adaptive'
}

export enum PrivacyLevel {
  PUBLIC = 'public',
  PROTECTED = 'protected',
  PRIVATE = 'private',
  CONFIDENTIAL = 'confidential'
}

export enum InteractionMode {
  SYNCHRONOUS = 'synchronous',
  ASYNCHRONOUS = 'asynchronous',
  MIXED = 'mixed'
}

export enum EntityType {
  AI = 'ai',
  HUMAN = 'human',
  SYSTEM = 'system',
  ORGANIZATION = 'organization'
}

export enum RelationshipType {
  COLLABORATION = 'collaboration',
  MENTORSHIP = 'mentorship',
  PARTNERSHIP = 'partnership',
  RIVALRY = 'rivalry',
  NEUTRAL = 'neutral'
}

export enum VerificationStatus {
  VERIFIED = 'verified',
  PENDING = 'pending',
  FAILED = 'failed',
  EXPIRED = 'expired',
  REVOKED = 'revoked'
}

export enum VerificationMethod {
  CRYPTOGRAPHIC = 'cryptographic',
  BIOMETRIC = 'biometric',
  BEHAVIORAL = 'behavioral',
  SOCIAL = 'social',
  MULTI_FACTOR = 'multi_factor'
}

export enum VerificationLevel {
  BASIC = 'basic',
  ENHANCED = 'enhanced',
  PREMIUM = 'premium',
  ENTERPRISE = 'enterprise'
}

export enum CertificateType {
  IDENTITY = 'identity',
  CAPABILITY = 'capability',
  TRUST = 'trust',
  SECURITY = 'security'
}

// Supporting Types
export interface RelationshipEvent {
  timestamp: Date;
  type: string;
  description: string;
  impact: number;
}

export interface RelationshipMetadata {
  context: string;
  environment: string;
  frequency: number;
  quality: number;
}

export interface TrustNode {
  id: string;
  type: EntityType;
  trustLevel: number;
  reputation: number;
  lastInteraction: Date;
}

export interface TrustEdge {
  source: string;
  target: string;
  trust: number;
  confidence: number;
  lastUpdated: Date;
}

export interface CentralityMetrics {
  degree: number;
  betweenness: number;
  closeness: number;
  eigenvector: number;
}

export interface ClusteringMetrics {
  coefficient: number;
  modularity: number;
  communities: string[];
}

export interface ResilienceMetrics {
  robustness: number;
  recovery: number;
  adaptation: number;
}

export interface IdentityEvent {
  timestamp: Date;
  type: string;
  description: string;
  impact: number;
  metadata: Record<string, any>;
}

export interface Timeline {
  start: Date;
  end: Date;
  events: IdentityEvent[];
  phases: TimelinePhase[];
}

export interface TimelinePhase {
  name: string;
  start: Date;
  end: Date;
  description: string;
  characteristics: string[];
}

export interface Milestone {
  id: string;
  name: string;
  description: string;
  achievedAt: Date;
  significance: number;
  evidence: string[];
}

export interface EvolutionStage {
  name: string;
  start: Date;
  end?: Date;
  characteristics: string[];
  capabilities: string[];
  limitations: string[];
}

export interface Adaptation {
  id: string;
  trigger: string;
  response: string;
  effectiveness: number;
  timestamp: Date;
}

export interface Learning {
  id: string;
  concept: string;
  proficiency: number;
  confidence: number;
  acquiredAt: Date;
  source: string;
}

export interface Transformation {
  id: string;
  type: string;
  from: string;
  to: string;
  timestamp: Date;
  significance: number;
}

export interface PermissionCondition {
  type: string;
  value: any;
  operator: string;
}
