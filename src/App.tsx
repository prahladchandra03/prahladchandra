import { useState, useCallback } from 'react';
import { Toaster } from 'sonner';
import { ThemeProvider } from './context/ThemeContext';
import Navigation from './components/layout/Navigation';
import ScrollProgress from './components/layout/ScrollProgress';
import Footer from './components/layout/Footer';
import Loader from './components/layout/Loader';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Architecture from './components/sections/Architecture';
import ToolsSection from './components/sections/Tools';
import GitHubSection from './components/sections/GitHub';
import Contact from './components/sections/Contact';

function App() {
  const [loaded, setLoaded] = useState(false);

  const handleLoadComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <ThemeProvider>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'rgba(22, 22, 30, 0.95)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            color: '#f0f0f5',
            backdropFilter: 'blur(12px)',
          },
        }}
      />

      {!loaded && <Loader onComplete={handleLoadComplete} />}

      <div
        className={`transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      >
        <ScrollProgress />
        <Navigation />

        <main>
          <Hero />
          <About />
          <Experience />
          <Skills />
          <Projects />
          <Architecture />
          <ToolsSection />
          <GitHubSection />
          <Contact />
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
