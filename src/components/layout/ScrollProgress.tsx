import { motion } from 'framer-motion';
import { useScrollDirection } from '../../hooks/useScrollDirection';

export default function ScrollProgress() {
  const { scrollY } = useScrollDirection();

  const progress =
    typeof window !== 'undefined'
      ? scrollY / (document.documentElement.scrollHeight - window.innerHeight)
      : 0;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left bg-gradient-to-r from-accent-cyan via-accent-emerald to-accent-violet"
      style={{ scaleX: Math.min(progress, 1) }}
    />
  );
}
