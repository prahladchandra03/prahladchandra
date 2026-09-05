import { useState } from 'react';
import CopyButton from '../common/CopyButton';

export default function TimestampConverter() {
  const [timestamp, setTimestamp] = useState('');
  const [dateStr, setDateStr] = useState('');
  const [unit, setUnit] = useState<'s' | 'ms'>('s');
  const [result, setResult] = useState('');
  const [tsResult, setTsResult] = useState('');

  const now = () => {
    const ts = unit === 's' ? Math.floor(Date.now() / 1000) : Date.now();
    setTimestamp(ts.toString());
    convertToDate(ts.toString());
  };

  const convertToDate = (ts?: string) => {
    const val = ts || timestamp;
    if (!val) return;
    const num = parseInt(val);
    if (isNaN(num)) {
      setResult('Invalid timestamp');
      return;
    }
    const ms = unit === 's' ? num * 1000 : num;
    const date = new Date(ms);
    setResult(
      `${date.toISOString()}\n${date.toLocaleString()}\n${date.toUTCString()}`
    );
  };

  const convertToTimestamp = () => {
    if (!dateStr) return;
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      setTsResult('Invalid date');
      return;
    }
    const ts = unit === 's' ? Math.floor(date.getTime() / 1000) : date.getTime();
    setTsResult(ts.toString());
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-fg">Timestamp Converter</h3>
        <div className="flex items-center gap-2">
          <span className="text-xs text-fg-dim">Unit:</span>
          <div className="flex rounded-xl overflow-hidden border border-border-subtle">
            <button onClick={() => setUnit('s')} className={`px-3 py-1.5 text-xs font-medium transition-colors ${unit === 's' ? 'bg-accent-cyan/10 text-accent-cyan' : 'text-fg-muted'}`}>Seconds</button>
            <button onClick={() => setUnit('ms')} className={`px-3 py-1.5 text-xs font-medium transition-colors ${unit === 'ms' ? 'bg-accent-cyan/10 text-accent-cyan' : 'text-fg-muted'}`}>Milliseconds</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Timestamp → Date */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-fg">Unix Timestamp → Date</h4>
          <div className="flex gap-2">
            <input value={timestamp} onChange={(e) => setTimestamp(e.target.value)} placeholder="1693756800" className="flex-1 px-4 py-2.5 rounded-xl bg-surface-0 border border-border-subtle text-fg font-mono text-sm focus:outline-none focus:border-accent-cyan" />
            <button onClick={now} className="btn-ghost text-xs">Now</button>
          </div>
          <button onClick={() => convertToDate()} className="btn-primary text-xs">Convert</button>
          {result && (
            <div className="p-3 rounded-xl bg-surface-0 border border-border-subtle">
              <div className="flex justify-between">
                <pre className="text-sm text-accent-cyan font-mono whitespace-pre-wrap">{result}</pre>
                <CopyButton text={result} />
              </div>
            </div>
          )}
        </div>

        {/* Date → Timestamp */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-fg">Date → Unix Timestamp</h4>
          <input type="datetime-local" value={dateStr} onChange={(e) => setDateStr(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-surface-0 border border-border-subtle text-fg text-sm focus:outline-none focus:border-accent-cyan" />
          <button onClick={convertToTimestamp} className="btn-primary text-xs">Convert</button>
          {tsResult && (
            <div className="flex items-center justify-between p-3 rounded-xl bg-surface-0 border border-border-subtle">
              <code className="text-sm text-accent-cyan font-mono">{tsResult}</code>
              <CopyButton text={tsResult} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
