# AI Persistence Package - Production Deployment Guide

## 🚀 Complete Production-Ready Deployment

This guide provides comprehensive instructions for deploying the AI Persistence Package in a production environment with Docker, monitoring, and security.

## 📋 Prerequisites

### System Requirements
- **Docker**: Version 20.10+ with Docker Compose
- **Memory**: Minimum 4GB RAM, Recommended 8GB+
- **Storage**: Minimum 10GB free space
- **CPU**: 2+ cores recommended
- **OS**: Linux, macOS, or Windows with WSL2

### Required Software
```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

## 🏗️ Architecture Overview

### Production Stack
```
┌─────────────────────────────────────────────────────────────┐
│                    AI Persistence Package                   │
├─────────────────────────────────────────────────────────────┤
│  Nginx (Reverse Proxy)  │  SSL/TLS  │  Rate Limiting       │
├─────────────────────────────────────────────────────────────┤
│  AI Persistence Core    │  Admin API │  Health Checks      │
├─────────────────────────────────────────────────────────────┤
│  Redis (Cache)          │  PostgreSQL (Database)           │
├─────────────────────────────────────────────────────────────┤
│  Prometheus (Metrics)   │  Grafana (Visualization)         │
└─────────────────────────────────────────────────────────────┘
```

### Service Components
- **AI Persistence Core**: Main application with file-based persistence
- **Redis**: Shared learning database and caching
- **PostgreSQL**: Persistent storage for production data
- **Nginx**: Reverse proxy with SSL termination
- **Prometheus**: Metrics collection and monitoring
- **Grafana**: Visualization and alerting

## 🚀 Quick Start Deployment

### 1. Clone and Navigate
```bash
git clone <repository-url>
cd hyperbolic-geometric-neural-network/packages
```

### 2. Deploy with One Command
```bash
# Make deployment script executable
chmod +x deploy-production.sh

# Deploy everything
./deploy-production.sh
```

### 3. Verify Deployment
```bash
# Check all services are running
docker-compose ps

# Test API endpoints
curl http://localhost/health
curl http://localhost/api/status
```

## 🔧 Manual Deployment Steps

### Step 1: Build Production Package
```bash
# Build the application
./build-production.sh

# Verify build artifacts
ls -la dist/production/
```

### Step 2: Configure Environment
```bash
# Create environment file
cp .env.example .env

# Edit environment variables
nano .env
```

### Step 3: Build Docker Images
```bash
# Build all images
docker-compose build --no-cache

# Verify images
docker images | grep ai-persistence
```

### Step 4: Start Services
```bash
# Start all services
docker-compose up -d

# Check service status
docker-compose ps
```

### Step 5: Verify Deployment
```bash
# Check logs
docker-compose logs -f

# Test endpoints
curl http://localhost/health
curl http://localhost/api/status
```

## 🔐 Security Configuration

### Environment Variables
```bash
# Required security settings
H2GNN_ENCRYPTION_KEY=<32-byte-hex-key>
H2GNN_AUTH_TOKEN=<32-byte-hex-token>
POSTGRES_PASSWORD=<strong-password>
REDIS_PASSWORD=<strong-password>
GRAFANA_PASSWORD=<strong-password>
```

### SSL/TLS Configuration
```bash
# Generate SSL certificates
mkdir -p ssl
openssl req -x509 -newkey rsa:4096 -keyout ssl/key.pem -out ssl/cert.pem -days 365 -nodes \
    -subj "/C=US/ST=State/L=City/O=Organization/CN=your-domain.com"
```

### Firewall Configuration
```bash
# Allow required ports
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 3000/tcp
sudo ufw allow 3001/tcp
sudo ufw allow 9090/tcp
```

## 📊 Monitoring and Observability

### Prometheus Metrics
- **Endpoint**: http://localhost:9090
- **Metrics**: System, application, and custom metrics
- **Retention**: 200 hours by default

### Grafana Dashboards
- **Endpoint**: http://localhost:3001
- **Default Login**: admin / (password from .env)
- **Dashboards**: Pre-configured for AI Persistence monitoring

### Health Checks
```bash
# Application health
curl http://localhost/health

# Service health
docker-compose ps

# Database health
docker-compose exec postgres pg_isready
```

## 🗄️ Database Management

### PostgreSQL Configuration
```bash
# Connect to database
docker-compose exec postgres psql -U ai_persistence -d ai_persistence

# View tables
\dt

# View data
SELECT * FROM identities;
SELECT * FROM memories;
SELECT * FROM learning_progress;
```

### Backup and Restore
```bash
# Backup database
docker-compose exec postgres pg_dump -U ai_persistence ai_persistence > backup.sql

