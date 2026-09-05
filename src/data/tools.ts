import type { ToolInfo } from '../types';

export const tools: ToolInfo[] = [
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Format, minify and validate JSON data',
    icon: 'Braces',
    category: 'Data',
  },
  {
    id: 'jwt-decoder',
    name: 'JWT Decoder',
    description: 'Decode JWT tokens locally in your browser',
    icon: 'KeyRound',
    category: 'Security',
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    description: 'Generate UUID v4 identifiers',
    icon: 'Fingerprint',
    category: 'Generator',
  },
  {
    id: 'regex-tester',
    name: 'Regex Tester',
    description: 'Test regular expressions with match highlighting',
    icon: 'Search',
    category: 'Text',
  },
  {
    id: 'base64',
    name: 'Base64 Encoder/Decoder',
    description: 'Encode and decode Base64 strings',
    icon: 'Binary',
    category: 'Encoding',
  },
  {
    id: 'url-encoder',
    name: 'URL Encoder/Decoder',
    description: 'Encode and decode URL components',
    icon: 'Link',
    category: 'Encoding',
  },
  {
    id: 'timestamp',
    name: 'Timestamp Converter',
    description: 'Convert between Unix timestamps and dates',
    icon: 'Clock',
    category: 'Time',
  },
  {
    id: 'cron-helper',
    name: 'Cron Expression Helper',
    description: 'Build and understand cron expressions',
    icon: 'Timer',
    category: 'Time',
  },
  {
    id: 'api-builder',
    name: 'API Request Builder',
    description: 'Lightweight Postman-style API client',
    icon: 'Send',
    category: 'API',
  },
  {
    id: 'hash-generator',
    name: 'Hash Generator',
    description: 'Generate SHA-256/384/512 hashes',
    icon: 'ShieldCheck',
    category: 'Security',
  },
];
