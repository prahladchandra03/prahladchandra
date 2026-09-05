import { motion } from 'framer-motion';

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
}

export default function SectionHeader({ label, title, description }: SectionHeaderProps) {
  return (
    <div className="text-center mb-16">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        className="text-xs font-mono uppercase tracking-[0.2em] text-accent-cyan mb-4"
      >
        {label}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-fg tracking-tight"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-fg-muted text-base md:text-lg max-w-2xl mx-auto"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
