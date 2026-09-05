import { useState } from 'react';
import { toast } from 'sonner';
import CopyButton from '../common/CopyButton';

export default function UrlEncoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const process = () => {
    try {
      if (mode === 'encode') {
        setOutput(encodeURIComponent(input));
        toast.success('URL encoded');
      } else {
        setOutput(decodeURIComponent(input));
        toast.success('URL decoded');
      }
    } catch (e) {
      toast.error((e as Error).message);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-fg">URL Encoder/Decoder</h3>
        <div className="flex rounded-xl overflow-hidden border border-border-subtle">
          <button onClick={() => setMode('encode')} className={`px-3 py-1.5 text-xs font-medium transition-colors ${mode === 'encode' ? 'bg-accent-cyan/10 text-accent-cyan' : 'text-fg-muted hover:text-fg'}`}>Encode</button>
          <button onClick={() => setMode('decode')} className={`px-3 py-1.5 text-xs font-medium transition-colors ${mode === 'decode' ? 'bg-accent-cyan/10 text-accent-cyan' : 'text-fg-muted hover:text-fg'}`}>Decode</button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-mono text-fg-dim mb-1 block">Input</label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={mode === 'encode' ? 'https://example.com/path?q=hello world' : 'https%3A%2F%2Fexample.com'} className="w-full h-40 px-4 py-3 rounded-xl bg-surface-0 border border-border-subtle text-fg font-mono text-sm focus:outline-none focus:border-accent-cyan resize-none" />
          <button onClick={process} className="btn-primary text-xs mt-2">{mode === 'encode' ? 'Encode' : 'Decode'}</button>
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-mono text-fg-dim">Output</label>
            {output && <CopyButton text={output} />}
          </div>
          <textarea value={output} readOnly placeholder="Result..." className="w-full h-40 px-4 py-3 rounded-xl bg-surface-0 border border-border-subtle text-fg font-mono text-sm focus:outline-none resize-none" />
        </div>
      </div>
    </div>
  );
}
