import { useState } from 'react';
import { toast } from 'sonner';
import CopyButton from '../common/CopyButton';

function generateUUID(): string {
  return crypto.randomUUID();
}

export default function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([generateUUID()]);
  const [count, setCount] = useState(1);

  const generate = () => {
    const newUuids = Array.from({ length: count }, () => generateUUID());
    setUuids(newUuids);
    toast.success(`Generated ${count} UUID(s)`);
  };

  const copyAll = async () => {
    await navigator.clipboard.writeText(uuids.join('\n'));
    toast.success('All UUIDs copied');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-fg">UUID Generator</h3>
        <div className="flex items-center gap-2">
          <label className="text-xs text-fg-dim">Count:</label>
          <input
            type="number"
            min={1}
            max={50}
            value={count}
            onChange={(e) => setCount(Math.min(50, Math.max(1, parseInt(e.target.value) || 1)))}
            className="w-16 px-2 py-1 rounded-lg bg-surface-0 border border-border-subtle text-fg text-sm text-center focus:outline-none focus:border-accent-cyan"
          />
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <button onClick={generate} className="btn-primary text-xs">Generate UUID v4</button>
        {uuids.length > 1 && (
          <button onClick={copyAll} className="btn-secondary text-xs">Copy All</button>
        )}
      </div>

      <div className="space-y-2">
        {uuids.map((uuid, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-3 rounded-xl bg-surface-0 border border-border-subtle"
          >
            <code className="text-sm font-mono text-accent-cyan break-all">{uuid}</code>
            <CopyButton text={uuid} className="shrink-0 ml-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
