import { useState } from 'react';
import { toast } from 'sonner';
import CopyButton from '../common/CopyButton';

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface Header {
  key: string;
  value: string;
}

export default function ApiRequestBuilder() {
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState<Method>('GET');
  const [headers, setHeaders] = useState<Header[]>([{ key: '', value: '' }]);
  const [body, setBody] = useState('');
  const [response, setResponse] = useState('');
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [responseTime, setResponseTime] = useState<number | null>(null);

  const addHeader = () => setHeaders([...headers, { key: '', value: '' }]);
  const removeHeader = (i: number) => setHeaders(headers.filter((_, idx) => idx !== i));
  const updateHeader = (i: number, field: 'key' | 'value', val: string) => {
    const h = [...headers];
    h[i][field] = val;
    setHeaders(h);
  };

  const sendRequest = async () => {
    if (!url) {
      toast.error('URL is required');
      return;
    }
    setLoading(true);
    const start = Date.now();
    try {
      const h: Record<string, string> = {};
      headers.forEach((header) => {
        if (header.key) h[header.key] = header.value;
      });

      const options: RequestInit = {
        method,
        headers: h,
      };

      if (['POST', 'PUT', 'PATCH'].includes(method) && body) {
        options.body = body;
        if (!h['Content-Type']) {
          h['Content-Type'] = 'application/json';
        }
      }

      const res = await fetch(url, options);
      setStatusCode(res.status);
      const text = await res.text();
      try {
        setResponse(JSON.stringify(JSON.parse(text), null, 2));
      } catch {
        setResponse(text);
      }
      setResponseTime(Date.now() - start);
    } catch (e) {
      setResponse(`Error: ${(e as Error).message}`);
      setStatusCode(null);
      setResponseTime(Date.now() - start);
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-fg">API Request Builder</h3>
      </div>

      {/* CORS warning */}
      <div className="mb-4 p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/10 text-xs text-yellow-400">
        ⚠️ Requests are sent from your browser and may be blocked by CORS. For APIs without CORS headers, use a backend proxy or Postman.
      </div>

      {/* URL + Method */}
      <div className="flex gap-2 mb-4">
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value as Method)}
          className="px-3 py-2.5 rounded-xl bg-surface-0 border border-border-subtle text-fg text-sm font-mono focus:outline-none focus:border-accent-cyan"
        >
          {(['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] as Method[]).map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://api.example.com/endpoint"
          className="flex-1 px-4 py-2.5 rounded-xl bg-surface-0 border border-border-subtle text-fg font-mono text-sm focus:outline-none focus:border-accent-cyan"
        />
        <button onClick={sendRequest} disabled={loading} className="btn-primary text-xs disabled:opacity-50">
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>

      {/* Headers */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-mono text-fg-dim">Headers</label>
          <button onClick={addHeader} className="btn-ghost text-xs">+ Add</button>
        </div>
        <div className="space-y-2">
          {headers.map((h, i) => (
            <div key={i} className="flex gap-2">
              <input value={h.key} onChange={(e) => updateHeader(i, 'key', e.target.value)} placeholder="Key" className="flex-1 px-3 py-2 rounded-xl bg-surface-0 border border-border-subtle text-fg text-sm font-mono focus:outline-none focus:border-accent-cyan" />
              <input value={h.value} onChange={(e) => updateHeader(i, 'value', e.target.value)} placeholder="Value" className="flex-1 px-3 py-2 rounded-xl bg-surface-0 border border-border-subtle text-fg text-sm font-mono focus:outline-none focus:border-accent-cyan" />
              <button onClick={() => removeHeader(i)} className="px-2 text-fg-dim hover:text-red-400 transition-colors">×</button>
            </div>
          ))}
        </div>
      </div>

      {/* Body */}
      {['POST', 'PUT', 'PATCH'].includes(method) && (
        <div className="mb-4">
          <label className="text-xs font-mono text-fg-dim mb-1 block">Body (JSON)</label>
          <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder='{"key": "value"}' className="w-full h-32 px-4 py-3 rounded-xl bg-surface-0 border border-border-subtle text-fg font-mono text-sm focus:outline-none focus:border-accent-cyan resize-none" />
        </div>
      )}

      {/* Response */}
      {response && (
        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-3">
              <label className="text-xs font-mono text-fg-dim">Response</label>
              {statusCode && (
                <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${statusCode < 300 ? 'bg-emerald-500/10 text-emerald-400' : statusCode < 500 ? 'bg-yellow-500/10 text-yellow-400' : 'bg-red-500/10 text-red-400'}`}>
                  {statusCode}
                </span>
              )}
              {responseTime !== null && (
                <span className="text-xs text-fg-dim font-mono">{responseTime}ms</span>
              )}
            </div>
            <CopyButton text={response} />
          </div>
          <pre className="p-4 rounded-xl bg-surface-0 border border-border-subtle text-sm text-fg font-mono overflow-auto max-h-64 whitespace-pre-wrap">
            {response}
          </pre>
        </div>
      )}
    </div>
  );
}