# Restore database
docker-compose exec -T postgres psql -U ai_persistence ai_persistence < backup.sql
```

## 🔄 Maintenance Operations

### Update Services
```bash
# Pull latest images
docker-compose pull

# Restart services
docker-compose up -d

# Verify updates
docker-compose ps
```

### Scale Services
```bash
# Scale AI Persistence service
docker-compose up -d --scale ai-persistence=3

# Scale Redis
docker-compose up -d --scale redis=2
```

### Log Management
```bash
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f ai-persistence

# View logs with timestamps
docker-compose logs -f -t
```

## 🚨 Troubleshooting

### Common Issues

#### Service Won't Start
```bash
# Check logs
docker-compose logs ai-persistence

# Check resource usage
docker stats

# Restart service
docker-compose restart ai-persistence
```

#### Database Connection Issues
```bash
# Check PostgreSQL status
docker-compose exec postgres pg_isready

# Check Redis status
docker-compose exec redis redis-cli ping

# Restart databases
docker-compose restart postgres redis
```

#### SSL Certificate Issues
```bash
# Check certificate validity
openssl x509 -in ssl/cert.pem -text -noout

# Regenerate certificates
rm ssl/cert.pem ssl/key.pem
openssl req -x509 -newkey rsa:4096 -keyout ssl/key.pem -out ssl/cert.pem -days 365 -nodes
```

### Performance Issues
```bash
# Check resource usage
docker stats

# Check disk usage
docker system df

# Clean up unused resources
docker system prune -a
```

## 📈 Performance Optimization

### Resource Limits
```yaml
# In docker-compose.yml
services:
  ai-persistence:
    deploy:
      resources:
        limits:
          memory: 2G
          cpus: '1.0'
        reservations:
          memory: 1G
          cpus: '0.5'
```

### Database Optimization
```sql
-- Optimize PostgreSQL
ALTER SYSTEM SET shared_buffers = '256MB';
ALTER SYSTEM SET effective_cache_size = '1GB';
ALTER SYSTEM SET maintenance_work_mem = '64MB';
ALTER SYSTEM SET checkpoint_completion_target = 0.9;
```

### Caching Configuration
```yaml
# Redis configuration
redis:
  command: redis-server --maxmemory 512mb --maxmemory-policy allkeys-lru
```

## 🔒 Security Best Practices

### Network Security
- Use HTTPS in production
- Implement rate limiting
- Use strong passwords
- Regular security updates

### Data Protection
- Encrypt sensitive data
- Regular backups
- Access control
- Audit logging

### Container Security
- Use non-root users
- Regular image updates
- Security scanning
- Resource limits

## 📋 Production Checklist

### Pre-Deployment
- [ ] Environment variables configured
- [ ] SSL certificates generated
- [ ] Firewall rules configured
- [ ] Resource requirements met
- [ ] Backup strategy planned

### Post-Deployment
- [ ] All services running
- [ ] Health checks passing
- [ ] SSL certificates valid
- [ ] Monitoring configured
- [ ] Logs being collected
- [ ] Backups working

### Ongoing Maintenance
- [ ] Regular security updates
- [ ] Monitor resource usage
- [ ] Review logs regularly
- [ ] Test backups
- [ ] Update documentation

## 🎯 Success Metrics

### Performance Metrics
- **Response Time**: < 100ms for API calls
- **Throughput**: > 1000 requests/second
- **Uptime**: > 99.9% availability
- **Memory Usage**: < 80% of allocated

### Business Metrics
- **AI Learning**: Concepts learned per session
- **Memory Retention**: Memories consolidated
- **Identity Evolution**: Identity updates over time
- **User Satisfaction**: API response quality

## 📞 Support and Resources

### Documentation
- [Implementation Guide](./IMPLEMENTATION_GUIDE.md)
- [File-Based Persistence Guide](./FILE_BASED_PERSISTENCE_GUIDE.md)
- [API Documentation](./docs/api/)

### Monitoring
- **Prometheus**: http://localhost:9090
- **Grafana**: http://localhost:3001
- **Health Check**: http://localhost/health

### Logs
```bash
# Application logs
docker-compose logs -f ai-persistence

# All services logs
docker-compose logs -f

# System logs
journalctl -u docker
```

## 🚀 Ready for Production!

The AI Persistence Package is now deployed with:
- ✅ **Complete AI Persistence** - Identity, memory, and learning preserved
- ✅ **Production-Ready Infrastructure** - Docker, monitoring, security
- ✅ **Scalable Architecture** - Horizontal scaling support
- ✅ **Comprehensive Monitoring** - Prometheus and Grafana
- ✅ **Security Hardening** - SSL, encryption, access control
- ✅ **High Availability** - Health checks, auto-restart
- ✅ **Operational Excellence** - Logging, backup, maintenance

Your AI systems now have **universal persistence** across any deployment scenario! 🎉
