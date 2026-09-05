import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowLeft, Braces, KeyRound, Fingerprint, SearchIcon, Binary, Link, Clock, Timer, Send, ShieldCheck } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';
import { tools } from '../../data/tools';
import JsonFormatter from '../tools/JsonFormatter';
import JwtDecoder from '../tools/JwtDecoder';
import UuidGenerator from '../tools/UuidGenerator';
import RegexTester from '../tools/RegexTester';
import Base64Tool from '../tools/Base64Tool';
import UrlEncoder from '../tools/UrlEncoder';
import TimestampConverter from '../tools/TimestampConverter';
import CronHelper from '../tools/CronHelper';
import ApiRequestBuilder from '../tools/ApiRequestBuilder';
import HashGenerator from '../tools/HashGenerator';
import { useTheme } from '../../context/ThemeContext';

const iconMap: Record<string, React.ComponentType<any>> = {
  Braces, KeyRound, Fingerprint, Search: SearchIcon, Binary, Link, Clock, Timer, Send, ShieldCheck,
};

const toolComponents: Record<string, React.ComponentType<any>> = {
  'json-formatter': JsonFormatter,
  'jwt-decoder': JwtDecoder,
  'uuid-generator': UuidGenerator,
  'regex-tester': RegexTester,
  'base64': Base64Tool,
  'url-encoder': UrlEncoder,
  'timestamp': TimestampConverter,
  'cron-helper': CronHelper,
  'api-builder': ApiRequestBuilder,
  'hash-generator': HashGenerator,
};

// Dark mode colors (vibrant on dark bg)
const darkColors = [
  { bg: 'rgba(0,212,255,0.12)',   border: 'rgba(0,212,255,0.35)',   icon: '#00d4ff', glow: 'rgba(0,212,255,0.22)' },
  { bg: 'rgba(168,85,247,0.12)',  border: 'rgba(168,85,247,0.35)',  icon: '#a855f7', glow: 'rgba(168,85,247,0.22)' },
  { bg: 'rgba(0,229,160,0.12)',   border: 'rgba(0,229,160,0.35)',   icon: '#00e5a0', glow: 'rgba(0,229,160,0.22)' },
  { bg: 'rgba(244,114,182,0.12)', border: 'rgba(244,114,182,0.35)', icon: '#f472b6', glow: 'rgba(244,114,182,0.22)' },
  { bg: 'rgba(79,142,247,0.12)',  border: 'rgba(79,142,247,0.35)',  icon: '#4f8ef7', glow: 'rgba(79,142,247,0.22)' },
  { bg: 'rgba(251,191,36,0.12)',  border: 'rgba(251,191,36,0.35)',  icon: '#fbbf24', glow: 'rgba(251,191,36,0.22)' },
  { bg: 'rgba(52,211,153,0.12)',  border: 'rgba(52,211,153,0.35)',  icon: '#34d399', glow: 'rgba(52,211,153,0.22)' },
  { bg: 'rgba(251,113,133,0.12)', border: 'rgba(251,113,133,0.35)', icon: '#fb7185', glow: 'rgba(251,113,133,0.22)' },
  { bg: 'rgba(99,102,241,0.12)',  border: 'rgba(99,102,241,0.35)',  icon: '#6366f1', glow: 'rgba(99,102,241,0.22)' },
  { bg: 'rgba(234,179,8,0.12)',   border: 'rgba(234,179,8,0.35)',   icon: '#eab308', glow: 'rgba(234,179,8,0.22)' },
];

// Light mode colors (deeper, readable on off-white bg)
const lightColors = [
  { bg: 'rgba(0,150,199,0.10)',   border: 'rgba(0,150,199,0.30)',   icon: '#0096c7', glow: 'rgba(0,150,199,0.18)' },
  { bg: 'rgba(124,58,237,0.10)',  border: 'rgba(124,58,237,0.30)',  icon: '#7c3aed', glow: 'rgba(124,58,237,0.18)' },
  { bg: 'rgba(0,150,107,0.10)',   border: 'rgba(0,150,107,0.30)',   icon: '#00966b', glow: 'rgba(0,150,107,0.18)' },
  { bg: 'rgba(219,39,119,0.10)',  border: 'rgba(219,39,119,0.30)',  icon: '#db2777', glow: 'rgba(219,39,119,0.18)' },
  { bg: 'rgba(37,99,235,0.10)',   border: 'rgba(37,99,235,0.30)',   icon: '#2563eb', glow: 'rgba(37,99,235,0.18)' },
  { bg: 'rgba(180,130,0,0.10)',   border: 'rgba(180,130,0,0.30)',   icon: '#b48200', glow: 'rgba(180,130,0,0.18)' },
  { bg: 'rgba(5,150,105,0.10)',   border: 'rgba(5,150,105,0.30)',   icon: '#059669', glow: 'rgba(5,150,105,0.18)' },
  { bg: 'rgba(225,29,72,0.10)',   border: 'rgba(225,29,72,0.30)',   icon: '#e11d48', glow: 'rgba(225,29,72,0.18)' },
  { bg: 'rgba(79,70,229,0.10)',   border: 'rgba(79,70,229,0.30)',   icon: '#4f46e5', glow: 'rgba(79,70,229,0.18)' },
  { bg: 'rgba(161,98,7,0.10)',    border: 'rgba(161,98,7,0.30)',    icon: '#a16207', glow: 'rgba(161,98,7,0.18)' },
];

