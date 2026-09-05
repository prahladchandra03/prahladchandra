import type { SkillCategory } from '../types';

export const skillCategories: SkillCategory[] = [
  {
    id: 'backend',
    name: 'Backend Engineering',
    icon: 'Server',
    skills: [
      { name: 'Node.js', category: 'Backend Engineering', usage: 'Primary runtime for scalable server applications and distributed systems' },
      { name: 'TypeScript', category: 'Backend Engineering', usage: 'Type-safe architecture for enterprise backend applications' },
      { name: 'Express.js', category: 'Backend Engineering', usage: 'HTTP framework for REST & GraphQL APIs and middleware architecture' },
      { name: 'REST & GraphQL APIs', category: 'Backend Engineering', usage: 'Designing high-performance, contract-first API services' },
      { name: 'Microservices', category: 'Backend Engineering', usage: 'Building decoupled, event-driven service architectures' },
      { name: 'WebSockets & SQS', category: 'Backend Engineering', usage: 'Real-time communication and Amazon SQS message queuing' },
    ],
  },
  {
    id: 'frontend',
    name: 'Frontend Development',
    icon: 'Monitor',
    skills: [
      { name: 'React.js', category: 'Frontend Development', usage: 'Building modular, performant user interfaces and component libraries' },
      { name: 'Next.js', category: 'Frontend Development', usage: 'Server-side rendering, static site generation, and full-stack React' },
      { name: 'TypeScript', category: 'Frontend Development', usage: 'Type-safe UI component development and state management' },
      { name: 'Redux Toolkit', category: 'Frontend Development', usage: 'Predictable state management for complex web applications' },
      { name: 'Tailwind CSS & MUI', category: 'Frontend Development', usage: 'Designing responsive, modern UI systems and accessible components' },
      { name: 'PWA', category: 'Frontend Development', usage: 'Progressive Web App features for offline support and mobile performance' },
    ],
  },
  {
    id: 'ai-workflows',
    name: 'AI & Agentic Workflows',
    icon: 'Sparkles',
    skills: [
      { name: 'Agentic AI Integration', category: 'AI & Agentic Workflows', usage: 'Embedding autonomous AI agents and automated workflows into web platforms' },
      { name: 'LLMs (Claude, ChatGPT, Google AI)', category: 'AI & Agentic Workflows', usage: 'Leveraging state-of-the-art LLMs for intelligent automation and search' },
      { name: 'Prompt Engineering', category: 'AI & Agentic Workflows', usage: 'Crafting structured, deterministic prompts for production AI applications' },
      { name: 'Automated Media Workflows', category: 'AI & Agentic Workflows', usage: 'Building automated asset generation & processing pipelines' },
    ],
  },
  {
    id: 'databases',
    name: 'Databases & Caching',
    icon: 'Database',
    skills: [
      { name: 'MongoDB', category: 'Databases & Caching', usage: 'Document database for flexible schemas and high-throughput workloads' },
      { name: 'PostgreSQL & MySQL', category: 'Databases & Caching', usage: 'Relational data modeling, complex joins, and ACID compliance' },
      { name: 'Redis', category: 'Databases & Caching', usage: 'In-memory caching, sub-200ms API acceleration, and pub/sub queues' },
      { name: 'Supabase', category: 'Databases & Caching', usage: 'Open-source Firebase alternative with real-time Postgres and Auth' },
    ],
  },
  {
    id: 'cloud-devops',
    name: 'DevOps, AWS & Monorepos',
    icon: 'Cloud',
    skills: [
      { name: 'AWS (S3, EC2, CloudFront)', category: 'DevOps, AWS & Monorepos', usage: 'Cloud infrastructure hosting, static asset storage, and CDN edge delivery' },
      { name: 'Monorepo Management', category: 'DevOps, AWS & Monorepos', usage: 'Managing multi-package government and enterprise codebases' },
      { name: 'Docker & Kubernetes', category: 'DevOps, AWS & Monorepos', usage: 'Containerization and container orchestration for resilient microservices' },
      { name: 'GitHub Actions & Jenkins', category: 'DevOps, AWS & Monorepos', usage: 'Automated CI/CD pipelines for staging, testing, and hotfixes' },
      { name: 'Vercel & Render', category: 'DevOps, AWS & Monorepos', usage: 'Serverless deployment and cloud hosting for frontend and Node.js APIs' },
    ],
  },
  {
    id: 'security-testing',
    name: 'Testing & Security',
    icon: 'ShieldCheck',
    skills: [
      { name: 'RBAC / UBAC', category: 'Testing & Security', usage: 'Role-Based & User-Based granular permission systems for audit compliance' },
      { name: 'JWT & OAuth', category: 'Testing & Security', usage: 'Secure token authentication and session management' },
      { name: 'Secure API Design', category: 'Testing & Security', usage: 'Input sanitization, CORS, rate limiting, and OWASP best practices' },
      { name: 'Jest & Mocha', category: 'Testing & Security', usage: 'Unit and integration testing for high reliability backend & frontend code' },
    ],
  },
];
