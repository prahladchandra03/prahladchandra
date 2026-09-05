import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../common/SectionHeader';
import { useTheme } from '../../context/ThemeContext';

interface ArchNode {
  id: string;
  label: string;
  description: string;
  technology: string;
  scalability: string;
  col: number;
  row: number;
  color: string;
}

const nodes: ArchNode[] = [
  { id: 'client',   label: 'Client',        description: 'Web & mobile clients',               technology: 'React / Mobile',         scalability: 'CDN-cached static assets',                      col: 2,   row: 0, color: '#3b82f6' },
  { id: 'cdn',      label: 'CloudFront',    description: 'CDN for global content delivery',    technology: 'AWS CloudFront',         scalability: 'Edge locations worldwide',                      col: 2,   row: 1, color: '#ff9900' },
  { id: 'gateway',  label: 'API Gateway',   description: 'Request routing and load balancing', technology: 'Nginx / ALB',            scalability: 'Horizontal scaling with auto-scaling groups',   col: 2,   row: 2, color: '#06b6d4' },
  { id: 'auth',     label: 'Auth Service',  description: 'Authentication and authorization',   technology: 'Node.js + JWT',          scalability: 'Stateless JWT for horizontal scaling',          col: 0,   row: 3, color: '#8b5cf6' },
  { id: 'user',     label: 'User Service',  description: 'User management and profiles',       technology: 'Node.js + Express',      scalability: 'Read replicas for user queries',                col: 1,   row: 3, color: '#10b981' },
  { id: 'event',    label: 'Event Service', description: 'Event management and scheduling',    technology: 'Node.js + Express',      scalability: 'Queue-based processing for heavy loads',        col: 3,   row: 3, color: '#f59e0b' },
  { id: 'notify',   label: 'Notification',  description: 'Push notifications and emails',      technology: 'Node.js + Redis Pub/Sub',scalability: 'Async processing via message queues',           col: 4,   row: 3, color: '#ef4444' },
  { id: 'redis',    label: 'Redis',         description: 'Caching and session management',     technology: 'Redis Cluster',          scalability: 'In-memory caching reduces DB load by 60%',     col: 0,   row: 4, color: '#dc382d' },
  { id: 'postgres', label: 'PostgreSQL',    description: 'Primary relational database',        technology: 'PostgreSQL',             scalability: 'Read replicas and connection pooling',          col: 1.5, row: 4, color: '#336791' },
  { id: 'mongo',    label: 'MongoDB',       description: 'Document storage for flexible data', technology: 'MongoDB / DocumentDB',   scalability: 'Sharding for horizontal scaling',               col: 3,   row: 4, color: '#47a248' },
  { id: 'aws',      label: 'AWS Cloud',     description: 'Cloud infrastructure',               technology: 'EC2, S3, CloudFront',    scalability: 'Auto-scaling, multi-AZ deployment',             col: 2,   row: 5, color: '#ff9900' },
];

const connections = [
  { from: 'client', to: 'cdn' },
  { from: 'cdn', to: 'gateway' },
  { from: 'gateway', to: 'auth' },
  { from: 'gateway', to: 'user' },
  { from: 'gateway', to: 'event' },
  { from: 'gateway', to: 'notify' },
  { from: 'auth', to: 'redis' },
  { from: 'auth', to: 'postgres' },
  { from: 'user', to: 'postgres' },
  { from: 'event', to: 'postgres' },
  { from: 'event', to: 'mongo' },
  { from: 'notify', to: 'redis' },
  { from: 'redis', to: 'aws' },
  { from: 'postgres', to: 'aws' },
  { from: 'mongo', to: 'aws' },
];

function getNodePosition(node: ArchNode, width: number) {
  const colWidth = width / 5;
  const rowHeight = 90;
  const x = colWidth * node.col + colWidth / 2;
  const y = node.row * rowHeight + 50;
  return { x, y };
}

