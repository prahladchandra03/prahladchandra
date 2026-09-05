import { motion } from 'framer-motion';
import { ExternalLink, GitFork, Star } from 'lucide-react';
import { GithubIcon } from '../common/SocialIcons';
import SectionHeader from '../common/SectionHeader';
import { profile } from '../../data/profile';

const featuredRepos = [
  {
    name: 'smart-api-monitor',
    description: 'SaaS platform for monitoring API uptime and performance',
    language: 'TypeScript',
    languageColor: '#3178c6',
  },
  {
    name: 'scalable-task-system',
    description: 'Production-style task management with microservices architecture',
    language: 'JavaScript',
    languageColor: '#f7df1e',
  },
  {
    name: 'portfolio',
    description: 'Interactive developer portfolio built with React + Three.js',
    language: 'TypeScript',
    languageColor: '#3178c6',
  },
];

export default function GitHubSection() {
  return (
    <section className="py-20 lg:py-28 relative">
      <div className="section-container">
        <SectionHeader
          label="Open Source"
          title="GitHub Activity"
          description="Check out my repositories and open source contributions."
        />

        <div className="max-w-4xl mx-auto">
          {/* Featured Repos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {featuredRepos.map((repo, i) => (
              <motion.a
                key={repo.name}
                href={`${profile.links.github}/${repo.name}`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card glass-card-hover p-5 group block"
              >
                <div className="flex items-center gap-2 mb-2">
                  <GitFork size={14} className="text-fg-dim" />
                  <span className="text-sm font-medium text-fg group-hover:text-accent-cyan transition-colors truncate">
                    {repo.name}
                  </span>
                </div>
                <p className="text-xs text-fg-muted mb-3 line-clamp-2">{repo.description}</p>
                <div className="flex items-center gap-3 text-xs text-fg-dim">
                  <span className="flex items-center gap-1">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: repo.languageColor }}
                    />
                    {repo.language}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star size={12} />—
                  </span>
                </div>
              </motion.a>
            ))}
          </div>

          {/* GitHub CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <GithubIcon size={16} />
              View GitHub Profile
              <ExternalLink size={14} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
