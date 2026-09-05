import { useState, useMemo } from 'react';

export default function RegexTester() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState('');
  const [error, setError] = useState('');

  const matches = useMemo(() => {
    if (!pattern || !testString) return [];
    try {
      const regex = new RegExp(pattern, flags);
      setError('');
      const results: { index: number; match: string; groups?: Record<string, string> }[] = [];
      let m;
      if (flags.includes('g')) {
        while ((m = regex.exec(testString)) !== null) {
          results.push({ index: m.index, match: m[0], groups: m.groups });
          if (!m[0]) break; // prevent infinite loop on zero-length match
        }
      } else {
        m = regex.exec(testString);
        if (m) results.push({ index: m.index, match: m[0], groups: m.groups });
      }
      return results;
    } catch (e) {
      setError((e as Error).message);
      return [];
    }
  }, [pattern, flags, testString]);

  const highlightedText = useMemo(() => {
    if (!pattern || !testString || matches.length === 0) return testString;
    try {
      const regex = new RegExp(pattern, flags);
      return testString.replace(regex, (match) => `███${match}███`);
    } catch {
      return testString;
    }
  }, [pattern, flags, testString, matches]);

  const toggleFlag = (flag: string) => {
    setFlags((prev) => (prev.includes(flag) ? prev.replace(flag, '') : prev + flag));
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-fg mb-4">Regex Tester</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div>
            <label className="text-xs font-mono text-fg-dim mb-1 block">Pattern</label>
            <div className="flex gap-2">
              <input
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                placeholder="[a-z]+"
                className="flex-1 px-4 py-2.5 rounded-xl bg-surface-0 border border-border-subtle text-fg font-mono text-sm focus:outline-none focus:border-accent-cyan"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-fg-dim mb-1 block">Flags</label>
            <div className="flex gap-2">
              {['g', 'i', 'm', 's'].map((f) => (
                <button
                  key={f}
                  onClick={() => toggleFlag(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                    flags.includes(f)
                      ? 'bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/30'
                      : 'bg-surface-0 text-fg-dim border border-border-subtle hover:border-border-medium'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-fg-dim mb-1 block">Test String</label>
            <textarea
              value={testString}
              onChange={(e) => setTestString(e.target.value)}
              placeholder="Enter text to test..."
              className="w-full h-40 px-4 py-3 rounded-xl bg-surface-0 border border-border-subtle text-fg font-mono text-sm focus:outline-none focus:border-accent-cyan resize-none"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-mono text-fg-dim mb-1 block">
            Matches ({matches.length})
          </label>

          {/* Highlighted output */}
          <div className="p-4 rounded-xl bg-surface-0 border border-border-subtle min-h-[100px] mb-3">
            {highlightedText.split('███').map((part, i) =>
              i % 2 === 1 ? (
                <mark key={i} className="bg-accent-cyan/20 text-accent-cyan px-0.5 rounded">
                  {part}
                </mark>
              ) : (
                <span key={i} className="text-fg-muted font-mono text-sm">{part}</span>
              )
            )}
          </div>

          {/* Match list */}
          {matches.length > 0 && (
            <div className="space-y-1 max-h-40 overflow-y-auto">
              {matches.map((m, i) => (
                <div key={i} className="flex items-center gap-3 text-xs p-2 rounded-lg bg-surface-2">
                  <span className="text-fg-dim font-mono">#{i + 1}</span>
                  <span className="text-accent-cyan font-mono">"{m.match}"</span>
                  <span className="text-fg-dim">index: {m.index}</span>
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="mt-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400 font-mono">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
