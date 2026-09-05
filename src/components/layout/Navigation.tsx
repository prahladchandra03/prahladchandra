import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { navItems } from '../../data/profile';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import { useTheme } from '../../context/ThemeContext';
import LanguageTranslator from '../common/LanguageTranslator';

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const sectionIds = useMemo(() => navItems.map((item) => item.href.replace('#', '')), []);
  const activeSection = useActiveSection(sectionIds);
  const { scrollY } = useScrollDirection();
  const { theme, toggleTheme } = useTheme();

  const isScrolled = scrollY > 50;

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      setMobileOpen(false);
    },
    []
  );

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-surface-0/80 backdrop-blur-xl border-b border-border-subtle'
            : 'bg-transparent'
        }`}
      >
        <nav className="section-container" aria-label="Main navigation">
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              isScrolled ? 'h-14' : 'h-16 md:h-20'
            }`}
          >
            {/* Logo / Brand — always readable pill */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="flex items-center gap-2 group focus-ring rounded-lg px-1 py-1 transition-all duration-300"
            >
              {/* Initials Avatar */}
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs tracking-wider select-none"
                style={
                  theme === 'light'
                    ? {
                        background: 'linear-gradient(135deg, #0096c7, #00d4ff)',
                        color: '#fff',
                        boxShadow: '0 2px 8px rgba(0,150,199,0.35)',
                      }
                    : {
                        background: 'linear-gradient(135deg, #00b4d8, #00d4ff)',
                        color: '#0a0a1a',
                        boxShadow: '0 2px 8px rgba(0,212,255,0.30)',
                      }
                }
              >
                PC
              </div>

              {/* Name + Title */}
              <div className="hidden sm:flex flex-col leading-none gap-0.5">
                <span
                  className="font-bold text-sm tracking-wide"
                  style={{ color: theme === 'light' ? '#111128' : '#ffffff' }}
                >
                  Prahlad Chandra
                </span>
                <span
                  className="text-[10px] font-mono tracking-widest uppercase"
                  style={{ color: theme === 'light' ? '#0096c7' : '#00d4ff' }}
                >
                  Full-Stack Developer
                </span>
              </div>
            </a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`relative px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 focus-ring ${
                      isActive
                        ? 'text-accent-cyan'
                        : 'text-fg-muted hover:text-fg'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-accent-cyan"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Status + Theme Toggle + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-subtle bg-surface-glass text-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-fg-muted font-medium">Available for opportunities</span>
              </div>

              {/* Language Translator */}
              <LanguageTranslator />

              {/* Theme Toggle Button */}
              <motion.button
                onClick={toggleTheme}
                whileTap={{ scale: 0.85, rotate: 15 }}
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                aria-label="Toggle theme"
                className="p-2 rounded-xl border border-border-subtle bg-surface-glass backdrop-blur text-fg-muted hover:text-accent-cyan hover:border-accent-cyan transition-all duration-200 focus-ring"
                style={{ boxShadow: theme === 'light' ? '0 0 14px rgba(251,191,36,0.3)' : '0 0 14px rgba(0,212,255,0.15)' }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {theme === 'dark' ? (
                    <motion.span key="sun" initial={{ opacity: 0, rotate: -90, scale: 0.5 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} exit={{ opacity: 0, rotate: 90, scale: 0.5 }} transition={{ duration: 0.2 }}>
                      <Sun size={17} style={{ color: '#fbbf24' }} />
                    </motion.span>
                  ) : (
                    <motion.span key="moon" initial={{ opacity: 0, rotate: 90, scale: 0.5 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} exit={{ opacity: 0, rotate: 90, scale: 0.5 }} transition={{ duration: 0.2 }}>
                      <Moon size={17} style={{ color: '#00d4ff' }} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-lg text-fg-muted hover:text-fg hover:bg-surface-2 transition-colors focus-ring"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-surface-0/90 backdrop-blur-xl"
              onClick={() => setMobileOpen(false)}
            />

            {/* Menu Content */}
            <motion.nav
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="relative flex flex-col items-center justify-center h-full gap-6 p-8"
              aria-label="Mobile navigation"
            >
              {/* Status */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-border-subtle bg-surface-glass text-xs mb-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-fg-muted font-medium">Available for opportunities</span>
              </div>

              {/* Mobile Language Translator */}
              <div className="w-56 mb-2">
                <LanguageTranslator isMobile />
              </div>

              {navItems.map((item, i) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15 + i * 0.05 }}
                    className={`text-2xl font-semibold transition-colors focus-ring rounded-lg px-4 py-2 ${
                      isActive ? 'text-accent-cyan' : 'text-fg-muted hover:text-fg'
                    }`}
                  >
                    {item.label}
                  </motion.a>
                );
              })}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
