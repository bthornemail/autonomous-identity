/**
 * Memory System Types
 * 
 * Core type definitions for AI memory management
 */

export interface MemorySystem {
  store(memory: Memory): Promise<void>;
  retrieve(query: any): Promise<Memory[]>;
  consolidate(): Promise<void>;
  compress(): Promise<void>;
  initialize(): Promise<void>;
  shutdown(): Promise<void>;
  getMemories(): Promise<Memory[]>;
  setMemories(memories: Memory[]): Promise<void>;
}

export interface Memory {
  id: string;
  type: string;
  content: string;
  metadata: Record<string, any>;
  timestamp: Date;
}

export interface EpisodicMemory {
  events: Event[];
  timeline: Timeline;
  associations: Association[];
  emotions: EmotionalContext[];
  
  // Operations
  addEvent(event: Event): Promise<void>;
  getEvents(timeRange: { start: Date; end: Date }): Promise<Event[]>;
  findAssociations(event: Event): Promise<Association[]>;
  createTimeline(events: Event[]): Promise<Timeline>;
  addEmotionalContext(event: Event, emotion: Emotion): Promise<void>;
}

export interface SemanticMemory {
  concepts: Concept[];
  relationships: Relationship[];
  hierarchies: Hierarchy[];
  ontologies: Ontology[];
  
  // Operations
  addConcept(concept: Concept): Promise<void>;
  findConcepts(query: string): Promise<Concept[]>;
  getRelationships(concept: Concept): Promise<Relationship[]>;
  buildHierarchy(concepts: Concept[]): Promise<Hierarchy>;
  createOntology(concepts: Concept[]): Promise<Ontology>;
}

export interface ProceduralMemory {
  skills: Skill[];
  procedures: Procedure[];
  automations: Automation[];
  habits: Habit[];
  
  // Operations
  learnSkill(skill: Skill): Promise<void>;
  executeProcedure(procedure: Procedure): Promise<any>;
  createAutomation(automation: Automation): Promise<void>;
  formHabit(habit: Habit): Promise<void>;
}

export interface WorkingMemory {
  capacity: number;
  current: MemoryItem[];
  attention: AttentionFocus[];
  processing: ProcessingTask[];
  
  // Operations
  add(memory: MemoryItem): Promise<void>;
  remove(id: string): Promise<void>;
  focus(attention: AttentionFocus): Promise<void>;
  process(task: ProcessingTask): Promise<any>;
}

export interface MetaMemory {
  memories: Memory[];
  strategies: MemoryStrategy[];
  monitoring: MemoryMonitoring;
  
  // Operations
  remember(memory: Memory): Promise<void>;
  forget(memoryId: string): Promise<void>;
  monitor(): Promise<any>;
  control(strategy: MemoryStrategy): Promise<void>;
}

export interface HyperbolicMemory {
  // Hyperbolic Embeddings
  embeddings: HyperbolicEmbedding[];
  relationships: HyperbolicRelationship[];
  hierarchies: HyperbolicHierarchy[];
  clusters: HyperbolicCluster[];
  
  // Operations
  embed(memory: Memory): Promise<HyperbolicEmbedding>;
  findSimilar(embedding: HyperbolicEmbedding, threshold: number): Promise<Memory[]>;
  computeDistance(embedding1: HyperbolicEmbedding, embedding2: HyperbolicEmbedding): Promise<number>;
  consolidate(embeddings: HyperbolicEmbedding[]): Promise<ConsolidatedMemory>;
  cluster(embeddings: HyperbolicEmbedding[]): Promise<HyperbolicCluster[]>;
}

export interface HyperbolicEmbedding {
  id: string;
  vector: number[];
  norm: number;
  curvature: number;
  timestamp: Date;
  metadata: { dimension: number; quality: number; confidence: number; source: string };
  relationships: string[];
}

export interface HyperbolicRelationship {
  source: string;
  target: string;
  distance: number;
  relationshipType: string;
  strength: number;
  confidence: number;
  timestamp: Date;
}

export interface HyperbolicHierarchy {
  root: string;
  levels: HierarchyLevel[];
  relationships: HierarchyRelationship[];
  properties: HierarchyProperties;
}

export interface HyperbolicCluster {
  id: string;
  center: HyperbolicEmbedding;
  members: HyperbolicEmbedding[];
  radius: number;
  density: number;
  cohesion: number;
}

export interface MemoryConsolidation {
  // Consolidation Strategies
  temporal: TemporalConsolidation;
  semantic: SemanticConsolidation;
  emotional: any;
  hierarchical: any;
  
  // Consolidation Operations
  consolidate(memories: Memory[]): Promise<ConsolidatedMemory>;
  compress(memories: Memory[]): Promise<CompressedMemory>;
  index(memories: Memory[]): Promise<MemoryIndex>;
  cluster(memories: Memory[]): Promise<MemoryCluster[]>;
}

