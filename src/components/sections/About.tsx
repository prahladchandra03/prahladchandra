import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Server, Cloud, ShieldCheck, Zap, Sparkles, Award } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';
import AnimatedCounter from '../common/AnimatedCounter';

const highlights = [
  'Backend & REST/GraphQL APIs',
  'Microservices & Amazon SQS',
  'RBAC & UBAC Security Models',
  'AWS Certified Solutions Architect',
  'Redis Caching & Latency Cuts',
  'Agentic AI & LLM Workflows',
  'Monorepo & CI/CD Pipelines',
  'Full-Stack MERN + TypeScript',
];

const stats = [
  { icon: Zap, value: 4, suffix: ' Yrs', label: 'MERN & TS Exp' },
  { icon: Server, value: 60, suffix: '%', label: 'Max Latency Cut' },
  { icon: Cloud, value: 10, suffix: '+', label: 'Production Apps' },
  { icon: ShieldCheck, value: 99.9, suffix: '%', label: 'Uptime Reliability' },
];

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section id="about" className="py-20 lg:py-28 relative">
      <div className="section-container">
        <SectionHeader
          label="About Me"
          title="Engineering Impact & Systems Architecture"
          description="Full Stack Developer specializing in production systems, RBAC security models, microservices, and Agentic AI integration."
        />

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-4">
          {/* Left: About Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Code2 size={20} className="text-accent-cyan" />
              <span className="text-xs font-mono uppercase tracking-widest text-fg-dim">
                Who I Am
              </span>
            </div>

            <p className="text-fg-muted text-base leading-relaxed mb-4">
              I am a Full Stack Developer and systems-aware builder with 4 years of experience scaling production web applications on the MERN stack with TypeScript. I specialize in end-to-end backend architecture including REST/GraphQL APIs, microservices, Redis caching, and Amazon SQS message queuing.
            </p>

            <p className="text-fg-muted text-base leading-relaxed mb-6">
              Currently architecting summit-scale event portals (BRICS & IAFS 2026) for the National e-Governance Division (NEGD, MeitY). Proven expertise in designing audit-ready authorization models (RBAC/UBAC), managing monorepos, and leveraging Agentic AI workflows & LLMs (Claude, ChatGPT).
            </p>

            {/* Certification Badge */}
            <div className="flex items-center gap-3 p-3.5 rounded-xl border border-amber-500/30 bg-amber-500/5 mb-6 text-sm">
              <Award size={22} className="text-amber-400 shrink-0" />
              <div>
                <span className="font-semibold text-fg block text-xs sm:text-sm">AWS Certified Solutions Architect – Associate</span>
                <span className="text-xs text-fg-muted">Validated expertise in designing resilient, high-performance cloud architectures.</span>
              </div>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {highlights.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                  className="flex items-center gap-2 text-xs sm:text-sm text-fg-muted"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan shrink-0" />
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="glass-card glass-card-hover p-6 text-center"
                  >
                    <Icon size={24} className="text-accent-cyan mx-auto mb-3" />
                    <div className="text-2xl sm:text-3xl font-bold text-fg mb-1">
                      {inView && typeof stat.value === 'number' ? (
                        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                      ) : (
                        `${stat.value}${stat.suffix}`
                      )}
                    </div>
                    <div className="text-xs text-fg-muted font-mono uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Engineering Philosophy */}
            <div className="glass-card p-6 mt-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={16} className="text-accent-cyan" />
                <h3 className="font-semibold text-fg text-sm">Engineering Philosophy</h3>
              </div>
              <p className="text-sm text-fg-muted leading-relaxed">
                Write clean, type-safe code. Architect resilient, audit-ready systems. Utilize modern Agentic AI workflows to accelerate development. Every architectural decision should deliver high performance, zero downtime, and long-term maintainability.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
