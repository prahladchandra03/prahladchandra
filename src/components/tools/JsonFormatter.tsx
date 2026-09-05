import { useState } from 'react';
import { toast } from 'sonner';
import CopyButton from '../common/CopyButton';

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const format = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError('');
      toast.success('JSON formatted');
    } catch (e) {
      setError((e as Error).message);
      setOutput('');
    }
  };

  const minify = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError('');
      toast.success('JSON minified');
    } catch (e) {
      setError((e as Error).message);
      setOutput('');
    }
  };

  const validate = () => {
    try {
      JSON.parse(input);
      setError('');
      toast.success('Valid JSON ✓');
    } catch (e) {
      setError((e as Error).message);
      toast.error('Invalid JSON');
    }
  };

  const clear = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-fg">JSON Formatter</h3>
        <div className="flex gap-2">
          <button onClick={format} className="btn-ghost text-xs">Format</button>
          <button onClick={minify} className="btn-ghost text-xs">Minify</button>
          <button onClick={validate} className="btn-ghost text-xs">Validate</button>
          <button onClick={clear} className="btn-ghost text-xs text-red-400 hover:text-red-300">Clear</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-mono text-fg-dim mb-1 block">Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"key": "value"}'
            className="w-full h-64 px-4 py-3 rounded-xl bg-surface-0 border border-border-subtle text-fg font-mono text-sm focus:outline-none focus:border-accent-cyan resize-none"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-mono text-fg-dim">Output</label>
            {output && <CopyButton text={output} />}
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Formatted output..."
            className="w-full h-64 px-4 py-3 rounded-xl bg-surface-0 border border-border-subtle text-fg font-mono text-sm focus:outline-none resize-none"
          />
        </div>
      </div>

      {error && (
        <div className="mt-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400 font-mono">
          {error}
        </div>
      )}
    </div>
  );
}
