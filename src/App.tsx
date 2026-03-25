import { Hero } from './components/Hero';
import { About } from './components/About';
import { TechStack } from './components/TechStack';
import { Projects } from './components/Projects';
import { Capabilities } from './components/Capabilities';
import { Contact } from './components/Contact';
import { AnimatedBackground } from './components/AnimatedBackground';

function App() {
  return (
    <div className="relative w-full min-h-screen">
      <AnimatedBackground />
      <main className="relative z-10 w-full text-slate-100 min-h-screen font-sans selection:bg-primary/30 selection:text-white pb-10">
        <Hero />
        <About />
        <Capabilities />
        <TechStack />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}

export default App;
