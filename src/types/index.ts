// ============================================
// Portfolio Type Definitions
// ============================================

export interface Profile {
  name: string;
  title: string;
  subtitle: string;
  bio: string;
  email: string;
  location: string;
  availability: string;
  resumeUrl: string;
  links: SocialLinks;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  email: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  startDate: string;
  endDate: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  achievements: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  problem: string;
  solution: string;
  architecture: string;
  technologies: string[];
  impact: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  featured: boolean;
}

export interface SkillCategory {
  id: string;
  name: string;
  icon: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  icon?: string;
  category: string;
  usage: string;
}

export interface ToolInfo {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
}

export interface MetricItem {
  label: string;
  value: string;
  suffix?: string;
  description: string;
  icon: string;
}

export interface ArchitectureNode {
  id: string;
  label: string;
  description: string;
  technology: string;
  purpose: string;
  scalability: string;
  x: number;
  y: number;
  layer: number;
}

export interface ArchitectureConnection {
  from: string;
  to: string;
  animated?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
