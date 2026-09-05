import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Languages, Check, ChevronDown, RotateCcw, Search } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export interface Language {
  code: string;
  name: string;
  native: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'en', name: 'English', native: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা', flag: '🇮🇳' },
  { code: 'es', name: 'Spanish', native: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', native: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', native: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', name: 'Japanese', native: '日本語', flag: '🇯🇵' },
  { code: 'ar', name: 'Arabic', native: 'العربية', flag: '🇸🇦' },
  { code: 'ru', name: 'Russian', native: 'Русский', flag: '🇷🇺' },
  { code: 'zh-CN', name: 'Chinese', native: '中文', flag: '🇨🇳' },
  { code: 'pt', name: 'Portuguese', native: 'Português', flag: '🇵🇹' },
];

function getInitialLanguage(): string {
  if (typeof window === 'undefined') return 'en';
  try {
    const cookieMatch = document.cookie.match(/googtrans=\/en\/([a-zA-Z-]+)/);
    if (cookieMatch && cookieMatch[1]) {
      return cookieMatch[1];
    }
    return localStorage.getItem('portfolio-language') || 'en';
  } catch {
    return 'en';
  }
}

export default function LanguageTranslator({ isMobile = false }: { isMobile?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<string>('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const saved = getInitialLanguage();
    setCurrentLang(saved);
  }, []);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const activeLangObj =
    SUPPORTED_LANGUAGES.find((l) => l.code.toLowerCase() === currentLang.toLowerCase()) ||
    SUPPORTED_LANGUAGES[0];

  const handleLanguageChange = (langCode: string) => {
    if (langCode === currentLang) {
      setIsOpen(false);
      return;
    }

    setIsTranslating(true);
    setCurrentLang(langCode);
    localStorage.setItem('portfolio-language', langCode);

    const hostname = window.location.hostname;

    if (langCode === 'en') {
      // Clear cookie to revert to original English cleanly
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${hostname};`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${hostname};`;
      window.location.reload();
      return;
    }

    // Set Google Translate cookie
    document.cookie = `googtrans=/en/${langCode}; path=/;`;
    document.cookie = `googtrans=/en/${langCode}; path=/; domain=${hostname};`;
    document.cookie = `googtrans=/en/${langCode}; path=/; domain=.${hostname};`;

    // Attempt to trigger select element in DOM
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      const select = document.querySelector<HTMLSelectElement>('.goog-te-combo');
      if (select) {
        select.value = langCode;
        select.dispatchEvent(new Event('change'));
        clearInterval(interval);
        setIsTranslating(false);
        setIsOpen(false);
      } else if (attempts > 6) {
        clearInterval(interval);
        setIsTranslating(false);
        setIsOpen(false);
        // Reload page to apply google translate cookie
        window.location.reload();
      }
    }, 150);
  };

  const filteredLanguages = SUPPORTED_LANGUAGES.filter(
    (lang) =>
      lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.native.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      {/* Trigger Button */}
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.92 }}
        className={`flex items-center gap-1.5 rounded-xl border border-border-subtle bg-surface-glass backdrop-blur text-fg-muted hover:text-accent-cyan hover:border-accent-cyan transition-all duration-200 focus-ring ${
          isMobile ? 'px-3 py-2 text-sm w-full justify-between' : 'px-2.5 py-1.5 text-xs'
        }`}
        style={{
          boxShadow:
            theme === 'light'
              ? '0 1px 6px rgba(0,0,0,0.06)'
              : '0 0 12px rgba(0,212,255,0.10)',
        }}
        aria-label="Translate website language"
        title="Translate Website"
      >
        <span className="flex items-center gap-1.5">
          <Languages size={isMobile ? 18 : 15} className="text-accent-cyan shrink-0" />
          <span className="font-semibold text-fg tracking-wide uppercase">
            {activeLangObj.flag} {activeLangObj.code}
          </span>
        </span>
        <ChevronDown
          size={13}
          className={`text-fg-dim transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-accent-cyan' : ''
          }`}
        />
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: isMobile ? 8 : -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: isMobile ? 8 : -8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className={`absolute z-50 rounded-2xl border border-border-subtle p-2 shadow-2xl backdrop-blur-2xl ${
              isMobile
                ? 'left-0 right-0 top-full mt-2 w-full max-w-xs mx-auto'
                : 'right-0 top-full mt-2 w-64'
            }`}
            style={{
              background:
                theme === 'light'
                  ? 'rgba(255, 255, 255, 0.98)'
                  : 'rgba(14, 14, 24, 0.96)',
              borderColor:
                theme === 'light'
                  ? 'rgba(0,0,0,0.12)'
                  : 'rgba(255,255,255,0.12)',
              boxShadow:
                theme === 'light'
                  ? '0 12px 36px rgba(0,0,0,0.15)'
                  : '0 12px 36px rgba(0,0,0,0.6), 0 0 20px rgba(0,212,255,0.12)',
            }}
          >
            {/* Header & Search */}
            <div className="px-2 pt-1 pb-2 border-b border-border-subtle mb-1.5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-fg-dim">
                  🌐 Translate / भाषा
                </span>
                {currentLang !== 'en' && (
                  <button
                    onClick={() => handleLanguageChange('en')}
                    className="flex items-center gap-1 text-[10px] text-accent-cyan hover:underline font-medium"
                    title="Reset to English"
                  >
                    <RotateCcw size={10} />
                    Reset
                  </button>
                )}
              </div>

              {/* Search Bar */}
              <div className="relative flex items-center">
                <Search size={12} className="absolute left-2.5 text-fg-dim pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search language..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-7 pr-2 py-1 text-xs rounded-lg border border-border-subtle bg-surface-1 text-fg placeholder:text-fg-dim focus:outline-none focus:border-accent-cyan transition-colors"
                />
              </div>
            </div>

            {/* Language list */}
            <div className="max-h-56 overflow-y-auto space-y-0.5 pr-0.5 custom-scrollbar">
              {filteredLanguages.length > 0 ? (
                filteredLanguages.map((lang) => {
                  const isActive =
                    lang.code.toLowerCase() === currentLang.toLowerCase();

                  return (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      disabled={isTranslating}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs transition-all duration-150 ${
                        isActive
                          ? 'bg-accent-cyan/15 text-accent-cyan font-semibold'
                          : 'text-fg-muted hover:text-fg hover:bg-surface-2'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm select-none">{lang.flag}</span>
                        <div className="flex flex-col items-start leading-tight">
                          <span className="font-medium text-fg">{lang.native}</span>
                          <span className="text-[10px] text-fg-dim">{lang.name}</span>
                        </div>
                      </div>

                      {isActive && (
                        <Check size={14} className="text-accent-cyan shrink-0" />
                      )}
                    </button>
                  );
                })
              ) : (
                <div className="py-4 text-center text-xs text-fg-dim">
                  No language found
                </div>
              )}
            </div>

            {/* Subtle Footer Note */}
            <div className="pt-2 mt-1.5 border-t border-border-subtle px-2 text-center">
              <p className="text-[10px] text-fg-dim font-mono">
                Instant full-page translation
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
