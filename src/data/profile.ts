import type { Profile } from '../types';

export const profile: Profile = {
  name: 'Prahlad Chandra',
  title: 'Full Stack & Systems Developer',
  subtitle: 'Building scalable systems.\nEngineering better experiences.',
  bio: 'Full Stack Developer and systems-aware builder with 4 years of experience scaling production web applications on the MERN stack with TypeScript. Specializes in end-to-end backend architecture (REST/GraphQL APIs, Microservices, Redis Caching, SQS queues), RBAC/UBAC authorization models, and Agentic AI workflows. AWS Certified Solutions Architect - Associate.',
  email: 'prahladchandra11@gmail.com',
  location: 'Delhi NCR, India',
  availability: 'Available for opportunities',
  resumeUrl: '/Prahlad_Chandra_Final_Resume.pdf',
  links: {
    github: 'https://github.com/prahladchandra',
    linkedin: 'https://linkedin.com/in/prahlad-chandra-dev',
    email: 'mailto:prahladchandra11@gmail.com',
  },
};

export const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'Tools', href: '#tools' },
  { label: 'Contact', href: '#contact' },
];

export const metrics = [
  {
    label: 'Experience',
    value: '4+',
    suffix: ' Yrs',
    description: 'Scaling MERN & TypeScript apps',
    icon: 'Briefcase',
  },
  {
    label: 'AWS Certified',
    value: 'Solutions',
    suffix: ' Architect',
    description: 'Associate level certification',
    icon: 'Cloud',
  },
  {
    label: 'Performance',
    value: '30-60',
    suffix: '%',
    description: 'Latency reduction & caching',
    icon: 'Zap',
  },
  {
    label: 'Gov & Enterprise',
    value: '10+',
    suffix: ' Apps',
    description: 'Production systems shipped',
    icon: 'Server',
  },
];
