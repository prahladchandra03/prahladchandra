import { useState } from 'react';
import { toast } from 'sonner';
import CopyButton from '../common/CopyButton';

type Algorithm = 'SHA-256' | 'SHA-384' | 'SHA-512';

export default function HashGenerator() {
  const [input, setInput] = useState('');
  const [algorithm, setAlgorithm] = useState<Algorithm>('SHA-256');
  const [hash, setHash] = useState('');

  const generate = async () => {
    if (!input) {
      toast.error('Input is required');
      return;
    }
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(input);
      const hashBuffer = await crypto.subtle.digest(algorithm, data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
      setHash(hashHex);
      toast.success(`${algorithm} hash generated`);
    } catch (e) {
      toast.error((e as Error).message);
    }
  };

  const clear = () => {
    setInput('');
    setHash('');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-fg">Hash Generator</h3>
        <button onClick={clear} className="btn-ghost text-xs text-red-400 hover:text-red-300">Clear</button>
      </div>

      <div className="mb-4 p-3 rounded-xl bg-accent-cyan/5 border border-accent-cyan/10 text-xs text-fg-muted">
        🔒 Hashing is performed locally using the Web Crypto API. No data is sent to any server.
      </div>

      <div>
        <label className="text-xs font-mono text-fg-dim mb-1 block">Algorithm</label>
        <div className="flex gap-2 mb-4">
          {(['SHA-256', 'SHA-384', 'SHA-512'] as Algorithm[]).map((alg) => (
            <button
              key={alg}
              onClick={() => setAlgorithm(alg)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors border ${
                algorithm === alg
                  ? 'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/30'
                  : 'text-fg-muted border-border-subtle hover:border-border-medium'
              }`}
            >
              {alg}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-xs font-mono text-fg-dim mb-1 block">Input</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to hash..."
          className="w-full h-32 px-4 py-3 rounded-xl bg-surface-0 border border-border-subtle text-fg font-mono text-sm focus:outline-none focus:border-accent-cyan resize-none"
        />
        <button onClick={generate} className="btn-primary text-xs mt-2">Generate Hash</button>
      </div>

      {hash && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-mono text-fg-dim">{algorithm} Hash</label>
            <CopyButton text={hash} />
          </div>
          <div className="p-4 rounded-xl bg-surface-0 border border-border-subtle">
            <code className="text-sm text-accent-cyan font-mono break-all">{hash}</code>
          </div>
        </div>
      )}
    </div>
  );
}
