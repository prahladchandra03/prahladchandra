import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'gov-event-portals',
    title: 'Gov Event Portals (BRICS & IAFS 2026)',
    description:
      'Summit-scale event management portals built for National e-Governance Division (NEGD), MeitY, managing international delegations, exhibitions, and RBAC security.',
    problem:
      'Managing multi-nation international summits like India-Africa Forum Summit (IAFS 2026 - iafs2026.in) and BRICS required a resilient, audit-compliant monorepo platform with strict role-based access for diverse government bodies.',
    solution:
      'Architected a monorepo platform with Node.js/Express REST APIs and React interfaces. Built the Exhibition module end-to-end, reusable component suites (Quiz, Pledge, Survey), and granular RBAC/UBAC authorization layers.',
    architecture:
      'Monorepo architecture with decoupled microservices, RBAC/UBAC middleware layers, Redis session caching, and automated CI/CD pipelines deployed to AWS infrastructure.',
    technologies: [
      'Node.js',
      'Express.js',
      'React',
      'TypeScript',
      'Monorepo',
      'RBAC / UBAC',
      'AWS',
      'Docker',
      'CI/CD',
    ],
    impact: [
      'Architected summit-scale government portals (IAFS 2026 & BRICS)',
      'Engineered reusable component suite standardizing UI/UX cross-platform',
      'Enforced audit-ready granular RBAC/UBAC permission controls',
      'Zero-downtime emergency hotfixes delivered via automated CI/CD',
    ],
    featured: true,
  },
  {
    id: 'ecommerce-microservices',
    title: 'Scalable E-Commerce Microservices Platform',
    description:
      'High-concurrency multi-tenant microservices platform with Redis caching, Amazon SQS queue processing, and real-time WebSocket inventory tracking.',
    problem:
      'Handling flash-sale traffic bursts and inventory synchronization across multi-tenant storefronts without database read bottlenecks or order dropped requests.',
    solution:
      'Designed a decoupled microservices platform leveraging Redis caching, Amazon SQS for asynchronous message queuing, and WebSockets for live inventory & order status updates.',
    architecture:
      'Event-driven microservices architecture with API Gateway. Redis cache layer for high-throughput reads, Amazon SQS queue for order processing, and MongoDB for catalog storage.',
    technologies: [
      'React',
      'Node.js',
      'MongoDB',
      'Redis',
      'WebSockets',
      'Amazon SQS',
      'Express.js',
      'TypeScript',
    ],
    impact: [
      'Cut database read load by 60% using Redis caching',
      'Real-time inventory and order updates via WebSockets',
      'Zero order loss during high-concurrency traffic bursts via SQS queues',
      'Multi-tenant architecture supporting thousands of concurrent users',
    ],
    githubUrl: 'https://github.com/prahladchandra',
    featured: true,
  },
  {
    id: 'enterprise-erp-rbac',
    title: 'Enterprise ERP & RBAC/UBAC System',
    description:
      'Enterprise platform featuring granular Role-Based & User-Based Access Control across 50+ secured API endpoints with custom validation middleware.',
    problem:
      'Complex enterprise operational workflows needed strict, audit-ready data segregation, dynamic persona dashboards, and fine-grained endpoint authorization.',
    solution:
      'Built a centralized RBAC/UBAC authentication & authorization engine, custom request-validation middleware, and modular React administrative interfaces.',
    architecture:
      'Node.js & Express REST core with JWT authentication, custom UBAC permission-checking middleware, and MongoDB document storage with optimized indexing.',
    technologies: [
      'Node.js',
      'Express.js',
      'MongoDB',
      'JWT',
      'RBAC / UBAC',
      'React',
      'TypeScript',
    ],
    impact: [
      'Secured 50+ API endpoints with granular RBAC/UBAC permissions',
      'Cut system crashes by 15% using custom request-validation middleware',
      'Streamlined admin operations with role-scoped persona dashboards',
    ],
    githubUrl: 'https://github.com/prahladchandra',
    featured: true,
  },
];
