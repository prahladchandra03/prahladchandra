import { useState, useMemo } from 'react';
import CopyButton from '../common/CopyButton';

const PRESETS = [
  { label: 'Every minute', value: '* * * * *' },
  { label: 'Every 5 min', value: '*/5 * * * *' },
  { label: 'Every hour', value: '0 * * * *' },
  { label: 'Daily midnight', value: '0 0 * * *' },
  { label: 'Weekly Monday', value: '0 0 * * 1' },
  { label: 'Monthly 1st', value: '0 0 1 * *' },
];

const FIELD_LABELS = ['Minute', 'Hour', 'Day of Month', 'Month', 'Day of Week'];
const FIELD_RANGES = ['0-59', '0-23', '1-31', '1-12', '0-7 (0,7=Sun)'];

function describeCron(expression: string): string {
  const parts = expression.trim().split(/\s+/);
  if (parts.length !== 5) return 'Invalid: must have 5 fields';

  const [min, hour, dom, month, dow] = parts;
  const segments: string[] = [];

  if (min === '*' && hour === '*') segments.push('Every minute');
  else if (min.startsWith('*/')) segments.push(`Every ${min.slice(2)} minutes`);
  else if (hour === '*') segments.push(`At minute ${min} of every hour`);
  else segments.push(`At ${hour.padStart(2, '0')}:${min.padStart(2, '0')}`);

  if (dom !== '*') segments.push(`on day ${dom}`);
  if (month !== '*') segments.push(`of month ${month}`);
  if (dow !== '*') {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const d = parseInt(dow);
    segments.push(`on ${isNaN(d) ? dow : days[d % 7] || dow}`);
  }

  return segments.join(' ');
}

export default function CronHelper() {
  const [fields, setFields] = useState(['*', '*', '*', '*', '*']);

  const expression = fields.join(' ');
  const description = useMemo(() => describeCron(expression), [expression]);

  const setField = (index: number, value: string) => {
    const newFields = [...fields];
    newFields[index] = value;
    setFields(newFields);
  };

  const applyPreset = (value: string) => {
    setFields(value.split(' '));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-fg">Cron Expression Helper</h3>
        <CopyButton text={expression} />
      </div>

      {/* Current expression */}
      <div className="p-4 rounded-xl bg-surface-0 border border-border-subtle mb-4 text-center">
        <code className="text-2xl font-mono text-accent-cyan tracking-wider">{expression}</code>
        <p className="text-sm text-fg-muted mt-2">{description}</p>
      </div>

      {/* Fields */}
      <div className="grid grid-cols-5 gap-2 mb-6">
        {FIELD_LABELS.map((label, i) => (
          <div key={label}>
            <label className="text-xs font-mono text-fg-dim mb-1 block text-center">{label}</label>
            <input
              value={fields[i]}
              onChange={(e) => setField(i, e.target.value)}
              className="w-full px-2 py-2 rounded-xl bg-surface-0 border border-border-subtle text-fg font-mono text-sm text-center focus:outline-none focus:border-accent-cyan"
            />
            <p className="text-2xs text-fg-dim text-center mt-1">{FIELD_RANGES[i]}</p>
          </div>
        ))}
      </div>

      {/* Presets */}
      <div>
        <label className="text-xs font-mono text-fg-dim mb-2 block">Presets</label>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.value}
              onClick={() => applyPreset(preset.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                expression === preset.value
                  ? 'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/30'
                  : 'text-fg-muted border-border-subtle hover:border-border-medium'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