export default function ToolsSection() {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const toolColors = isLight ? lightColors : darkColors;

  const filteredTools = tools.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const ActiveToolComponent = activeTool ? toolComponents[activeTool] : null;

  // Theme-aware styles
  const cardBg      = isLight ? 'rgba(255,255,255,0.92)' : 'rgba(13,13,30,0.75)';
  const sectionBg1  = isLight ? 'rgba(124,58,237,0.05)'  : 'rgba(168,85,247,0.10)';
  const sectionBg2  = isLight ? 'rgba(0,150,199,0.04)'   : 'rgba(0,212,255,0.06)';
  const sectionBg3  = isLight ? 'rgba(0,150,107,0.04)'   : 'rgba(0,229,160,0.06)';
  const searchBg    = isLight ? 'rgba(255,255,255,0.95)'  : 'rgba(13,13,30,0.85)';
  const searchBorder= isLight ? 'rgba(0,150,199,0.30)'   : 'rgba(0,212,255,0.25)';
  const searchFocusShadow = isLight ? '0 0 0 3px rgba(0,150,199,0.15)' : '0 0 24px rgba(0,212,255,0.22)';
  const searchIconColor   = isLight ? '#0096c7' : '#00d4ff';
  const textColor         = isLight ? '#111128' : undefined;
  const labelColor        = isLight ? '#6060a0' : '#7878a0';
  const workspaceBorder   = isLight ? 'rgba(0,150,199,0.22)' : 'rgba(0,212,255,0.20)';
  const workspaceShadow   = isLight
    ? '0 0 24px rgba(0,150,199,0.07), 0 4px 20px rgba(0,0,0,0.07)'
    : '0 0 40px rgba(0,212,255,0.06), 0 4px 24px rgba(0,0,0,0.5)';

  return (
    <section id="tools" className="py-20 lg:py-28 relative">
      {/* Premium section glow background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{ background: `radial-gradient(ellipse 80% 50% at 50% 100%, ${sectionBg1} 0%, transparent 70%)` }} className="absolute inset-0" />
        <div style={{ background: `radial-gradient(ellipse 60% 40% at 10% 50%, ${sectionBg2} 0%, transparent 60%)` }} className="absolute inset-0" />
        <div style={{ background: `radial-gradient(ellipse 50% 40% at 90% 20%, ${sectionBg3} 0%, transparent 60%)` }} className="absolute inset-0" />
      </div>

      <div className="section-container relative">
        <SectionHeader
          label="Developer Playground"
          title="Engineering Tools"
          description="Useful browser-based developer tools. All processing happens locally in your browser."
        />

        <AnimatePresence mode="wait">
          {activeTool ? (
            <motion.div
              key="workspace"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <button
                onClick={() => setActiveTool(null)}
                className="flex items-center gap-2 text-sm text-fg-muted hover:text-accent-cyan transition-colors mb-6 focus-ring rounded-lg px-2 py-1"
              >
                <ArrowLeft size={16} />
                Back to Tools
              </button>

              <div
                className="glass-card p-4 md:p-6"
                style={{ borderColor: workspaceBorder, boxShadow: workspaceShadow }}
              >
                {ActiveToolComponent && <ActiveToolComponent />}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* Search bar */}
              <div className="max-w-md mx-auto mb-10">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: searchIconColor }} />
                  <input
                    type="text"
                    placeholder="Search tools..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      background: searchBg,
                      border: `1px solid ${searchBorder}`,
                      color: textColor,
                    }}
                    className="w-full pl-10 pr-4 py-3 rounded-xl placeholder-fg-dim text-sm focus:outline-none transition-all duration-300"
                    onFocus={e => { e.currentTarget.style.boxShadow = searchFocusShadow; e.currentTarget.style.borderColor = isLight ? 'rgba(0,150,199,0.55)' : 'rgba(0,212,255,0.55)'; }}
                    onBlur={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = searchBorder; }}
                  />
                </div>
              </div>

              {/* Tools grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {filteredTools.map((tool, i) => {
                  const Icon = iconMap[tool.icon] || Braces;
                  const color = toolColors[i % toolColors.length];
                  return (
                    <motion.button
                      key={tool.id}
                      initial={{ opacity: 0, scale: 0.88, y: 12 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05, type: 'spring', stiffness: 180, damping: 16 }}
                      whileHover={{ y: -5, scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setActiveTool(tool.id)}
                      style={{
                        background: cardBg,
                        border: `1px solid ${color.border}`,
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        borderRadius: '18px',
                        boxShadow: isLight
                          ? `0 2px 12px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.05)`
                          : `0 4px 20px rgba(0,0,0,0.40)`,
                      }}
                      onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 28px ${color.glow}, 0 8px 24px rgba(0,0,0,${isLight ? '0.10' : '0.50'})`; }}
                      onMouseLeave={e => { e.currentTarget.style.boxShadow = isLight ? '0 2px 12px rgba(0,0,0,0.07)' : '0 4px 20px rgba(0,0,0,0.40)'; }}
                      className="p-4 text-center group cursor-pointer focus-ring"
                    >
                      <div
                        style={{
                          background: color.bg,
                          border: `1px solid ${color.border}`,
                          boxShadow: `0 0 10px ${color.glow}`,
                        }}
                        className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 transition-all duration-200 group-hover:scale-110"
                      >
                        <Icon size={22} style={{ color: color.icon }} />
                      </div>
                      <div
                        className="font-semibold text-sm mb-1 text-center"
                        style={{ color: isLight ? '#111128' : undefined }}
                      >
                        {tool.name}
                      </div>
                      <div
                        className="text-xs text-center line-clamp-2 leading-relaxed"
                        style={{ color: labelColor }}
                      >
                        {tool.description}
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {filteredTools.length === 0 && (
                <div className="text-center py-12 text-fg-muted">
                  No tools found matching "{searchQuery}"
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
