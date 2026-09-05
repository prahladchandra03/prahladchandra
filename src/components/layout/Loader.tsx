import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  { label: 'React', delay: 400 },
  { label: 'Three.js', delay: 700 },
  { label: 'Systems', delay: 1000 },
];

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(-1);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    steps.forEach((step, i) => {
      setTimeout(() => setCurrentStep(i), step.delay);
    });

    setTimeout(() => setReady(true), 1400);
    setTimeout(() => onComplete(), 2200);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!ready ? (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-surface-0"
        >
          <div className="text-center">
            <div className="font-mono text-xs tracking-[0.2em] text-fg-dim mb-8 uppercase">
              Initializing Engineering Environment...
            </div>
            <div className="space-y-2 font-mono text-sm">
              {steps.map((step, i) => (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={
                    currentStep >= i
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0.2, x: -10 }
                  }
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-center gap-3"
                >
                  <span className="text-fg-muted w-20 text-right">{step.label}</span>
                  <span
                    className={`transition-colors duration-300 ${
                      currentStep >= i ? 'text-accent-emerald' : 'text-fg-dim'
                    }`}
                  >
                    {currentStep >= i ? '✓' : '○'}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Loading bar */}
            <div className="mt-8 w-48 h-0.5 bg-surface-2 rounded-full mx-auto overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-accent-cyan to-accent-emerald rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