export default function Architecture() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const svgWidth  = 800;
  const svgHeight = 580;

  // Theme-aware SVG colors
  const gridStroke        = isLight ? 'rgba(0,0,0,0.06)'   : 'rgba(255,255,255,0.04)';
  const svgBg             = isLight ? 'rgba(245,245,240,1)' : 'rgba(10,10,20,0)';
  const lineDefault       = isLight ? 'rgba(0,0,0,0.18)'   : 'rgba(255,255,255,0.12)';
  const lineHighlight     = isLight ? '#0096c7'             : '#00d4ff';
  const dotColor          = isLight ? '#0096c7'             : '#00d4ff';
  const nodeBgDefault     = isLight ? 'rgba(255,255,255,0.92)' : 'rgba(18,18,32,0.90)';
  const nodeBgHovered     = isLight ? 'rgba(255,255,255,1)'    : 'rgba(26,26,46,0.98)';
  const nodeBorderDefault = isLight ? 'rgba(0,0,0,0.14)'   : 'rgba(255,255,255,0.10)';
  const labelDefault      = isLight ? '#3a3a58'             : '#a0a0af';
  const labelHovered      = isLight ? '#111128'             : '#f0f0f5';
  const tooltipBg         = isLight ? 'rgba(255,255,255,0.95)' : undefined;
  const tooltipBorder     = isLight ? 'rgba(0,0,0,0.10)'   : undefined;

  return (
    <section id="architecture" className="py-20 lg:py-28 relative">
      <div className="section-container">
        <SectionHeader
          label="System Design"
          title="Microservices Architecture"
          description="Interactive visualization of a production microservices system I've designed and built."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-4 md:p-8 overflow-x-auto"
          style={isLight ? { background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(0,0,0,0.10)', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' } : {}}
        >
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full h-auto min-w-[600px]"
            role="img"
            aria-label="Microservices architecture diagram"
          >
            <defs>
              <pattern id="arch-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke={gridStroke} strokeWidth="0.8" />
              </pattern>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* Node shadow filter for light mode */}
              <filter id="node-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="rgba(0,0,0,0.12)" />
              </filter>
            </defs>

            {/* Background */}
            <rect width={svgWidth} height={svgHeight} fill={svgBg} />
            <rect width={svgWidth} height={svgHeight} fill="url(#arch-grid)" />

            {/* Connections */}
            {connections.map((conn) => {
              const fromNode = nodes.find((n) => n.id === conn.from)!;
              const toNode   = nodes.find((n) => n.id === conn.to)!;
              const from     = getNodePosition(fromNode, svgWidth);
              const to       = getNodePosition(toNode, svgWidth);
              const isHighlighted = hoveredNode === conn.from || hoveredNode === conn.to;
              return (
                <line
                  key={`${conn.from}-${conn.to}`}
                  x1={from.x} y1={from.y}
                  x2={to.x}   y2={to.y}
                  stroke={isHighlighted ? lineHighlight : lineDefault}
                  strokeWidth={isHighlighted ? 2.5 : 1.5}
                  strokeDasharray={isHighlighted ? '0' : '5 4'}
                  strokeOpacity={isHighlighted ? 1 : (isLight ? 0.8 : 0.6)}
                  style={{ transition: 'all 0.3s ease' }}
                />
              );
            })}

            {/* Animated data-flow dots */}
            {connections.slice(0, 8).map((conn, i) => {
              const fromNode = nodes.find((n) => n.id === conn.from)!;
              const toNode   = nodes.find((n) => n.id === conn.to)!;
              const from     = getNodePosition(fromNode, svgWidth);
              const to       = getNodePosition(toNode, svgWidth);
              return (
                <circle key={`dot-${i}`} r="3" fill={dotColor} opacity="0.75">
                  <animateMotion
                    dur={`${2 + i * 0.4}s`}
                    repeatCount="indefinite"
                    path={`M${from.x},${from.y} L${to.x},${to.y}`}
                  />
                </circle>
              );
            })}

            {/* Nodes */}
            {nodes.map((node) => {
              const pos       = getNodePosition(node, svgWidth);
              const isHovered = hoveredNode === node.id;
              return (
                <g
                  key={node.id}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Glow ring on hover */}
                  {isHovered && (
                    <circle
                      cx={pos.x} cy={pos.y} r="42"
                      fill={node.color} opacity="0.12"
                      filter="url(#glow)"
                    />
                  )}

                  {/* Node background pill */}
                  <rect
                    x={pos.x - 55} y={pos.y - 19}
                    width="110" height="38" rx="10"
                    fill={isHovered ? nodeBgHovered : nodeBgDefault}
                    stroke={isHovered ? node.color : nodeBorderDefault}
                    strokeWidth={isHovered ? 1.8 : 1}
                    filter={isLight ? 'url(#node-shadow)' : undefined}
                    style={{ transition: 'all 0.3s ease' }}
                  />

                  {/* Color dot */}
                  <circle cx={pos.x - 38} cy={pos.y} r="5" fill={node.color}
                    style={{ filter: `drop-shadow(0 0 4px ${node.color})` }}
                  />

                  {/* Label */}
                  <text
                    x={pos.x + 6} y={pos.y + 4}
                    textAnchor="middle"
                    fill={isHovered ? labelHovered : labelDefault}
                    fontSize="11.5"
                    fontFamily="Inter, sans-serif"
                    fontWeight={isHovered ? '700' : '500'}
                    style={{ transition: 'all 0.3s ease' }}
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Tooltip on hover */}
          <AnimatePresence>
            {hoveredNode && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="mt-4 p-4 rounded-xl border"
                style={{
                  background: tooltipBg || 'var(--surface-2)',
                  borderColor: tooltipBorder || 'var(--border-subtle)',
                  boxShadow: isLight ? '0 4px 20px rgba(0,0,0,0.08)' : undefined,
                }}
              >
                {(() => {
                  const node = nodes.find((n) => n.id === hoveredNode);
                  if (!node) return null;
                  return (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <div className="text-xs font-mono uppercase mb-1" style={{ color: node.color }}>Service</div>
                        <div className="text-sm font-semibold text-fg">{node.label}</div>
                        <div className="text-xs text-fg-muted mt-1">{node.description}</div>
                      </div>
                      <div>
                        <div className="text-xs font-mono uppercase mb-1" style={{ color: node.color }}>Technology</div>
                        <div className="text-sm text-fg">{node.technology}</div>
                      </div>
                      <div>
                        <div className="text-xs font-mono uppercase mb-1" style={{ color: node.color }}>Scalability</div>
                        <div className="text-sm text-fg">{node.scalability}</div>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
