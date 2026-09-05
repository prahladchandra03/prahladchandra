import { motion } from 'framer-motion';
import { ArrowDown, Download, Wrench } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { profile } from '../../data/profile';

export default function Hero() {
  const { ref: sectionRef } = useInView({ threshold: 0.1 });

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video Background — always dark regardless of theme */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute', top: '50%', left: '50%',
            minWidth: '100%', minHeight: '100%',
            width: 'auto', height: 'auto',
            transform: 'translate(-50%, -50%)',
            objectFit: 'cover', opacity: 1,
          }}
        >
          <source src="https://res.cloudinary.com/ddgzie5qe/video/upload/v1788588355/MAIN_zznoei.mp4" type="video/mp4" />
        </video>

        {/* Light dark overlay — enough to darken but still show video clearly */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.55) 100%)',
          }}
        />
      </div>

      {/* Content — ALWAYS white text, regardless of theme */}
      <div className="relative z-10 section-container text-center pt-20 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-3xl mx-auto"
          style={{ textShadow: 'none' }}
        >
          {/* Terminal-style label */}
          <div className="font-mono text-xs tracking-[0.15em] mb-6 uppercase" style={{ color: 'rgba(255,255,255,0.55)' }}>
            <span style={{ color: '#00d4ff' }}>~</span>/portfolio/
            <span style={{ color: '#00e5a0' }}>whoami</span>
          </div>

          {/* Headline — always white/gradient over video */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
            style={{ filter: 'drop-shadow(0 2px 16px rgba(0,0,0,0.7))' }}
          >
            <span
              className="block"
              style={{
                background: 'linear-gradient(135deg, #00d4ff 0%, #00e5a0 50%, #a855f7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Building scalable systems.
            </span>
            <span
              className="block mt-2"
              style={{ color: '#ffffff', textShadow: '0 2px 20px rgba(0,0,0,0.8), 0 1px 4px rgba(0,0,0,0.9)' }}
            >
              Engineering better experiences.
            </span>
          </h1>

          {/* Subtitle — always light with shadow */}
          <p
            className="mt-6 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.92)', textShadow: '0 1px 8px rgba(0,0,0,0.8), 0 2px 16px rgba(0,0,0,0.6)' }}
          >
            {profile.bio}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
            <button onClick={() => handleScrollTo('projects')} className="btn-primary">
              View Projects
              <ArrowDown size={16} />
            </button>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                gap: '8px', padding: '12px 24px', borderRadius: '12px',
                fontWeight: 600, fontSize: '14px',
                background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.30)',
                color: '#ffffff',
                backdropFilter: 'blur(12px)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.20)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.50)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.30)'; }}
            >
              <Download size={16} />
              Download Resume
            </a>
            <button
              onClick={() => handleScrollTo('tools')}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '8px 16px', borderRadius: '8px',
                fontWeight: 500, fontSize: '14px',
                color: 'rgba(255,255,255,0.65)',
                background: 'transparent',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; e.currentTarget.style.background = 'transparent'; }}
            >
              <Wrench size={16} />
              Explore Tools
            </button>
          </div>

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs"
            style={{
              background: 'rgba(255,255,255,0.10)',
              border: '1px solid rgba(255,255,255,0.20)',
              backdropFilter: 'blur(12px)',
              color: 'rgba(255,255,255,0.80)',
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-medium">{profile.availability}</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={() => handleScrollTo('about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 hover:opacity-80 transition-opacity focus-ring rounded-lg p-2"
        style={{ color: 'rgba(255,255,255,0.50)' }}
        aria-label="Scroll to about section"
      >
        <span className="text-[10px] font-mono uppercase tracking-widest">scroll</span>
        <span className="block w-[1px] h-8 bg-gradient-to-b from-white/50 to-transparent" />
      </motion.button>
    </section>
  );
}