export interface TemporalConsolidation {
  // Temporal Operations
  groupByTime(memories: Memory[], timeWindow: TimeWindow): Promise<MemoryGroup[]>;
  createTimeline(memories: Memory[]): Promise<Timeline>;
  findPatterns(memories: Memory[]): Promise<Pattern[]>;
  predictFuture(memories: Memory[]): Promise<Prediction[]>;
}

export interface SemanticConsolidation {
  // Semantic Operations
  groupBySemantics(memories: Memory[]): Promise<SemanticGroup[]>;
  createOntology(memories: Memory[]): Promise<Ontology>;
  findSimilarities(memories: Memory[]): Promise<Similarity[]>;
  buildHierarchy(memories: Memory[]): Promise<Hierarchy>;
}

// Supporting Types
export enum MemoryType {
  EPISODIC = 'episodic',
  SEMANTIC = 'semantic',
  PROCEDURAL = 'procedural',
  WORKING = 'working',
  META = 'meta'
}

export interface MemoryMetadata {
  source: string;
  timestamp: Date;
  quality: number;
  confidence: number;
  importance: number;
  tags: string[];
  context: Record<string, any>;
}

export interface MemoryRelationship {
  target: string;
  type: RelationshipType;
  strength: number;
  confidence: number;
  timestamp: Date;
}

export interface AccessControl {
  owner: string;
  permissions: Permission[];
  restrictions: Restriction[];
  sharing: SharingPolicy;
}

export interface MemoryLifecycle {
  created: Date;
  accessed: Date[];
  modified: Date[];
  archived?: Date;
  deleted?: Date;
  retention: RetentionPolicy;
}

export interface Event {
  id: string;
  timestamp: Date;
  type: string;
  description: string;
  participants: string[];
  location: Location;
  context: Record<string, any>;
}

export interface Association {
  source: string;
  target: string;
  strength: number;
  type: string;
  context: string;
}

export interface EmotionalContext {
  emotion: Emotion;
  intensity: number;
  valence: number;
  arousal: number;
  timestamp: Date;
}

export interface Concept {
  id: string;
  name: string;
  definition: string;
  category: string;
  properties: ConceptProperty[];
  relationships: ConceptRelationship[];
}

export interface Relationship {
  source: string;
  target: string;
  type: string;
  strength: number;
  confidence: number;
  bidirectional: boolean;
}

export interface Hierarchy {
  root: string;
  levels: HierarchyLevel[];
  relationships: HierarchyRelationship[];
}

export interface Ontology {
  id: string;
  name: string;
  concepts: Concept[];
  relationships: Relationship[];
  axioms: Axiom[];
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  proficiency: number;
  confidence: number;
  prerequisites: string[];
  applications: string[];
}

export interface Procedure {
  id: string;
  name: string;
  steps: ProcedureStep[];
  conditions: Condition[];
  outcomes: Outcome[];
}

export interface Automation {
  id: string;
  name: string;
  trigger: Trigger;
  action: Action;
  conditions: Condition[];
  schedule?: Schedule;
}

export interface Habit {
  id: string;
  name: string;
  pattern: Pattern;
  frequency: number;
  strength: number;
  context: string;
}

export interface MemoryItem {
  id: string;
  content: any;
  priority: number;
  timestamp: Date;
  duration: number;
}

export interface AttentionFocus {
  target: string;
  intensity: number;
  duration: number;
  context: string;
}

export interface ProcessingTask {
  id: string;
  type: string;
  input: any;
  goal: string;
  constraints: Constraint[];
}

export interface MemoryStrategy {
  name: string;
  description: string;
  conditions: Condition[];
  actions: Action[];
  effectiveness: number;
}

export interface MemoryMonitoring {
  metrics: MemoryMetrics;
  alerts: Alert[];
  reports: Report[];
  dashboards: Dashboard[];
}

export interface MemoryControl {
  strategies: MemoryStrategy[];
  policies: Policy[];
  rules: Rule[];
  automation: Automation[];
}

export interface ConsolidatedMemory {
  id: string;
  sourceMemories: string[];
  content: any;
  embedding: HyperbolicEmbedding;
  confidence: number;
  timestamp: Date;
}

export interface CompressedMemory {
  id: string;
  original: string;
  compressed: any;
  ratio: number;
  quality: number;
  timestamp: Date;
}

export interface MemoryIndex {
  id: string;
  memories: string[];
  structure: IndexStructure;
  metadata: IndexMetadata;
}

export interface MemoryCluster {
  id: string;
  center: HyperbolicEmbedding;
  members: string[];
  properties: ClusterProperties;
}

export interface TimeWindow {
  start: Date;
  end: Date;
  granularity: TimeGranularity;
}

export interface MemoryGroup {
  id: string;
  memories: string[];
  properties: GroupProperties;
  timestamp: Date;
}

export interface Timeline {
  id: string;
  events: Event[];
  phases: TimelinePhase[];
  start: Date;
  end: Date;
}

