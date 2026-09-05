import type { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
}

export default function GlassCard({
  children,
  className = '',
  hover = false,
  gradient = false,
}: GlassCardProps) {
  return (
    <div
      className={`glass-card ${hover ? 'glass-card-hover' : ''} ${
        gradient ? 'gradient-border' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
