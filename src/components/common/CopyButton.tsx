import { Check, Copy } from 'lucide-react';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
}

export default function CopyButton({ text, label = 'Copied!', className = '' }: CopyButtonProps) {
  const { copied, copy } = useCopyToClipboard();

  return (
    <button
      onClick={() => copy(text, label)}
      className={`p-2 rounded-lg border border-border-subtle hover:border-accent-cyan text-fg-muted hover:text-accent-cyan transition-all duration-200 focus-ring ${className}`}
      aria-label="Copy to clipboard"
    >
      {copied ? <Check size={14} className="text-accent-emerald" /> : <Copy size={14} />}
    </button>
  );
}
