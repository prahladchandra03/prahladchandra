import { motion } from 'framer-motion';
import { Briefcase, Calendar, ChevronRight } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';
import { experiences } from '../../data/experience';

export default function Experience() {
  return (
    <section id="experience" className="py-20 lg:py-28 relative">
      <div className="section-container">
        <SectionHeader
          label="Experience"
          title="Professional Journey"
          description="Building production systems and engineering scalable solutions."
        />

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-cyan via-accent-emerald to-transparent hidden md:block" />
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-accent-cyan via-accent-emerald to-transparent md:hidden" />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`relative mb-12 last:mb-0 pl-12 md:pl-0 ${
                i % 2 === 0 ? 'md:pr-[calc(50%+2rem)]' : 'md:pl-[calc(50%+2rem)]'
              }`}
            >
              {/* Timeline dot */}
              <div
                className={`absolute top-2 w-3 h-3 rounded-full bg-accent-cyan border-2 border-surface-0 z-10 left-[10px] md:left-1/2 md:-translate-x-1/2`}
              >
                <div className="absolute inset-0 rounded-full bg-accent-cyan animate-ping opacity-30" />
              </div>

              {/* Card */}
              <div className="glass-card glass-card-hover p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-fg text-lg">{exp.role}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Briefcase size={14} className="text-accent-cyan" />
                      <span className="text-sm text-accent-cyan font-medium">{exp.company}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-fg-dim font-mono shrink-0">
                    <Calendar size={12} />
                    {exp.startDate} — {exp.endDate}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-fg-muted mb-4 leading-relaxed">{exp.description}</p>

                {/* Achievements */}
                <div className="mb-4">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-fg-dim mb-2">
                    Key Achievements
                  </h4>
                  <ul className="space-y-1.5">
                    {exp.achievements.map((achievement, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-fg-muted">
                        <ChevronRight size={14} className="text-accent-emerald shrink-0 mt-0.5" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5">
                  {exp.technologies.map((tech) => (
                    <span key={tech} className="tech-badge text-2xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
