-- AI Persistence Package - PostgreSQL Initialization Script
-- Creates necessary tables and indexes for production deployment

-- Create database if it doesn't exist
CREATE DATABASE ai_persistence;

-- Connect to the database
\c ai_persistence;

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create tables for AI Persistence Package

-- Identities table
CREATE TABLE IF NOT EXISTS identities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    capabilities JSONB DEFAULT '[]',
    preferences JSONB DEFAULT '{}',
    hyperbolic_position JSONB,
    embedding JSONB,
    relationships JSONB DEFAULT '[]',
    trust_network JSONB DEFAULT '{}',
    history JSONB DEFAULT '{}',
    evolution JSONB DEFAULT '{}',
    verification JSONB DEFAULT '{}',
    certificates JSONB DEFAULT '[]',
    permissions JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_accessed TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Memories table
CREATE TABLE IF NOT EXISTS memories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    metadata JSONB DEFAULT '{}',
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Learning progress table
CREATE TABLE IF NOT EXISTS learning_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    concept VARCHAR(255) NOT NULL,
    data JSONB DEFAULT '{}',
    context JSONB DEFAULT '{}',
    performance DECIMAL(3,2) DEFAULT 0.0,
    confidence DECIMAL(3,2) DEFAULT 0.0,
    mastery DECIMAL(3,2) DEFAULT 0.0,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Checkpoints table
CREATE TABLE IF NOT EXISTS checkpoints (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    state JSONB DEFAULT '{}',
    metadata JSONB DEFAULT '{}',
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- System state table
CREATE TABLE IF NOT EXISTS system_state (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    state JSONB NOT NULL,
    encrypted BOOLEAN DEFAULT FALSE,
    checksum VARCHAR(64),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_identities_name ON identities(name);
CREATE INDEX IF NOT EXISTS idx_identities_type ON identities(type);
CREATE INDEX IF NOT EXISTS idx_identities_created_at ON identities(created_at);
CREATE INDEX IF NOT EXISTS idx_identities_updated_at ON identities(updated_at);

CREATE INDEX IF NOT EXISTS idx_memories_type ON memories(type);
CREATE INDEX IF NOT EXISTS idx_memories_timestamp ON memories(timestamp);
CREATE INDEX IF NOT EXISTS idx_memories_created_at ON memories(created_at);
CREATE INDEX IF NOT EXISTS idx_memories_content_gin ON memories USING gin(to_tsvector('english', content));

CREATE INDEX IF NOT EXISTS idx_learning_progress_concept ON learning_progress(concept);
CREATE INDEX IF NOT EXISTS idx_learning_progress_performance ON learning_progress(performance);
CREATE INDEX IF NOT EXISTS idx_learning_progress_timestamp ON learning_progress(timestamp);

CREATE INDEX IF NOT EXISTS idx_checkpoints_name ON checkpoints(name);
CREATE INDEX IF NOT EXISTS idx_checkpoints_timestamp ON checkpoints(timestamp);

CREATE INDEX IF NOT EXISTS idx_system_state_created_at ON system_state(created_at);

-- Create functions for automatic timestamp updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_identities_updated_at BEFORE UPDATE ON identities
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_memories_updated_at BEFORE UPDATE ON memories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_learning_progress_updated_at BEFORE UPDATE ON learning_progress
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create views for common queries
CREATE VIEW IF NOT EXISTS identity_summary AS
SELECT 
    id,
    name,
    type,
    created_at,
    updated_at,
    last_accessed,
    jsonb_array_length(capabilities) as capability_count,
    jsonb_array_length(relationships) as relationship_count
FROM identities;

CREATE VIEW IF NOT EXISTS memory_summary AS
SELECT 
    type,
    COUNT(*) as count,
    MIN(timestamp) as earliest,
    MAX(timestamp) as latest,
    AVG(EXTRACT(EPOCH FROM (NOW() - timestamp))) as avg_age_seconds
FROM memories
GROUP BY type;

CREATE VIEW IF NOT EXISTS learning_summary AS
SELECT 
    concept,
    COUNT(*) as sessions,
    AVG(performance) as avg_performance,
    AVG(confidence) as avg_confidence,
    AVG(mastery) as avg_mastery,
    MAX(timestamp) as last_learned
FROM learning_progress
GROUP BY concept;

-- Insert initial data
INSERT INTO identities (name, type, capabilities, preferences) VALUES
('Default AI', 'ai', '["learning", "memory", "reasoning"]', '{"language": "en", "timezone": "UTC"}')
ON CONFLICT DO NOTHING;

-- Create user for the application
CREATE USER ai_persistence_user WITH PASSWORD 'ai_persistence_password';

-- Grant permissions
GRANT CONNECT ON DATABASE ai_persistence TO ai_persistence_user;
GRANT USAGE ON SCHEMA public TO ai_persistence_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO ai_persistence_user;
GRANT SELECT, USAGE ON ALL SEQUENCES IN SCHEMA public TO ai_persistence_user;

-- Grant permissions for future tables
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO ai_persistence_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, USAGE ON SEQUENCES TO ai_persistence_user;
