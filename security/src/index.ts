/**
 * AI Persistence Security Package
 * 
 * Main entry point for the AI persistence security framework
 */

// Core interfaces
export * from './SecurityFramework';

// Type definitions
export * from '../types/security';

// Security classes
export class SecurityFramework {
  static create(config: SecurityFrameworkConfig): SecurityFramework {
    return new SecurityFrameworkImpl(config);
  }
}

// Re-export types for convenience
export type {
  SecurityFramework,
  EncryptionService,
  AuthenticationService,
  AuthorizationService,
  PrivacyService,
  AnonymizationService,
  AuditService,
  MonitoringService,
  EncryptedData,
  Credentials,
  AuthResult,
  Identity,
  Resource,
  Action,
  Permission,
  Role,
  AnonymizedData,
  PseudonymizedData,
  PrivateData,
  CleanedData,
  PrivacyPolicy,
  ComplianceReport,
  SecurityEvent,
  AuditReport,
  SecurityAnalysis,
  Anomaly,
  SecurityAlert,
  SecurityActivity,
  SecurityIncident,
  SecurityMetrics,
  TrendAnalysis,
  ThreatPrediction
} from '../types/security';

// Security configuration types
export interface SecurityFrameworkConfig {
  encryptionConfig: EncryptionConfig;
  keyManagementConfig: KeyManagementConfig;
  authenticationConfig: AuthenticationConfig;
  authorizationConfig: AuthorizationConfig;
  privacyConfig: PrivacyConfig;
  anonymizationConfig: AnonymizationConfig;
  auditConfig: AuditConfig;
  monitoringConfig: MonitoringConfig;
}

export interface EncryptionConfig {
  algorithm: string;
  keySize: number;
  mode: string;
  padding: string;
}

export interface KeyManagementConfig {
  storage: string;
  rotation: number;
  backup: boolean;
  recovery: boolean;
}

export interface AuthenticationConfig {
  methods: string[];
  strength: number;
  timeout: number;
  retries: number;
}

export interface AuthorizationConfig {
  model: string;
  policies: Policy[];
  enforcement: Enforcement;
}

export interface PrivacyConfig {
  level: PrivacyLevel;
  anonymization: boolean;
  retention: RetentionPolicy;
}

export interface AnonymizationConfig {
  techniques: string[];
  quality: number;
  privacy: number;
}

export interface AuditConfig {
  enabled: boolean;
  retention: number;
  compliance: ComplianceStandard[];
}

export interface MonitoringConfig {
  metrics: string[];
  alerts: Alert[];
  dashboards: Dashboard[];
}

// Version information
export const VERSION = '1.0.0';
export const PACKAGE_NAME = '@h2gnn/ai-persistence-security';

// Default security configuration
export const DEFAULT_SECURITY_CONFIG: SecurityFrameworkConfig = {
  encryptionConfig: {
    algorithm: 'AES-256',
    keySize: 256,
    mode: 'CBC',
    padding: 'PKCS7'
  },
  keyManagementConfig: {
    storage: 'file',
    rotation: 86400000, // 24 hours
    backup: true,
    recovery: true
  },
  authenticationConfig: {
    methods: ['token', 'biometric', 'mfa'],
    strength: 8,
    timeout: 3600000, // 1 hour
    retries: 3
  },
  authorizationConfig: {
    model: 'rbac',
    policies: [],
    enforcement: {
      type: 'strict',
      severity: 'high',
      actions: []
    }
  },
  privacyConfig: {
    level: 'private',
    anonymization: true,
    retention: {
      duration: 31536000000, // 1 year
      conditions: [],
      actions: []
    }
  },
  anonymizationConfig: {
    techniques: ['k_anonymity', 'l_diversity', 'differential_privacy'],
    quality: 0.8,
    privacy: 0.9
  },
  auditConfig: {
    enabled: true,
    retention: 31536000000, // 1 year
    compliance: ['gdpr', 'ccpa', 'hipaa']
  },
  monitoringConfig: {
    metrics: ['authentication', 'authorization', 'encryption', 'privacy'],
    alerts: [],
    dashboards: []
  }
};
