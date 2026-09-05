import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronRight, X } from 'lucide-react';
import { GithubIcon } from '../common/SocialIcons';
import SectionHeader from '../common/SectionHeader';
import { projects } from '../../data/projects';
import type { Project } from '../../types';

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    // 3D tilt — max ±12deg
    const rotateX = ((y - cy) / cy) * -12;
    const rotateY = ((x - cx) / cx) * 12;

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    card.style.transition = 'transform 0.08s ease';

    // Spotlight glow follows cursor
    glow.style.background = `radial-gradient(220px circle at ${x}px ${y}px, rgba(0,212,255,0.13), transparent 70%)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
    card.style.transition = 'transform 0.4s ease';
    glow.style.background = 'transparent';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass-card gradient-border overflow-hidden cursor-pointer group relative"
      style={{ willChange: 'transform', transformStyle: 'preserve-3d' }}
      onClick={onClick}
    >
      {/* Mouse spotlight glow */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none z-0 rounded-xl transition-all duration-75"
      />

      {/* Top accent */}
      <div className="h-1 bg-gradient-to-r from-accent-cyan via-accent-emerald to-accent-violet relative z-10" />

      <div className="p-6 relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-lg text-fg group-hover:text-accent-cyan transition-colors">
            {project.title}
          </h3>
          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 rounded-lg text-fg-dim hover:text-accent-cyan transition-colors focus-ring"
                aria-label={`GitHub: ${project.title}`}
              >
                <GithubIcon size={16} />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 rounded-lg text-fg-dim hover:text-accent-cyan transition-colors focus-ring"
                aria-label={`Live: ${project.title}`}
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>

        <p className="text-sm text-fg-muted leading-relaxed mb-4">{project.description}</p>

        {/* Impact */}
        <div className="mb-4">
          {project.impact.slice(0, 2).map((item, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-fg-muted mb-1">
              <ChevronRight size={12} className="text-accent-emerald shrink-0 mt-0.5" />
              {item}
            </div>
          ))}
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.slice(0, 6).map((tech) => (
            <span key={tech} className="tech-badge text-2xs">
              {tech}
            </span>
          ))}
          {project.technologies.length > 6 && (
            <span className="tech-badge text-2xs">+{project.technologies.length - 6}</span>
          )}
        </div>

        {/* CTA */}
        <button className="flex items-center gap-1 text-xs font-medium text-accent-cyan hover:text-accent-emerald transition-colors group/cta">
          View Case Study
          <ChevronRight
            size={14}
            className="group-hover/cta:translate-x-1 transition-transform"
          />
        </button>
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-surface-0/90 backdrop-blur-xl" />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        className="relative glass-card max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-fg-muted hover:text-fg hover:bg-surface-2 transition-colors focus-ring"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-fg mb-2">{project.title}</h3>
          <p className="text-fg-muted">{project.description}</p>
        </div>

        {/* Case Study Flow */}
        {[
          { label: 'Problem', content: project.problem },
          { label: 'Architecture', content: project.architecture },
          { label: 'Solution', content: project.solution },
        ].map((section, i) => (
          <div key={section.label} className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-accent-cyan/10 text-accent-cyan text-xs font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <h4 className="text-sm font-semibold text-fg uppercase tracking-wider">
                {section.label}
              </h4>
            </div>
            <p className="text-sm text-fg-muted leading-relaxed pl-8">{section.content}</p>
          </div>
        ))}

        {/* Impact */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-fg uppercase tracking-wider mb-3">
            Impact & Results
          </h4>
          <div className="space-y-2 pl-2">
            {project.impact.map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-fg-muted">
                <ChevronRight size={14} className="text-accent-emerald shrink-0 mt-0.5" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Technologies */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-fg uppercase tracking-wider mb-3">
            Technologies
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span key={tech} className="tech-badge">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-3 pt-4 border-t border-border-subtle">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-xs"
            >
              <GithubIcon size={14} />
              View on GitHub
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs"
            >
              <ExternalLink size={14} />
              Live Demo
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-20 lg:py-28 relative">
      <div className="section-container">
        <SectionHeader
          label="Featured Work"
          title="Engineering Projects"
          description="Production systems and architectural solutions I've built."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
