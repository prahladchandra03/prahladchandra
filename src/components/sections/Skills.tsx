import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Monitor, Database, Cloud, Wrench } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';
import { skillCategories } from '../../data/skills';

const iconMap: Record<string, React.ComponentType<any>> = {
  Server,
  Monitor,
  Database,
  Cloud,
  Wrench,
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].id);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const currentCategory = skillCategories.find((c) => c.id === activeCategory)!;

  return (
    <section id="skills" className="py-20 lg:py-28 relative">
      <div className="section-container">
        <SectionHeader
          label="Tech Stack"
          title="Technology Ecosystem"
          description="Technologies and tools I use to build production systems."
        />

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {skillCategories.map((cat) => {
            const Icon = iconMap[cat.icon] || Server;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 focus-ring ${
                  isActive
                    ? 'bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/30'
                    : 'text-fg-muted hover:text-fg border border-border-subtle hover:border-border-medium bg-surface-glass'
                }`}
              >
                <Icon size={16} />
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Skills grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-w-4xl mx-auto"
          >
            {currentCategory.skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
                className="relative glass-card glass-card-hover p-4 text-center cursor-default"
              >
                <div className="font-medium text-sm text-fg mb-1">{skill.name}</div>
                <div className="text-xs text-fg-dim font-mono">{skill.category}</div>

                {/* Tooltip on hover */}
                <AnimatePresence>
                  {hoveredSkill === skill.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 p-3 glass-card text-xs text-fg-muted text-left z-20 shadow-card"
                    >
                      <div className="font-semibold text-fg mb-1">{skill.name}</div>
                      <p className="leading-relaxed">{skill.usage}</p>
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rotate-45 bg-surface-glass border-r border-b border-border-subtle" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
