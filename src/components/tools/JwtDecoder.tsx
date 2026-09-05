import { useState } from 'react';
import CopyButton from '../common/CopyButton';

export default function JwtDecoder() {
  const [token, setToken] = useState('');
  const [header, setHeader] = useState('');
  const [payload, setPayload] = useState('');
  const [error, setError] = useState('');

  const decode = () => {
    try {
      const parts = token.trim().split('.');
      if (parts.length !== 3) throw new Error('Invalid JWT: must have 3 parts separated by dots');

      const decodeBase64Url = (str: string) => {
        const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
        const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
        return JSON.parse(atob(padded));
      };

      const h = decodeBase64Url(parts[0]);
      const p = decodeBase64Url(parts[1]);

      setHeader(JSON.stringify(h, null, 2));
      setPayload(JSON.stringify(p, null, 2));
      setError('');
    } catch (e) {
      setError((e as Error).message);
      setHeader('');
      setPayload('');
    }
  };

  const getExpiration = () => {
    try {
      const p = JSON.parse(payload);
      if (p.exp) {
        const date = new Date(p.exp * 1000);
        const isExpired = date < new Date();
        return `${date.toLocaleString()} ${isExpired ? '(EXPIRED)' : '(Valid)'}`;
      }
      return 'No expiration claim';
    } catch {
      return '—';
    }
  };

  const clear = () => {
    setToken('');
    setHeader('');
    setPayload('');
    setError('');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-fg">JWT Decoder</h3>
        <button onClick={clear} className="btn-ghost text-xs text-red-400 hover:text-red-300">Clear</button>
      </div>

      {/* Security notice */}
      <div className="mb-4 p-3 rounded-xl bg-accent-cyan/5 border border-accent-cyan/10 text-xs text-fg-muted">
        🔒 Decoding happens locally in your browser. This tool only decodes the token — it does not verify the signature.
      </div>

      <div>
        <label className="text-xs font-mono text-fg-dim mb-1 block">JWT Token</label>
        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
          className="w-full h-24 px-4 py-3 rounded-xl bg-surface-0 border border-border-subtle text-fg font-mono text-sm focus:outline-none focus:border-accent-cyan resize-none"
        />
        <button onClick={decode} className="btn-primary text-xs mt-2">Decode Token</button>
      </div>

      {error && (
        <div className="mt-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400 font-mono">
          {error}
        </div>
      )}

      {header && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-mono text-fg-dim">Header</label>
              <CopyButton text={header} />
            </div>
            <pre className="p-4 rounded-xl bg-surface-0 border border-border-subtle text-sm text-accent-cyan font-mono overflow-auto max-h-48">
              {header}
            </pre>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-mono text-fg-dim">Payload</label>
              <CopyButton text={payload} />
            </div>
            <pre className="p-4 rounded-xl bg-surface-0 border border-border-subtle text-sm text-accent-emerald font-mono overflow-auto max-h-48">
              {payload}
            </pre>
          </div>
        </div>
      )}

      {payload && (
        <div className="mt-4 p-3 rounded-xl bg-surface-2 border border-border-subtle text-sm">
          <span className="text-fg-dim font-mono text-xs">Expiration: </span>
          <span className="text-fg font-mono text-xs">{getExpiration()}</span>
        </div>
      )}
    </div>
  );
}