export interface Pattern {
  id: string;
  type: string;
  frequency: number;
  confidence: number;
  examples: string[];
}

export interface Prediction {
  id: string;
  type: string;
  probability: number;
  confidence: number;
  timeframe: TimeFrame;
}

export interface SemanticGroup {
  id: string;
  memories: string[];
  theme: string;
  coherence: number;
  properties: GroupProperties;
}

export interface Ontology {
  id: string;
  concepts: Concept[];
  relationships: Relationship[];
  axioms: Axiom[];
  metadata: OntologyMetadata;
}

export interface Similarity {
  source: string;
  target: string;
  similarity: number;
  type: string;
  confidence: number;
}

export interface Hierarchy {
  id: string;
  root: string;
  levels: HierarchyLevel[];
  relationships: HierarchyRelationship[];
  properties: HierarchyProperties;
}

// Additional supporting types
export interface Location {
  type: string;
  coordinates: number[];
  name: string;
  context: string;
}

export interface Emotion {
  name: string;
  category: string;
  intensity: number;
  valence: number;
  arousal: number;
}

export interface ConceptProperty {
  name: string;
  value: any;
  type: string;
  confidence: number;
}

export interface ConceptRelationship {
  target: string;
  type: string;
  strength: number;
  confidence: number;
}

export interface HierarchyLevel {
  level: number;
  nodes: string[];
  properties: LevelProperties;
}

export interface HierarchyRelationship {
  parent: string;
  child: string;
  type: string;
  strength: number;
}

export interface HierarchyProperties {
  depth: number;
  breadth: number;
  balance: number;
  connectivity: number;
}

export interface ProcedureStep {
  id: string;
  order: number;
  action: string;
  conditions: Condition[];
  outcomes: Outcome[];
}

export interface Condition {
  type: string;
  value: any;
  operator: string;
}

export interface Outcome {
  type: string;
  value: any;
  probability: number;
}

export interface Trigger {
  type: string;
  condition: Condition;
  frequency: number;
}

export interface Action {
  type: string;
  parameters: Record<string, any>;
  conditions: Condition[];
}

export interface Schedule {
  frequency: string;
  time: string;
  days: string[];
  timezone: string;
}

export interface Pattern {
  type: string;
  frequency: number;
  context: string;
  strength: number;
}

export interface Constraint {
  type: string;
  value: any;
  operator: string;
}

export interface MemoryMetrics {
  total: number;
  active: number;
  archived: number;
  deleted: number;
  quality: number;
  performance: number;
}

export interface Alert {
  id: string;
  type: string;
  severity: string;
  message: string;
  timestamp: Date;
  resolved: boolean;
}

export interface Report {
  id: string;
  type: string;
  content: any;
  timestamp: Date;
  period: TimeFrame;
}

export interface Dashboard {
  id: string;
  name: string;
  widgets: Widget[];
  layout: Layout;
  refresh: number;
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

export interface IndexStructure {
  type: string;
  properties: Record<string, any>;
  performance: PerformanceMetrics;
}

export interface IndexMetadata {
  created: Date;
  updated: Date;
  size: number;
  performance: PerformanceMetrics;
}

export interface ClusterProperties {
  size: number;
  density: number;
  cohesion: number;
  separation: number;
}

export interface GroupProperties {
  size: number;
  coherence: number;
  diversity: number;
  stability: number;
}

export interface OntologyMetadata {
  version: string;
  created: Date;
  updated: Date;
  size: number;
  quality: number;
}

export interface Axiom {
  id: string;
  statement: string;
  type: string;
  confidence: number;
}

export interface LevelProperties {
  size: number;
  density: number;
  connectivity: number;
  balance: number;
}

export interface Widget {
  id: string;
  type: string;
  data: any;
  position: Position;
  size: Size;
}

export interface Layout {
  rows: number;
  columns: number;
  widgets: Widget[];
}

export interface Enforcement {
  type: string;
  severity: string;
  actions: Action[];
}

export interface PerformanceMetrics {
  latency: number;
  throughput: number;
  accuracy: number;
  efficiency: number;
}

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface TimeFrame {
  start: Date;
  end: Date;
}

export interface TimeGranularity {
  unit: string;
  value: number;
}

export interface RetentionPolicy {
  duration: number;
  conditions: Condition[];
  actions: Action[];
}

export interface SharingPolicy {
  public: boolean;
  permissions: Permission[];
  restrictions: Restriction[];
}

export interface Permission {
  id: string;
  resource: string;
  action: string;
  conditions: Condition[];
}

export interface Restriction {
  id: string;
  type: string;
  condition: Condition;
  action: Action;
}

export interface RelationshipType {
  name: string;
  bidirectional: boolean;
  strength: number;
}

export interface TimelinePhase {
  name: string;
  start: Date;
  end: Date;
  characteristics: string[];
}
